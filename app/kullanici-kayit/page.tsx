"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { saveAuth, type AuthResponse } from "@/lib/auth";
import { getCities, getDistricts, type City, type District } from "@/lib/locations";

type ApiValidationError = {
  message?: string;
  errors?: Record<string, string[]>;
};

export default function CustomerRegisterPage() {
  const router = useRouter();

  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [cityId, setCityId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [kvkkAccepted, setKvkkAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [cityLoading, setCityLoading] = useState(true);
  const [districtLoading, setDistrictLoading] = useState(false);

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
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
  }, []);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setFieldErrors({});

    try {
      const response = await apiFetch<AuthResponse>("/auth/register/customer", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          city_id: Number(cityId),
          district_id: Number(districtId),
          password,
          password_confirmation: passwordConfirmation,
          kvkk_accepted: kvkkAccepted,
        }),
      });

      saveAuth(response.token, response.user);

      router.push("/temizlikci-bul");
      router.refresh();
    } catch (err) {
      const apiError = err as ApiValidationError;

      setError(apiError.message || "Kayıt işlemi başarısız oldu.");
      setFieldErrors(apiError.errors || {});
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-bottom-space py-8 md:py-14">
      <div className="container-main">
        <div className="mx-auto max-w-5xl">
          <Link href="/kayit" className="text-sm font-black text-[#06264a]">
            ← Üyelik seçimine dön
          </Link>

          <div className="mt-7 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="rounded-[2rem] bg-[#06264a] p-7 text-white md:p-9">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-200">
                Temizlikçi Arayan Üyeliği
              </p>

              <h1 className="mt-4 text-4xl font-black leading-tight tracking-[-0.05em]">
                Bölgenizdeki temizlikçilere hızlıca ulaşın.
              </h1>

              <p className="mt-5 text-sm leading-8 text-blue-100">
                Ücretsiz hesap oluşturduktan sonra temizlikçi telefon bilgilerini
                görüntüleyebilir ve doğrudan iletişime geçebilirsiniz.
              </p>

              <div className="mt-7 grid gap-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="font-black">Telefon bilgilerine erişim</div>
                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Temizlikçi iletişim bilgileri sadece giriş yapmış
                    kullanıcılara gösterilir.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="font-black">Bölgeye göre listeleme</div>
                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    İl ve ilçenize göre size yakın temizlikçileri
                    listeleyebilirsiniz.
                  </p>
                </div>
              </div>
            </aside>

            <form
              onSubmit={handleSubmit}
              className="soft-card rounded-[2.2rem] p-5 md:p-8"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
                Ücretsiz Üyelik
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#06264a]">
                Hesabınızı oluşturun
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Bu hesapla temizlikçi telefonlarını görüntüleyebilir ve daha
                sonra taleplerinizi takip edebilirsiniz.
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
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adınız soyadınız"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white"
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
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05xx xxx xx xx"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white"
                  />
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
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="ornek@mail.com"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white"
                  />
                  {getFieldError("email") && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {getFieldError("email")}
                    </p>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Telefon Tekrarı / Şifre
                  </span>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Şifre oluşturun"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white"
                  />
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
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    type="password"
                    placeholder="Şifrenizi tekrar girin"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    İl
                  </span>
                  <select
                    value={cityId}
                    onChange={(e) => setCityId(e.target.value)}
                    disabled={cityLoading}
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white"
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
                    onChange={(e) => setDistrictId(e.target.value)}
                    disabled={!cityId || districtLoading}
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white"
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
              </div>

              <label className="mt-5 flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <input
                  checked={kvkkAccepted}
                  onChange={(e) => setKvkkAccepted(e.target.checked)}
                  type="checkbox"
                  className="mt-1"
                />
                <span>
                  KVKK Aydınlatma Metni, Gizlilik Politikası ve Kullanım
                  Şartları’nı okudum, kabul ediyorum.
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
                className="mt-6 min-h-14 w-full rounded-full bg-[#f6a313] px-6 font-black text-white shadow-lg shadow-orange-400/25 transition hover:bg-[#e58f00] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Kayıt oluşturuluyor..." : "Kullanıcı Olarak Üye Ol"}
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