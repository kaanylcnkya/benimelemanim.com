"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { clearAuth, getAuthUser, type AuthUser } from "@/lib/auth";
import { getOpenJobRequests, type JobRequest } from "@/lib/jobRequests";
import { services } from "@/lib/site";
import {
  getCities,
  getDistricts,
  type City,
  type District,
} from "@/lib/locations";
import PageLoader from "@/components/ui/PageLoader";
import SearchableSelect from "@/components/ui/SearchableSelect";

type ApiError = {
  status?: number;
  message?: string;
};

const previewJobs = [
  {
    title: "Haftalık ev temizliği talebi",
    service_type: "Ev Temizliği",
    location: "İstanbul / Kadıköy",
    budget: "1.500 TL",
  },
  {
    title: "Ofis genel temizlik işi",
    service_type: "Ofis Temizliği",
    location: "Ankara / Çankaya",
    budget: "2.000 TL",
  },
  {
    title: "Taşınma sonrası detaylı temizlik",
    service_type: "Detaylı Temizlik",
    location: "İzmir / Bornova",
    budget: "3.000 TL",
  },
];

function LockedJobRequests() {
  return (
    <main className="page-bottom-space py-8 md:py-14">
      <div className="container-main">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2.4rem] bg-[#06264a] p-7 text-white md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-200">
              İş Talepleri
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-[-0.06em] md:text-5xl">
              Bölgenizdeki temizlik işlerini görmek için giriş yapın.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-8 text-blue-100">
              İş taleplerinin detayları ve müşteri iletişim bilgileri sadece
              temizlikçi üyelerine gösterilir. Ücretsiz kayıt olarak iş
              fırsatlarına ulaşabilirsiniz.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/giris"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-6 text-sm font-black text-white shadow-lg shadow-orange-400/25"
              >
                Giriş Yap
              </Link>

              <Link
                href="/temizlikci-ol"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-black text-[#06264a]"
              >
                Temizlikçi Olarak Üye Ol
              </Link>
            </div>
          </div>

          <div className="relative mt-8">
            <div className="grid gap-4">
              {previewJobs.map((job, index) => (
                <article
                  key={index}
                  className="relative overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:p-6"
                >
                  <div className="pointer-events-none select-none blur-[5px]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                        Açık Talep
                      </span>

                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-[#b86b00]">
                        {job.service_type}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#06264a]">
                      {job.title}
                    </h2>

                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                          Konum
                        </div>
                        <div className="mt-2 font-black text-[#06264a]">
                          {job.location}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                          Bütçe
                        </div>
                        <div className="mt-2 font-black text-[#06264a]">
                          {job.budget}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                          Müşteri
                        </div>
                        <div className="mt-2 font-black text-[#06264a]">
                          05xx xxx xx xx
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center bg-white/55 backdrop-blur-[1px]">
                    <div className="mx-4 max-w-md rounded-[1.6rem] bg-white p-5 text-center shadow-2xl">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#06264a] text-white">
                        🔒
                      </div>

                      <h3 className="mt-4 text-xl font-black tracking-[-0.04em] text-[#06264a]">
                        Detaylar kilitli
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        İş detaylarını ve müşteri iletişim bilgilerini görmek
                        için temizlikçi hesabıyla giriş yapın.
                      </p>

                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <Link
                          href="/giris"
                          className="rounded-full bg-[#06264a] px-5 py-3 text-sm font-black text-white"
                        >
                          Giriş Yap
                        </Link>

                        <Link
                          href="/temizlikci-ol"
                          className="rounded-full bg-[#f6a313] px-5 py-3 text-sm font-black text-white"
                        >
                          Üye Ol
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CustomerView() {
  return (
    <main className="page-bottom-space py-8 md:py-14">
      <div className="container-main">
        <div className="mx-auto max-w-4xl rounded-[2.4rem] bg-white p-7 text-center shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-3xl">
            🧹
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-[-0.06em] text-[#06264a]">
            Temizlik talebi oluşturun
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
            İş talepleri temizlikçi hesapları içindir. Temizlikçi arıyorsanız
            yeni talep oluşturabilir veya mevcut taleplerinizi takip
            edebilirsiniz.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/talep-olustur"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-6 text-sm font-black text-white"
            >
              Yeni Talep Oluştur
            </Link>

            <Link
              href="/taleplerim"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-black text-[#06264a]"
            >
              Taleplerim
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function CleanerJobRequests() {
  const [jobRequests, setJobRequests] = useState<JobRequest[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState("");

  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const [cityId, setCityId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [serviceType, setServiceType] = useState("");

  const [cityLoading, setCityLoading] = useState(true);
  const [districtLoading, setDistrictLoading] = useState(false);

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

  async function loadJobRequests(
    customFilters?: {
      city_id?: string;
      district_id?: string;
      service_type?: string;
    }
  ) {
    try {
      setListLoading(true);
      setError("");

      const response = await getOpenJobRequests({
        city_id: customFilters?.city_id ?? cityId,
        district_id: customFilters?.district_id ?? districtId,
      });

      const selectedService = customFilters?.service_type ?? serviceType;

      const filtered = selectedService
        ? response.data.filter((job) => job.service_type === selectedService)
        : response.data;

      setJobRequests(filtered);
    } catch (err) {
      const apiError = err as ApiError;

      if (apiError.status === 401) {
        clearAuth();
        setError("Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.");
        return;
      }

      setError(
        apiError.message || "İş talepleri yüklenemedi. Lütfen tekrar deneyin."
      );
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

    loadJobRequests({
      city_id: "",
      district_id: "",
      service_type: "",
    });
  }

  useEffect(() => {
    loadJobRequests();
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

  return (
    <main className="page-bottom-space py-8 md:py-14">
      <div className="container-main">
        <div className="mx-auto max-w-6xl">
          <div>
            <Link href="/" className="text-sm font-black text-[#06264a]">
              ← Ana sayfaya dön
            </Link>

            <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
              İş Talepleri
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-[#06264a] md:text-5xl">
              Açık temizlik işleri
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              Yayındaki temizlik taleplerini inceleyin ve müşteriyle doğrudan
              iletişime geçin.
            </p>
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
                onClick={() => loadJobRequests()}
                disabled={listLoading}
                className="min-h-12 cursor-pointer rounded-2xl bg-[#06264a] px-5 text-sm font-black text-white transition hover:bg-[#0b355f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Talepleri Getir
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

          <div className="relative mt-5 min-h-[260px] rounded-[2.2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:p-6">
            {listLoading && !initialLoading && (
              <PageLoader text="Talepler güncelleniyor..." />
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
                      className="animate-pulse rounded-[1.6rem] bg-slate-50 p-5"
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

              {!initialLoading && !error && jobRequests.length === 0 && (
                <div className="rounded-[1.8rem] bg-slate-50 p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                    📭
                  </div>

                  <h2 className="mt-5 text-2xl font-black tracking-[-0.04em] text-[#06264a]">
                    Şu an uygun iş talebi yok
                  </h2>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
                    Filtreleri değiştirebilir veya daha sonra tekrar kontrol
                    edebilirsiniz.
                  </p>
                </div>
              )}

              {!initialLoading && !error && jobRequests.length > 0 && (
                <div className="grid gap-4">
                  {jobRequests.map((job) => (
                    <article
                      key={job.id}
                      className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60 md:p-6"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                              Açık Talep
                            </span>

                            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-[#b86b00]">
                              {job.service_type}
                            </span>

                            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 ring-1 ring-slate-200">
                              #{job.id}
                            </span>
                          </div>

                          <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#06264a]">
                            {job.title}
                          </h2>

                          {job.description && (
                            <p className="mt-4 text-sm leading-7 text-slate-600">
                              {job.description}
                            </p>
                          )}

                          <div className="mt-5 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                            <div className="rounded-2xl bg-white p-4">
                              <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                                Konum
                              </div>
                              <div className="mt-2 font-black text-[#06264a]">
                                {job.city?.name || "-"}
                                {job.district?.name
                                  ? ` / ${job.district.name}`
                                  : ""}
                              </div>
                            </div>

                            <div className="rounded-2xl bg-white p-4">
                              <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                                Tarih / Saat
                              </div>
                              <div className="mt-2 font-black text-[#06264a]">
                                {job.work_date || "Tarih belirtilmedi"}
                                {job.work_time ? ` - ${job.work_time}` : ""}
                              </div>
                            </div>

                            <div className="rounded-2xl bg-white p-4">
                              <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                                Bütçe
                              </div>
                              <div className="mt-2 font-black text-[#06264a]">
                                {job.budget || "Belirtilmedi"}
                              </div>
                            </div>

                            <div className="rounded-2xl bg-white p-4">
                              <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                                Adres Detayı
                              </div>
                              <div className="mt-2 font-black text-[#06264a]">
                                {job.address_detail || "Belirtilmedi"}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 rounded-[1.6rem] bg-[#06264a] p-5 text-white lg:w-80">
                          <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-200">
                            Müşteri Bilgileri
                          </div>

                          <div className="mt-4 text-xl font-black">
                            {job.customer?.name || "Müşteri"}
                          </div>

                          <div className="mt-4 grid gap-3">
                            {job.customer?.phone && (
                              <a
                                href={`tel:${job.customer.phone}`}
                                className="flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-5 text-sm font-black text-white transition hover:bg-[#e58f00]"
                              >
                                Ara: {job.customer.phone}
                              </a>
                            )}

                            {job.customer?.phone && (
                              <a
                                href={`https://wa.me/9${job.customer.phone.replace(
                                  /\D/g,
                                  ""
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex min-h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-black text-[#06264a] transition hover:bg-blue-50"
                              >
                                WhatsApp ile Yaz
                              </a>
                            )}

                            {job.customer?.email && (
                              <a
                                href={`mailto:${job.customer.email}`}
                                className="flex min-h-12 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-black text-white transition hover:bg-white/10"
                              >
                                E-posta Gönder
                              </a>
                            )}
                          </div>

                          {!job.customer?.phone && !job.customer?.email && (
                            <p className="mt-4 rounded-2xl bg-white/10 p-4 text-xs leading-6 text-blue-100">
                              Bu talep için iletişim bilgisi henüz
                              görüntülenemiyor.
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function JobRequestsPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const authUser = getAuthUser();

    setUser(authUser);
    setAuthChecked(true);
  }, []);

  if (!authChecked) {
    return null;
  }

  if (!user) {
    return <LockedJobRequests />;
  }

  if (user.role === "customer") {
    return <CustomerView />;
  }

  if (user.role === "cleaner") {
    return <CleanerJobRequests />;
  }

  return <LockedJobRequests />;
}