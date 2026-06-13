"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthUser, type AuthUser } from "@/lib/auth";
import { services } from "@/lib/site";
import {
  getCities,
  getDistricts,
  type City,
  type District,
} from "@/lib/locations";
import {
  getCleaners,
  type Cleaner,
  type CleanerPaginationMeta,
} from "@/lib/cleaners";
import PageLoader from "@/components/ui/PageLoader";
import SearchableSelect from "@/components/ui/SearchableSelect";

type PreviewCleaner = {
  id: number;
  name: string;
  city: { name: string };
  district: { name: string };
  description: string;
  experience: string;
  daily_price: string;
  services: string[];
  phone: string;
};

const previewCleaners: PreviewCleaner[] = [
  {
    id: 9001,
    name: "Ayşe Yılmaz",
    city: { name: "İstanbul" },
    district: { name: "Kadıköy" },
    description:
      "Ev temizliği, düzenli temizlik ve detaylı temizlik alanlarında deneyimlidir.",
    experience: "4 yıl deneyim",
    daily_price: "1.000 TL - 1.300 TL",
    services: ["Ev Temizliği", "Düzenli Temizlik", "Detaylı Temizlik"],
    phone: "05xx xxx xx xx",
  },
  {
    id: 9002,
    name: "Fatma Demir",
    city: { name: "İstanbul" },
    district: { name: "Üsküdar" },
    description:
      "Günlük temizlik, ofis temizliği ve taşınma sonrası temizlik hizmeti verebilir.",
    experience: "6 yıl deneyim",
    daily_price: "Görüşülür",
    services: ["Ofis Temizliği", "Günlük Temizlik", "Taşınma Temizliği"],
    phone: "05xx xxx xx xx",
  },
  {
    id: 9003,
    name: "Emine Kaya",
    city: { name: "Ankara" },
    district: { name: "Çankaya" },
    description:
      "Haftalık düzenli temizlik ve detaylı ev temizliği taleplerine uygundur.",
    experience: "3 yıl deneyim",
    daily_price: "900 TL - 1.200 TL",
    services: ["Ev Temizliği", "Haftalık Temizlik", "Cam Temizliği"],
    phone: "05xx xxx xx xx",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function LockedCleanerCardOverlay() {
  return (
    <div className="absolute inset-0 z-30 rounded-[inherit] bg-white/10 backdrop-blur-[2px]">
      <div className="absolute inset-y-0 left-1/2 flex w-full max-w-[450px] -translate-x-1/2 items-center justify-center bg-white/92 px-5 shadow-[0_0_80px_rgba(15,23,42,0.12)] backdrop-blur-md">
        <div className="w-full text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#06264a] text-xl text-white shadow-lg shadow-blue-950/20">
            🔒
          </div>

          <h3 className="mt-4 text-xl font-black tracking-[-0.04em] text-[#06264a]">
            Detaylar Kilitli
          </h3>

          <p className="mx-auto mt-3 max-w-[340px] text-sm font-bold leading-7 text-slate-600">
            Temizlikçi profillerini, telefon ve WhatsApp bilgilerini görmek için
            müşteri hesabıyla giriş yapın.
          </p>

          <div className="mx-auto mt-5 grid max-w-[360px] grid-cols-2 gap-3">
            <Link
              href="/giris"
              className="flex min-h-12 items-center justify-center rounded-full bg-[#06264a] px-5 text-sm font-black text-white shadow-lg shadow-blue-950/15 transition hover:-translate-y-0.5 hover:bg-[#0b355f]"
            >
              Giriş Yap
            </Link>

            <Link
              href="/kullanici-kayit"
              className="flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-5 text-sm font-black text-white shadow-lg shadow-orange-400/25 transition hover:-translate-y-0.5 hover:bg-[#e58f00]"
            >
              Üye Ol
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerContactBox({ cleaner }: { cleaner: Cleaner }) {
  const cleanPhone = cleaner.phone?.replace(/\D/g, "") || "";

  return (
    <div className="rounded-[1.4rem] bg-[#06264a] p-5 text-white">
      <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-200">
        İletişim Bilgileri
      </div>

      <div className="mt-4 text-lg font-black">
        {cleaner.phone || "Telefon belirtilmedi"}
      </div>

      <div className="mt-4 grid gap-2">
        {cleaner.phone && (
          <a
            href={`tel:${cleanPhone}`}
            className="flex min-h-11 items-center justify-center rounded-full bg-[#f6a313] px-4 text-sm font-black text-white transition hover:bg-[#e58f00]"
          >
            Ara
          </a>
        )}

        {cleaner.phone && (
          <a
            href={`https://wa.me/9${cleanPhone}`}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-black text-[#06264a] transition hover:bg-blue-50"
          >
            WhatsApp ile Yaz
          </a>
        )}

        {cleaner.email && (
          <a
            href={`mailto:${cleaner.email}`}
            className="flex min-h-11 items-center justify-center rounded-full border border-white/20 px-4 text-sm font-black text-white transition hover:bg-white/10"
          >
            E-posta Gönder
          </a>
        )}
      </div>
    </div>
  );
}

function PreviewContactBox({ phone }: { phone: string }) {
  return (
    <div className="rounded-[1.4rem] bg-[#06264a] p-5 text-white">
      <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-200">
        İletişim Bilgileri
      </div>

      <div className="mt-4 text-lg font-black">{phone}</div>

      <div className="mt-4 grid gap-2">
        <div className="flex min-h-11 items-center justify-center rounded-full bg-[#f6a313] px-4 text-sm font-black text-white">
          Ara
        </div>

        <div className="flex min-h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-black text-[#06264a]">
          WhatsApp ile Yaz
        </div>
      </div>
    </div>
  );
}

const emptyMeta: CleanerPaginationMeta = {
  current_page: 1,
  last_page: 1,
  per_page: 12,
  total: 0,
  from: null,
  to: null,
};

export default function FindCleanerPage() {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);

  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const [cityId, setCityId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [serviceType, setServiceType] = useState("");

  const [meta, setMeta] = useState<CleanerPaginationMeta>(emptyMeta);

  const [initialLoading, setInitialLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [cityLoading, setCityLoading] = useState(true);
  const [districtLoading, setDistrictLoading] = useState(false);

  const [error, setError] = useState("");

  const cityOptions = useMemo(
    () =>
      cities.map((city) => ({
        value: String(city.id),
        label: city.name,
      })),
    [cities]
  );

  const districtOptions = useMemo(
    () =>
      districts.map((district) => ({
        value: String(district.id),
        label: district.name,
      })),
    [districts]
  );

  const serviceOptions = useMemo(
    () =>
      services.map((service: string) => ({
        value: service,
        label: service,
      })),
    []
  );

  function updateCleanerUrl(filters: {
    city_id?: string;
    district_id?: string;
    service_type?: string;
    page?: string;
  }) {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams();

    if (filters.city_id) params.set("city_id", filters.city_id);
    if (filters.district_id) params.set("district_id", filters.district_id);
    if (filters.service_type) params.set("service_type", filters.service_type);
    if (filters.page && filters.page !== "1") params.set("page", filters.page);

    const query = params.toString();

    window.history.replaceState(
      null,
      "",
      `/temizlikci-bul${query ? `?${query}` : ""}`
    );
  }

  async function loadCleaners(
    nextPage = 1,
    customFilters?: {
      city_id?: string;
      district_id?: string;
      service_type?: string;
    }
  ) {
    try {
      setListLoading(true);
      setError("");

      const finalFilters = {
        city_id: (customFilters?.city_id ?? cityId).trim(),
        district_id: (customFilters?.district_id ?? districtId).trim(),
        service_type: (customFilters?.service_type ?? serviceType).trim(),
        page: String(nextPage),
        per_page: "12",
      };

      updateCleanerUrl({
        city_id: finalFilters.city_id,
        district_id: finalFilters.district_id,
        service_type: finalFilters.service_type,
        page: finalFilters.page,
      });

      const response = await getCleaners(finalFilters);

      setCleaners(response.data);
      setMeta(response.meta || emptyMeta);
    } catch (err) {
      const apiError = err as { message?: string };

      setError(
        apiError.message ||
          "Temizlikçiler yüklenemedi. Lütfen tekrar deneyin."
      );
      setCleaners([]);
      setMeta(emptyMeta);
    } finally {
      setInitialLoading(false);
      setListLoading(false);
    }
  }

  function clearFilters() {
    setCityId("");
    setDistrictId("");
    setServiceType("");
    setDistricts([]);

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/temizlikci-bul");
    }

    loadCleaners(1, {
      city_id: "",
      district_id: "",
      service_type: "",
    });
  }

  useEffect(() => {
    const currentUser = getAuthUser();

    if (currentUser?.role === "cleaner") {
      router.replace("/is-talepleri");
      return;
    }

    setUser(currentUser);
  }, [router]);

  useEffect(() => {
    const params =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams();

    const urlCityId = params.get("city_id") || "";
    const urlDistrictId = params.get("district_id") || "";
    const urlServiceType = params.get("service_type") || "";
    const urlPage = params.get("page") || "1";

    setCityId(urlCityId);
    setDistrictId(urlDistrictId);
    setServiceType(urlServiceType);

    loadCleaners(Number(urlPage), {
      city_id: urlCityId,
      district_id: urlDistrictId,
      service_type: urlServiceType,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function loadCities() {
      try {
        setCityLoading(true);
        const response = await getCities();
        setCities(response.data);
      } catch {
        setError("İl listesi yüklenemedi.");
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

        const currentDistrictId = districtId;
        const response = await getDistricts(cityId);

        setDistricts(response.data);

        if (!currentDistrictId) return;

        const districtExists = response.data.some(
          (district) => String(district.id) === String(currentDistrictId)
        );

        if (!districtExists) {
          setDistrictId("");
        }
      } catch {
        setError("İlçe listesi yüklenemedi.");
      } finally {
        setDistrictLoading(false);
      }
    }

    loadDistricts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId]);

  const canSeeContact = user?.role === "customer" || user?.role === "admin";

  const shouldShowPreviewCards =
    !initialLoading && !error && cleaners.length === 0 && !canSeeContact;

  return (
    <main className="page-bottom-space py-8 md:py-14">
      <div className="container-main">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Link href="/" className="text-sm font-black text-[#06264a]">
                ← Ana sayfaya dön
              </Link>

              <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
                Temizlikçi Bul
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-[#06264a] md:text-5xl">
                Size en uygun temizlikçiyi bulun
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Kayıtlı temizlikçileri il, ilçe ve hizmet türüne göre
                filtreleyin. İletişim bilgilerini görmek için müşteri hesabıyla
                giriş yapabilirsiniz.
              </p>
            </div>

            {user?.role === "customer" && (
              <Link
                href="/talep-olustur"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-6 text-sm font-black text-white shadow-lg shadow-orange-400/25 transition hover:-translate-y-0.5 hover:bg-[#e58f00]"
              >
                Talep Oluştur
              </Link>
            )}
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.06)] md:p-5">
            <div className="grid gap-3 md:grid-cols-5">
              <SearchableSelect
                value={cityId}
                onChange={(value) => {
                  setCityId(value);
                  setDistrictId("");
                }}
                options={cityOptions}
                placeholder={cityLoading ? "İller yükleniyor..." : "Tüm İller"}
                searchPlaceholder="İl ara..."
                disabled={cityLoading}
              />

              <SearchableSelect
                value={districtId}
                onChange={setDistrictId}
                options={districtOptions}
                placeholder={
                  districtLoading ? "İlçeler yükleniyor..." : "Tüm İlçeler"
                }
                searchPlaceholder="İlçe ara..."
                disabled={!cityId || districtLoading}
              />

              <SearchableSelect
                value={serviceType}
                onChange={setServiceType}
                options={serviceOptions}
                placeholder="Tüm Hizmetler"
                searchPlaceholder="Hizmet ara..."
              />

              <button
                type="button"
                onClick={() => loadCleaners(1)}
                disabled={listLoading}
                className="min-h-12 cursor-pointer rounded-2xl bg-[#06264a] px-5 text-sm font-black text-white transition hover:bg-[#0b355f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Temizlikçi Getir
              </button>

              <button
                type="button"
                onClick={clearFilters}
                disabled={listLoading}
                className="min-h-12 cursor-pointer rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-[#06264a] transition hover:border-[#f6a313] hover:text-[#f6a313] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Filtreyi Temizle
              </button>
            </div>
          </div>

          <div className="relative mt-5 min-h-[260px]">
            {listLoading && !initialLoading && (
              <PageLoader text="Liste güncelleniyor..." />
            )}

            <div
              className={`transition duration-300 ${
                listLoading && !initialLoading
                  ? "scale-[0.995] opacity-40 blur-[1px]"
                  : "scale-100 opacity-100 blur-0"
              }`}
            >
              {initialLoading && (
                <div className="grid gap-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="animate-pulse rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] md:p-6"
                    >
                      <div className="h-5 w-2/5 rounded-full bg-slate-200" />
                      <div className="mt-4 h-4 w-3/5 rounded-full bg-slate-200" />
                      <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-200" />
                    </div>
                  ))}
                </div>
              )}

              {!initialLoading && error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-bold text-red-700">
                  {error}
                </div>
              )}

              {shouldShowPreviewCards && (
                <>
                  <div className="mb-4 rounded-[1.4rem] border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-600 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
                    Bölgenizdeki temizlikçileri görmek için ücretsiz üye olun.
                  </div>

                  <div className="grid gap-4">
                    {previewCleaners.map((cleaner) => (
                      <article
                        key={cleaner.id}
                        className="relative overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] md:p-6"
                      >
                        <div className="pointer-events-none select-none opacity-45 blur-[5px] transition duration-300 lg:flex lg:items-start lg:justify-between lg:gap-5">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-[#06264a] text-xl font-black text-white">
                                {getInitials(cleaner.name)}
                              </div>

                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h2 className="text-2xl font-black tracking-[-0.04em] text-[#06264a]">
                                    {cleaner.name}
                                  </h2>

                                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-100">
                                    Onaylı
                                  </span>
                                </div>

                                <p className="mt-2 text-sm font-black text-[#f6a313]">
                                  {cleaner.city.name} / {cleaner.district.name}
                                </p>

                                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                                  {cleaner.description}
                                </p>
                              </div>
                            </div>

                            <div className="mt-5 grid gap-3 text-sm md:grid-cols-3">
                              <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                                  Deneyim
                                </div>
                                <div className="mt-2 font-black text-[#06264a]">
                                  {cleaner.experience}
                                </div>
                              </div>

                              <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                                  Günlük Ücret
                                </div>
                                <div className="mt-2 font-black text-[#06264a]">
                                  {cleaner.daily_price}
                                </div>
                              </div>

                              <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                                  Hizmet Sayısı
                                </div>
                                <div className="mt-2 font-black text-[#06264a]">
                                  {cleaner.services.length}
                                </div>
                              </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                              {cleaner.services.map((service) => (
                                <span
                                  key={service}
                                  className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-[#b86b00] ring-1 ring-orange-100"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-5 shrink-0 lg:mt-0 lg:w-80">
                            <PreviewContactBox phone={cleaner.phone} />
                          </div>
                        </div>

                        <LockedCleanerCardOverlay />
                      </article>
                    ))}
                  </div>
                </>
              )}

              {!initialLoading &&
                !error &&
                cleaners.length === 0 &&
                canSeeContact && (
                  <div className="rounded-[1.8rem] bg-white p-8 text-center shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-2xl">
                      🧹
                    </div>

                    <h2 className="mt-5 text-2xl font-black tracking-[-0.04em] text-[#06264a]">
                      Uygun temizlikçi bulunamadı
                    </h2>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
                      Filtreleri değiştirebilir veya talep oluşturarak
                      temizlikçilerin size ulaşmasını sağlayabilirsiniz.
                    </p>

                    <Link
                      href="/talep-olustur"
                      className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-6 text-sm font-black text-white"
                    >
                      Talep Oluştur
                    </Link>
                  </div>
                )}

              {!initialLoading && !error && cleaners.length > 0 && (
                <>
                  <div className="mb-4 rounded-[1.4rem] border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-600 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
                    Toplam{" "}
                    <span className="font-black text-[#06264a]">
                      {meta.total}
                    </span>{" "}
                    temizlikçi bulundu.
                    {meta.from && meta.to && (
                      <>
                        {" "}
                        Şu an{" "}
                        <span className="font-black text-[#06264a]">
                          {meta.from}
                        </span>
                        -
                        <span className="font-black text-[#06264a]">
                          {meta.to}
                        </span>{" "}
                        arası gösteriliyor.
                      </>
                    )}
                  </div>

                  <div className="grid gap-4">
                    {cleaners.map((cleaner) => (
                      <article
                        key={cleaner.id}
                        className="relative overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/70 md:p-6"
                      >
                        <div
                          className={`flex flex-col gap-5 transition duration-300 lg:flex-row lg:items-start lg:justify-between ${
                            canSeeContact
                              ? "blur-0"
                              : "pointer-events-none select-none opacity-45 blur-[5px]"
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-[#06264a] text-xl font-black text-white">
                                {getInitials(cleaner.name)}
                              </div>

                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h2 className="text-2xl font-black tracking-[-0.04em] text-[#06264a]">
                                    {cleaner.name}
                                  </h2>

                                  {cleaner.cleaner_profile?.is_verified && (
                                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-100">
                                      Onaylı
                                    </span>
                                  )}
                                </div>

                                <p className="mt-2 text-sm font-black text-[#f6a313]">
                                  {cleaner.city?.name || "-"}
                                  {cleaner.district?.name
                                    ? ` / ${cleaner.district.name}`
                                    : ""}
                                </p>

                                {cleaner.cleaner_profile?.description && (
                                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                                    {cleaner.cleaner_profile.description}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="mt-5 grid gap-3 text-sm md:grid-cols-3">
                              <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                                  Deneyim
                                </div>

                                <div className="mt-2 font-black text-[#06264a]">
                                  {cleaner.cleaner_profile?.experience ||
                                    "Belirtilmedi"}
                                </div>
                              </div>

                              <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                                  Günlük Ücret
                                </div>

                                <div className="mt-2 font-black text-[#06264a]">
                                  {cleaner.cleaner_profile?.daily_price ||
                                    "Belirtilmedi"}
                                </div>
                              </div>

                              <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                                  Hizmet Sayısı
                                </div>

                                <div className="mt-2 font-black text-[#06264a]">
                                  {cleaner.cleaner_profile?.services?.length ||
                                    0}
                                </div>
                              </div>
                            </div>

                            {(cleaner.cleaner_profile?.services ?? []).length >
                              0 && (
                              <div className="mt-5 flex flex-wrap gap-2">
                                {(cleaner.cleaner_profile?.services ?? []).map(
                                  (service: string) => (
                                    <span
                                      key={service}
                                      className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-[#b86b00] ring-1 ring-orange-100"
                                    >
                                      {service}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                          </div>

                          <div className="shrink-0 lg:w-80">
                            <CustomerContactBox cleaner={cleaner} />
                          </div>
                        </div>

                        {!canSeeContact && <LockedCleanerCardOverlay />}
                      </article>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 text-sm font-bold text-slate-600 shadow-[0_18px_60px_rgba(15,23,42,0.05)] md:flex-row">
                    <div>
                      Sayfa{" "}
                      <span className="font-black text-[#06264a]">
                        {meta.current_page}
                      </span>{" "}
                      /{" "}
                      <span className="font-black text-[#06264a]">
                        {meta.last_page}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={meta.current_page <= 1 || listLoading}
                        onClick={() => loadCleaners(meta.current_page - 1)}
                        className="min-h-11 cursor-pointer rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-[#06264a] transition hover:border-[#f6a313] hover:text-[#f6a313] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Önceki
                      </button>

                      <button
                        type="button"
                        disabled={
                          meta.current_page >= meta.last_page || listLoading
                        }
                        onClick={() => loadCleaners(meta.current_page + 1)}
                        className="min-h-11 cursor-pointer rounded-full bg-[#06264a] px-5 text-sm font-black text-white transition hover:bg-[#0b355f] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Sonraki
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}