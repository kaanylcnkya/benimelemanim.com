"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function LockedContactBox() {
  return (
    <div className="rounded-[1.4rem] bg-[#06264a] p-5 text-white">
      <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-200">
        İletişim Bilgileri
      </div>

      <div className="mt-4 rounded-2xl bg-white/10 p-4">
        <div className="h-4 w-32 rounded-full bg-white/20" />
        <div className="mt-3 h-4 w-40 rounded-full bg-white/20" />
      </div>

      <p className="mt-4 text-xs leading-6 text-blue-100">
        Telefon ve WhatsApp bilgilerini görmek için müşteri hesabıyla giriş
        yapın.
      </p>

      <div className="mt-4 grid gap-2">
        <Link
          href="/giris"
          className="flex min-h-11 items-center justify-center rounded-full bg-[#f6a313] px-4 text-sm font-black text-white"
        >
          Giriş Yap
        </Link>

        <Link
          href="/kullanici-kayit"
          className="flex min-h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-black text-[#06264a]"
        >
          Üye Ol
        </Link>
      </div>
    </div>
  );
}

function CustomerContactBox({ cleaner }: { cleaner: Cleaner }) {
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
            href={`tel:${cleaner.phone}`}
            className="flex min-h-11 items-center justify-center rounded-full bg-[#f6a313] px-4 text-sm font-black text-white transition hover:bg-[#e58f00]"
          >
            Ara
          </a>
        )}

        {cleaner.phone && (
          <a
            href={`https://wa.me/9${cleaner.phone.replace(/\D/g, "")}`}
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

const emptyMeta: CleanerPaginationMeta = {
  current_page: 1,
  last_page: 1,
  per_page: 12,
  total: 0,
  from: null,
  to: null,
};

export default function FindCleanerPage() {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const [cityId, setCityId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [serviceType, setServiceType] = useState("");

  const [meta, setMeta] = useState<CleanerPaginationMeta>(emptyMeta);

  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
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

  async function loadCleaners(nextPage = 1, customFilters?: {
    city_id?: string;
    district_id?: string;
    service_type?: string;
  }) {
    try {
      setLoading(true);
      setPageLoading(true);
      setError("");

      const response = await getCleaners({
        city_id: customFilters?.city_id ?? cityId,
        district_id: customFilters?.district_id ?? districtId,
        service_type: customFilters?.service_type ?? serviceType,
        page: String(nextPage),
        per_page: "12",
      });

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
      setLoading(false);
      setPageLoading(false);
    }
  }

  function clearFilters() {
    setCityId("");
    setDistrictId("");
    setServiceType("");
    setDistricts([]);
    loadCleaners(1, {
      city_id: "",
      district_id: "",
      service_type: "",
    });
  }

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  useEffect(() => {
    loadCleaners(1);
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
        setDistrictId("");

        const response = await getDistricts(cityId);

        setDistricts(response.data);
      } catch {
        setError("İlçe listesi yüklenemedi.");
      } finally {
        setDistrictLoading(false);
      }
    }

    loadDistricts();
  }, [cityId]);

  const canSeeContact = user?.role === "customer" || user?.role === "admin";

  return (
    <main className="page-bottom-space py-8 md:py-14">
      {pageLoading && <PageLoader text="Liste güncelleniyor..." />}

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

            <Link
              href="/talep-olustur"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-6 text-sm font-black text-white shadow-lg shadow-orange-400/25 transition hover:-translate-y-0.5 hover:bg-[#e58f00]"
            >
              Talep Oluştur
            </Link>
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.06)] md:p-5">
            <div className="grid gap-3 md:grid-cols-5">
              <SearchableSelect
                value={cityId}
                onChange={setCityId}
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
                className="min-h-12 cursor-pointer rounded-2xl bg-[#06264a] px-5 text-sm font-black text-white transition hover:bg-[#0b355f]"
              >
                Temizlikçi Getir
              </button>

              <button
                type="button"
                onClick={clearFilters}
                className="min-h-12 cursor-pointer rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-[#06264a] transition hover:border-[#f6a313] hover:text-[#f6a313]"
              >
                Filtreyi Temizle
              </button>
            </div>
          </div>

          <div className="mt-5">
            {loading && !pageLoading && (
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

            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-bold text-red-700">
                {error}
              </div>
            )}

            {!loading && !error && cleaners.length === 0 && (
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

            {!loading && !error && cleaners.length > 0 && (
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
                      className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/70 md:p-6"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
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
                                {cleaner.cleaner_profile?.services?.length || 0}
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
                          {canSeeContact ? (
                            <CustomerContactBox cleaner={cleaner} />
                          ) : (
                            <LockedContactBox />
                          )}
                        </div>
                      </div>
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
                      disabled={meta.current_page <= 1 || pageLoading}
                      onClick={() => loadCleaners(meta.current_page - 1)}
                      className="min-h-11 cursor-pointer rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-[#06264a] transition hover:border-[#f6a313] hover:text-[#f6a313] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Önceki
                    </button>

                    <button
                      type="button"
                      disabled={
                        meta.current_page >= meta.last_page || pageLoading
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
    </main>
  );
}