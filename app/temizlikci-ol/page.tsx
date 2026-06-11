"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { getAuthUser, saveAuth, type AuthResponse } from "@/lib/auth";
import { services } from "@/lib/site";
import {
  getCities,
  getDistricts,
  type City,
  type District,
} from "@/lib/locations";

type ApiValidationError = {
  message?: string;
  errors?: Record<string, string[]>;
};

type ClientValidationErrors = Record<string, string[]>;

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatPhoneInput(value: string) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  if (digits.length <= 9) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(
    7,
    9
  )} ${digits.slice(9, 11)}`;
}

function normalizePhoneForApi(value: string) {
  return onlyDigits(value).slice(0, 11);
}

function isValidTurkishMobilePhone(value: string) {
  const digits = normalizePhoneForApi(value);

  return /^05\d{9}$/.test(digits);
}

function normalizeName(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeEmail(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR");
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function isStrongEnoughPassword(value: string) {
  return (
    value.length >= 8 &&
    /[a-zA-ZÇĞİÖŞÜçğıöşü]/.test(value) &&
    /\d/.test(value)
  );
}

function validateCleanerRegisterForm(values: {
  name: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  cityId: string;
  districtId: string;
  selectedServices: string[];
  experience: string;
  dailyPrice: string;
  description: string;
  kvkkAccepted: boolean;
}) {
  const errors: ClientValidationErrors = {};

  const cleanName = normalizeName(values.name);
  const cleanEmail = normalizeEmail(values.email);
  const cleanPhone = normalizePhoneForApi(values.phone);
  const cleanExperience = normalizeText(values.experience);
  const cleanDailyPrice = normalizeText(values.dailyPrice);
  const cleanDescription = normalizeText(values.description);

  if (!cleanName) {
    errors.name = ["Ad soyad alanı zorunludur."];
  } else if (cleanName.length < 3) {
    errors.name = ["Ad soyad en az 3 karakter olmalıdır."];
  } else if (cleanName.length > 80) {
    errors.name = ["Ad soyad en fazla 80 karakter olabilir."];
  }

  if (!cleanPhone) {
    errors.phone = ["Telefon alanı zorunludur."];
  } else if (cleanPhone.length !== 11) {
    errors.phone = [
      "Telefon numarası 11 haneli olmalıdır. Örnek: 05xx xxx xx xx",
    ];
  } else if (!isValidTurkishMobilePhone(cleanPhone)) {
    errors.phone = [
      "Telefon numarası 05 ile başlamalıdır. Örnek: 05xx xxx xx xx",
    ];
  }

  if (!cleanEmail) {
    errors.email = ["E-posta alanı zorunludur."];
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    errors.email = ["Geçerli bir e-posta adresi giriniz."];
  } else if (cleanEmail.length > 120) {
    errors.email = ["E-posta adresi çok uzun."];
  }

  if (!values.password) {
    errors.password = ["Şifre alanı zorunludur."];
  } else if (!isStrongEnoughPassword(values.password)) {
    errors.password = [
      "Şifre en az 8 karakter olmalı ve en az 1 harf ile 1 rakam içermelidir.",
    ];
  }

  if (!values.passwordConfirmation) {
    errors.password_confirmation = ["Şifre tekrarı zorunludur."];
  } else if (values.password !== values.passwordConfirmation) {
    errors.password_confirmation = ["Şifreler birbiriyle eşleşmiyor."];
  }

  if (!values.cityId) {
    errors.city_id = ["İl seçimi zorunludur."];
  }

  if (!values.districtId) {
    errors.district_id = ["İlçe seçimi zorunludur."];
  }

  if (values.selectedServices.length === 0) {
    errors.services = ["En az 1 hizmet alanı seçmelisiniz."];
  }

  if (!cleanExperience) {
    errors.experience = ["Deneyim alanı zorunludur."];
  } else if (cleanExperience.length > 100) {
    errors.experience = ["Deneyim alanı en fazla 100 karakter olabilir."];
  }

  if (cleanDailyPrice && cleanDailyPrice.length > 100) {
    errors.daily_price = ["Günlük ücret alanı en fazla 100 karakter olabilir."];
  }

  if (cleanDescription && cleanDescription.length > 500) {
    errors.description = ["Açıklama en fazla 500 karakter olabilir."];
  }

  if (!values.kvkkAccepted) {
    errors.kvkk_accepted = [
      "KVKK, Gizlilik Politikası ve Kullanım Şartları kabul edilmelidir.",
    ];
  }

  return errors;
}

export default function CleanerRegisterPage() {
  const router = useRouter();

  const [authChecked, setAuthChecked] = useState(false);

  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [cityId, setCityId] = useState("");
  const [districtId, setDistrictId] = useState("");

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [description, setDescription] = useState("");

  const [kvkkAccepted, setKvkkAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [cityLoading, setCityLoading] = useState(true);
  const [districtLoading, setDistrictLoading] = useState(false);

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const passwordChecks = useMemo(
    () => ({
      minLength: password.length >= 8,
      hasLetter: /[a-zA-ZÇĞİÖŞÜçğıöşü]/.test(password),
      hasNumber: /\d/.test(password),
      matches:
        password.length > 0 &&
        passwordConfirmation.length > 0 &&
        password === passwordConfirmation,
    }),
    [password, passwordConfirmation]
  );

  useEffect(() => {
    const user = getAuthUser();

    if (!user) {
      setAuthChecked(true);
      return;
    }

    if (user.role === "cleaner") {
      router.replace("/is-talepleri");
      return;
    }

    if (user.role === "customer") {
      router.replace("/temizlikci-bul");
      return;
    }

    router.replace("/");
  }, [router]);

  useEffect(() => {
    if (!authChecked) return;

    async function loadCities() {
      try {
        setCityLoading(true);

        const response = await getCities();

        setCities(response.data);
      } catch {
        setError("İl listesi yüklenemedi. Lütfen daha sonra tekrar deneyin.");
      } finally {
        setCityLoading(false);
      }
    }

    loadCities();
  }, [authChecked]);

  useEffect(() => {
    async function loadDistricts() {
      if (!cityId) {
        setDistricts([]);
        setDistrictId("");
        return;
      }

      try {
        setDistrictLoading(true);
        setDistrictId("");

        const response = await getDistricts(cityId);

        setDistricts(response.data);
      } catch {
        setError("İlçe listesi yüklenemedi. Lütfen tekrar deneyin.");
      } finally {
        setDistrictLoading(false);
      }
    }

    loadDistricts();
  }, [cityId]);

  function getFieldError(field: string) {
    return fieldErrors[field]?.[0];
  }

  function clearFieldError(field: string) {
    setFieldErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function toggleService(service: string) {
    setSelectedServices((current) => {
      if (current.includes(service)) {
        return current.filter((item) => item !== service);
      }

      return [...current, service];
    });

    clearFieldError("services");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError("");
    setFieldErrors({});

    const clientErrors = validateCleanerRegisterForm({
      name,
      phone,
      email,
      password,
      passwordConfirmation,
      cityId,
      districtId,
      selectedServices,
      experience,
      dailyPrice,
      description,
      kvkkAccepted,
    });

    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setError("Lütfen formdaki eksik veya hatalı alanları düzeltin.");
      return;
    }

    setLoading(true);

    const cleanName = normalizeName(name);
    const cleanEmail = normalizeEmail(email);
    const cleanPhone = normalizePhoneForApi(phone);
    const cleanExperience = normalizeText(experience);
    const cleanDailyPrice = normalizeText(dailyPrice);
    const cleanDescription = normalizeText(description);

    try {
      const response = await apiFetch<AuthResponse>("/auth/register/cleaner", {
        method: "POST",
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          city_id: Number(cityId),
          district_id: Number(districtId),
          password,
          password_confirmation: passwordConfirmation,
          kvkk_accepted: kvkkAccepted,

          services: selectedServices,
          experience: cleanExperience,
          daily_price: cleanDailyPrice || null,
          description: cleanDescription || null,
        }),
      });

      saveAuth(response.token, response.user);

      router.replace("/is-talepleri");
      router.refresh();
    } catch (err) {
      const apiError = err as ApiValidationError;

      setError(apiError.message || "Kayıt işlemi başarısız oldu.");
      setFieldErrors(apiError.errors || {});
    } finally {
      setLoading(false);
    }
  }

  if (!authChecked) {
    return null;
  }

  return (
    <main className="page-bottom-space py-8 md:py-14">
      <div className="container-main">
        <div className="mx-auto max-w-6xl">
          <Link href="/kayit" className="text-sm font-black text-[#06264a]">
            ← Üyelik seçimine dön
          </Link>

          <div className="mt-7 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <aside className="relative overflow-hidden rounded-[2rem] bg-[#06264a] p-7 text-white md:p-9">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#f6a313]/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl" />

              <div className="relative">
                <div className="inline-flex rounded-[1.2rem] bg-white px-4 py-3 shadow-xl shadow-blue-950/20">
                  <img
                    src="/brand/logo-primary.png"
                    alt="BenimElemanım"
                    className="h-11 w-auto max-w-[220px] object-contain"
                  />
                </div>

                <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-orange-200">
                  Temizlikçi Üyeliği
                </p>

                <h1 className="mt-4 text-4xl font-black leading-tight tracking-[-0.05em]">
                  Bölgenizdeki iş taleplerine ulaşın.
                </h1>

                <p className="mt-5 text-sm leading-8 text-blue-100">
                  Ücretsiz temizlikçi hesabı oluşturarak iş taleplerini
                  görüntüleyebilir, müşterilerle kolayca iletişime
                  geçebilirsiniz.
                </p>

                <div className="mt-7 grid gap-3">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="font-black">İş taleplerini görün</div>
                    <p className="mt-2 text-sm leading-6 text-blue-100">
                      Bölgenizde yayınlanan temizlik taleplerine hızlıca
                      ulaşabilirsiniz.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="font-black">Profilinizi oluşturun</div>
                    <p className="mt-2 text-sm leading-6 text-blue-100">
                      Hizmet alanlarınızı, deneyiminizi ve açıklamanızı
                      ekleyerek görünür olun.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="font-black">Güvenli kayıt</div>
                    <p className="mt-2 text-sm leading-6 text-blue-100">
                      Telefon, e-posta, şifre ve KVKK onayı kontrol edilerek
                      kayıt alınır.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="soft-card rounded-[2.2rem] p-5 md:p-8"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
                Ücretsiz Temizlikçi Kaydı
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#06264a]">
                Temizlikçi hesabınızı oluşturun
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Bu hesapla iş taleplerini görüntüleyebilir ve temizlikçi
                profilinizi oluşturabilirsiniz.
              </p>

              {error && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">
                  {error}
                </div>
              )}

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Ad Soyad
                  </span>

                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value.replace(/\s{2,}/g, " "));
                      clearFieldError("name");
                    }}
                    onBlur={() => setName((current) => normalizeName(current))}
                    maxLength={80}
                    autoComplete="name"
                    placeholder="Adınız soyadınız"
                    className={`min-h-14 w-full rounded-2xl border bg-slate-50 px-4 text-sm font-bold outline-none transition focus:bg-white ${
                      getFieldError("name")
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-[#f6a313]"
                    }`}
                  />

                  {getFieldError("name") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("name")}
                    </p>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Telefon
                  </span>

                  <input
                    value={phone}
                    onChange={(e) => {
                      setPhone(formatPhoneInput(e.target.value));
                      clearFieldError("phone");
                    }}
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={14}
                    placeholder="05xx xxx xx xx"
                    className={`min-h-14 w-full rounded-2xl border bg-slate-50 px-4 text-sm font-bold outline-none transition focus:bg-white ${
                      getFieldError("phone")
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-[#f6a313]"
                    }`}
                  />

                  <p className="mt-2 text-xs font-bold text-slate-400">
                    Sadece Türkiye GSM formatı: 05xx xxx xx xx
                  </p>

                  {getFieldError("phone") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("phone")}
                    </p>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    E-posta
                  </span>

                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearFieldError("email");
                    }}
                    onBlur={() => setEmail((current) => normalizeEmail(current))}
                    type="email"
                    maxLength={120}
                    autoComplete="email"
                    placeholder="ornek@mail.com"
                    className={`min-h-14 w-full rounded-2xl border bg-slate-50 px-4 text-sm font-bold outline-none transition focus:bg-white ${
                      getFieldError("email")
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-[#f6a313]"
                    }`}
                  />

                  {getFieldError("email") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("email")}
                    </p>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Deneyim
                  </span>

                  <input
                    value={experience}
                    onChange={(e) => {
                      setExperience(e.target.value.slice(0, 100));
                      clearFieldError("experience");
                    }}
                    onBlur={() =>
                      setExperience((current) => normalizeText(current))
                    }
                    maxLength={100}
                    placeholder="Örn: 3 yıl ev temizliği deneyimi"
                    className={`min-h-14 w-full rounded-2xl border bg-slate-50 px-4 text-sm font-bold outline-none transition focus:bg-white ${
                      getFieldError("experience")
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-[#f6a313]"
                    }`}
                  />

                  {getFieldError("experience") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("experience")}
                    </p>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Şifre
                  </span>

                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value.slice(0, 72));
                      clearFieldError("password");
                    }}
                    type="password"
                    autoComplete="new-password"
                    maxLength={72}
                    placeholder="Şifre oluşturun"
                    className={`min-h-14 w-full rounded-2xl border bg-slate-50 px-4 text-sm font-bold outline-none transition focus:bg-white ${
                      getFieldError("password")
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-[#f6a313]"
                    }`}
                  />

                  <div className="mt-2 grid gap-1 text-xs font-bold">
                    <span
                      className={
                        passwordChecks.minLength
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }
                    >
                      {passwordChecks.minLength ? "✓" : "•"} En az 8 karakter
                    </span>
                    <span
                      className={
                        passwordChecks.hasLetter
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }
                    >
                      {passwordChecks.hasLetter ? "✓" : "•"} En az 1 harf
                    </span>
                    <span
                      className={
                        passwordChecks.hasNumber
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }
                    >
                      {passwordChecks.hasNumber ? "✓" : "•"} En az 1 rakam
                    </span>
                  </div>

                  {getFieldError("password") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("password")}
                    </p>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Şifre Tekrarı
                  </span>

                  <input
                    value={passwordConfirmation}
                    onChange={(e) => {
                      setPasswordConfirmation(e.target.value.slice(0, 72));
                      clearFieldError("password_confirmation");
                    }}
                    type="password"
                    autoComplete="new-password"
                    maxLength={72}
                    placeholder="Şifrenizi tekrar girin"
                    className={`min-h-14 w-full rounded-2xl border bg-slate-50 px-4 text-sm font-bold outline-none transition focus:bg-white ${
                      getFieldError("password_confirmation")
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-[#f6a313]"
                    }`}
                  />

                  {passwordConfirmation && (
                    <p
                      className={`mt-2 text-xs font-bold ${
                        passwordChecks.matches
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {passwordChecks.matches
                        ? "✓ Şifreler eşleşiyor"
                        : "Şifreler eşleşmiyor"}
                    </p>
                  )}

                  {getFieldError("password_confirmation") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("password_confirmation")}
                    </p>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    İl
                  </span>

                  <select
                    value={cityId}
                    onChange={(e) => {
                      setCityId(e.target.value);
                      clearFieldError("city_id");
                      clearFieldError("district_id");
                    }}
                    disabled={cityLoading}
                    className={`min-h-14 w-full rounded-2xl border bg-slate-50 px-4 text-sm font-bold outline-none transition focus:bg-white ${
                      getFieldError("city_id")
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-[#f6a313]"
                    }`}
                  >
                    <option value="">
                      {cityLoading ? "İller yükleniyor..." : "İl seçiniz"}
                    </option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>

                  {getFieldError("city_id") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("city_id")}
                    </p>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    İlçe
                  </span>

                  <select
                    value={districtId}
                    onChange={(e) => {
                      setDistrictId(e.target.value);
                      clearFieldError("district_id");
                    }}
                    disabled={!cityId || districtLoading}
                    className={`min-h-14 w-full rounded-2xl border bg-slate-50 px-4 text-sm font-bold outline-none transition focus:bg-white ${
                      getFieldError("district_id")
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-[#f6a313]"
                    }`}
                  >
                    <option value="">
                      {districtLoading
                        ? "İlçeler yükleniyor..."
                        : "İlçe seçiniz"}
                    </option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>

                  {getFieldError("district_id") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("district_id")}
                    </p>
                  )}
                </label>

                <label className="md:col-span-2">
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Günlük Ücret / Beklenti
                  </span>

                  <input
                    value={dailyPrice}
                    onChange={(e) => {
                      setDailyPrice(e.target.value.slice(0, 100));
                      clearFieldError("daily_price");
                    }}
                    onBlur={() =>
                      setDailyPrice((current) => normalizeText(current))
                    }
                    maxLength={100}
                    placeholder="Örn: Günlük 1.000 TL veya görüşülür"
                    className={`min-h-14 w-full rounded-2xl border bg-slate-50 px-4 text-sm font-bold outline-none transition focus:bg-white ${
                      getFieldError("daily_price")
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-[#f6a313]"
                    }`}
                  />

                  {getFieldError("daily_price") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("daily_price")}
                    </p>
                  )}
                </label>

                <div className="md:col-span-2">
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Hizmet Alanları
                  </span>

                  <div
                    className={`grid gap-2 rounded-2xl border bg-slate-50 p-3 ${
                      getFieldError("services")
                        ? "border-red-300"
                        : "border-slate-200"
                    } sm:grid-cols-2`}
                  >
                    {services.map((service: string) => {
                      const checked = selectedServices.includes(service);

                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`min-h-11 rounded-xl px-3 text-left text-sm font-black transition ${
                            checked
                              ? "bg-[#06264a] text-white shadow-lg shadow-blue-950/10"
                              : "bg-white text-slate-600 hover:bg-orange-50 hover:text-[#b86b00]"
                          }`}
                        >
                          {checked ? "✓ " : "+ "}
                          {service}
                        </button>
                      );
                    })}
                  </div>

                  {getFieldError("services") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("services")}
                    </p>
                  )}
                </div>

                <label className="md:col-span-2">
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Kısa Açıklama
                  </span>

                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value.slice(0, 500));
                      clearFieldError("description");
                    }}
                    onBlur={() =>
                      setDescription((current) => normalizeText(current))
                    }
                    maxLength={500}
                    rows={4}
                    placeholder="Kendinizi, çalışabileceğiniz günleri ve hizmet deneyiminizi kısaca yazın."
                    className={`w-full resize-none rounded-2xl border bg-slate-50 px-4 py-4 text-sm font-bold outline-none transition focus:bg-white ${
                      getFieldError("description")
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-[#f6a313]"
                    }`}
                  />

                  <div className="mt-2 flex justify-between text-xs font-bold text-slate-400">
                    <span>En fazla 500 karakter</span>
                    <span>{description.length}/500</span>
                  </div>

                  {getFieldError("description") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("description")}
                    </p>
                  )}
                </label>
              </div>

              <label
                className={`mt-5 flex gap-3 rounded-2xl border p-4 text-sm leading-6 ${
                  getFieldError("kvkk_accepted")
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-slate-100 bg-slate-50 text-slate-600"
                }`}
              >
                <input
                  checked={kvkkAccepted}
                  onChange={(e) => {
                    setKvkkAccepted(e.target.checked);
                    clearFieldError("kvkk_accepted");
                  }}
                  type="checkbox"
                  className="mt-1"
                />

                <span>
                  <Link href="/kvkk" className="font-black text-[#06264a]">
                    KVKK Aydınlatma Metni
                  </Link>
                  ,{" "}
                  <Link
                    href="/gizlilik-politikasi"
                    className="font-black text-[#06264a]"
                  >
                    Gizlilik Politikası
                  </Link>{" "}
                  ve{" "}
                  <Link
                    href="/kullanim-sartlari"
                    className="font-black text-[#06264a]"
                  >
                    Kullanım Şartları
                  </Link>
                  ’nı okudum, kabul ediyorum.
                </span>
              </label>

              {getFieldError("kvkk_accepted") && (
                <p className="mt-2 text-xs font-bold text-red-600">
                  {getFieldError("kvkk_accepted")}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 min-h-14 w-full cursor-pointer rounded-full bg-[#f6a313] px-6 font-black text-white shadow-lg shadow-orange-400/25 transition hover:bg-[#e58f00] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Kayıt oluşturuluyor..."
                  : "Temizlikçi Olarak Üye Ol"}
              </button>

              <div className="mt-6 text-center text-sm font-bold text-slate-600">
                Zaten hesabınız var mı?{" "}
                <Link href="/giris" className="font-black text-[#06264a]">
                  Giriş yapın
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

