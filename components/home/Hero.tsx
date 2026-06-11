"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getAuthUser, type AuthUser } from "@/lib/auth";
import {
  getCities,
  getDistricts,
  type City,
  type District,
} from "@/lib/locations";
import SearchableSelect from "@/components/ui/SearchableSelect";

export default function Hero() {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [cityLoading, setCityLoading] = useState(true);
  const [districtLoading, setDistrictLoading] = useState(false);

  useEffect(() => {
    function syncUser() {
      setUser(getAuthUser());
    }

    syncUser();

    window.addEventListener("auth_changed", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("auth_changed", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  useEffect(() => {
    async function loadCities() {
      try {
        setCityLoading(true);

        const response = await getCities();

        setCities(response.data);
      } catch {
        setCities([]);
      } finally {
        setCityLoading(false);
      }
    }

    loadCities();
  }, []);

  useEffect(() => {
    async function loadDistricts() {
      if (!selectedCity) {
        setDistricts([]);
        setSelectedDistrict("");
        return;
      }

      try {
        setDistrictLoading(true);
        setSelectedDistrict("");

        const response = await getDistricts(selectedCity);

        setDistricts(response.data);
      } catch {
        setDistricts([]);
      } finally {
        setDistrictLoading(false);
      }
    }

    loadDistricts();
  }, [selectedCity]);

  const featuredCleaners = [
    {
      name: "Ayşe K.",
      location: "Kadıköy",
      rating: "4.8",
      service: "Ev Temizliği",
    },
    {
      name: "Fatma D.",
      location: "Maltepe",
      rating: "4.9",
      service: "Ofis Temizliği",
    },
    {
      name: "Zeynep A.",
      location: "Çankaya",
      rating: "4.7",
      service: "Günlük Temizlik",
    },
  ];

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

  const quickCleanerHref = useMemo(() => {
    const params = new URLSearchParams();

    if (selectedCity) params.set("city_id", selectedCity);
    if (selectedDistrict) params.set("district_id", selectedDistrict);

    const query = params.toString();

    return `/temizlikci-bul${query ? `?${query}` : ""}`;
  }, [selectedCity, selectedDistrict]);

  const isCustomer = user?.role === "customer";
  const isCleaner = user?.role === "cleaner";
  const isGuest = !user;

  return (
    <section className="relative overflow-hidden pb-12 pt-4 md:pb-20 md:pt-8">
      <div className="container-main">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#f6a313]" />
              <span className="text-xs font-black uppercase tracking-[0.14em] text-[#06264a] sm:text-sm">
                Bölgenizdeki temizlikçileri bulun
              </span>
            </div>

            <h1 className="text-balance text-[42px] font-black leading-[0.98] tracking-[-0.06em] text-[#06264a] sm:text-6xl lg:text-7xl">
              Temizlikçi arayanlarla temizlikçileri buluşturuyoruz.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              İl ve ilçenizi seçerek yakınınızdaki temizlikçileri listeleyin.
              Telefon bilgilerine ulaşmak için ücretsiz üye olun. Temizlikçiler
              ise bölgesindeki iş taleplerini görebilir.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {isGuest && (
                <>
                  <Link
                    href="/temizlikci-bul"
                    className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#f6a313] px-7 py-4 text-base font-black text-white shadow-xl shadow-orange-400/25 transition hover:-translate-y-1 hover:bg-[#e58f00]"
                  >
                    Temizlikçi Bul
                  </Link>

                  <Link
                    href="/is-talepleri"
                    className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#06264a] px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-950/20 transition hover:-translate-y-1 hover:bg-[#0b355f]"
                  >
                    İş Taleplerini Gör
                  </Link>

                  <Link
                    href="/temizlikci-ol"
                    className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-base font-black text-[#06264a] shadow-sm transition hover:-translate-y-1 hover:border-orange-200"
                  >
                    Temizlikçi Ol
                  </Link>
                </>
              )}

              {isCustomer && (
                <>
                  <Link
                    href="/temizlikci-bul"
                    className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#f6a313] px-7 py-4 text-base font-black text-white shadow-xl shadow-orange-400/25 transition hover:-translate-y-1 hover:bg-[#e58f00]"
                  >
                    Temizlikçi Bul
                  </Link>

                  <Link
                    href="/talep-olustur"
                    className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#06264a] px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-950/20 transition hover:-translate-y-1 hover:bg-[#0b355f]"
                  >
                    Talep Oluştur
                  </Link>

                  <Link
                    href="/taleplerim"
                    className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-base font-black text-[#06264a] shadow-sm transition hover:-translate-y-1 hover:border-orange-200"
                  >
                    Taleplerim
                  </Link>
                </>
              )}

              {isCleaner && (
                <>
                  <Link
                    href="/is-talepleri"
                    className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#f6a313] px-7 py-4 text-base font-black text-white shadow-xl shadow-orange-400/25 transition hover:-translate-y-1 hover:bg-[#e58f00]"
                  >
                    İş Taleplerini Gör
                  </Link>

                  <Link
                    href="/temizlikci-bul"
                    className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#06264a] px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-950/20 transition hover:-translate-y-1 hover:bg-[#0b355f]"
                  >
                    Temizlikçi Listesi
                  </Link>
                </>
              )}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="soft-card rounded-[1.4rem] p-4">
                <div className="text-2xl font-black text-[#06264a]">Yerel</div>
                <div className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">
                  İlçe bazlı
                </div>
              </div>

              <div className="soft-card rounded-[1.4rem] p-4">
                <div className="text-2xl font-black text-[#06264a]">
                  Korumalı
                </div>
                <div className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">
                  Telefon erişimi
                </div>
              </div>

              <div className="soft-card rounded-[1.4rem] p-4">
                <div className="text-2xl font-black text-[#06264a]">Hızlı</div>
                <div className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">
                  Mobil uyumlu
                </div>
              </div>
            </div>
          </div>

          <div className="clean-card rounded-[2rem] p-3 sm:p-4">
            <div className="relative overflow-visible rounded-[1.7rem] bg-[#06264a] p-4 text-white sm:p-7">
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#f6a313]/25 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-blue-400/20 blur-2xl" />

              <div className="relative">
                <div className="rounded-[1.4rem] border border-white/10 bg-white/10 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f6a313] text-xl">
                      🔎
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-200">
                        Hızlı Listeleme
                      </p>

                      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                        Size yakın temizlikçileri listeleyin.
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-blue-100">
                        İl ve ilçe seçerek temizlikçi listesine hızlıca gidin.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 rounded-[1.4rem] bg-white p-3 text-[#06264a] shadow-2xl shadow-blue-950/10 sm:p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label className="px-1 text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                        İl
                      </label>

                      <SearchableSelect
                        value={selectedCity}
                        onChange={(value) => {
                          setSelectedCity(value);
                          setSelectedDistrict("");
                        }}
                        options={cityOptions}
                        placeholder={
                          cityLoading ? "İller yükleniyor..." : "İl seçiniz"
                        }
                        searchPlaceholder="İl ara..."
                        disabled={cityLoading}
                      />
                    </div>

                    <div className="grid gap-2">
                      <label className="px-1 text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                        İlçe
                      </label>

                      <SearchableSelect
                        value={selectedDistrict}
                        onChange={setSelectedDistrict}
                        options={districtOptions}
                        placeholder={
                          districtLoading
                            ? "İlçeler yükleniyor..."
                            : "İlçe seçiniz"
                        }
                        searchPlaceholder="İlçe ara..."
                        disabled={!selectedCity || districtLoading}
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link
                      href={quickCleanerHref}
                      className="flex min-h-13 items-center justify-center rounded-full bg-[#f6a313] px-6 py-4 text-center text-sm font-black text-white shadow-lg shadow-orange-400/25 transition hover:-translate-y-0.5 hover:bg-[#e58f00]"
                    >
                      Temizlikçi Listele
                    </Link>

                    {isGuest && (
                      <Link
                        href="/kayit"
                        className="flex min-h-13 items-center justify-center rounded-full border border-slate-200 bg-[#06264a] px-6 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0b355f]"
                      >
                        Üye Ol
                      </Link>
                    )}

                    {isCustomer && (
                      <Link
                        href="/talep-olustur"
                        className="flex min-h-13 items-center justify-center rounded-full border border-slate-200 bg-[#06264a] px-6 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0b355f]"
                      >
                        Talep Oluştur
                      </Link>
                    )}

                    {isCleaner && (
                      <Link
                        href="/is-talepleri"
                        className="flex min-h-13 items-center justify-center rounded-full border border-slate-200 bg-[#06264a] px-6 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0b355f]"
                      >
                        İş Talepleri
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-black text-[#06264a]">
                    Öne çıkan temizlikçiler
                  </div>
                  <div className="mt-1 text-xs font-bold text-slate-500">
                    Telefon için müşteri girişi gerekir
                  </div>
                </div>

                <Link
                  href="/temizlikci-bul"
                  className="text-xs font-black text-[#f6a313]"
                >
                  Tümünü Gör
                </Link>
              </div>

              <div className="grid gap-3">
                {featuredCleaners.map((cleaner) => (
                  <div
                    key={cleaner.name}
                    className="flex items-center justify-between gap-3 rounded-[1.2rem] bg-white p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#06264a] text-sm font-black text-white">
                        {cleaner.name.charAt(0)}
                      </div>

                      <div className="min-w-0">
                        <div className="truncate font-black text-[#06264a]">
                          {cleaner.name}
                        </div>
                        <div className="mt-1 truncate text-xs font-bold text-slate-500">
                          {cleaner.location} • {cleaner.service}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-[#e58f00]">
                      ⭐ {cleaner.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Link
            href="/temizlikci-bul"
            className="group relative overflow-hidden rounded-[1.8rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/10"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-100 transition group-hover:scale-125" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6a313] text-2xl">
                🧹
              </div>

              <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-[#06264a]">
                Temizlikçi Bul
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                İl ve ilçenizi seçerek yakınınızdaki temizlikçileri listeleyin.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#f6a313]">
                Listeye git
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>

          {isGuest || isCleaner ? (
            <Link
              href="/is-talepleri"
              className="group relative overflow-hidden rounded-[1.8rem] bg-[#06264a] p-5 text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/20"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 transition group-hover:scale-125" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                  💼
                </div>

                <h3 className="mt-5 text-xl font-black tracking-[-0.03em]">
                  İş Taleplerini Gör
                </h3>

                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Temizlikçiyseniz bölgenizdeki işveren taleplerini görüntüleyin.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-orange-200">
                  Taleplere git
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href="/talep-olustur"
              className="group relative overflow-hidden rounded-[1.8rem] bg-[#06264a] p-5 text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/20"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 transition group-hover:scale-125" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                  📝
                </div>

                <h3 className="mt-5 text-xl font-black tracking-[-0.03em]">
                  Talep Oluştur
                </h3>

                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Temizlik ihtiyacınızı yayınlayın, uygun temizlikçiler size
                  ulaşsın.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-orange-200">
                  Talep aç
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          )}

          {isGuest ? (
            <Link
              href="/kayit"
              className="group relative overflow-hidden rounded-[1.8rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/10"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-50 transition group-hover:scale-125" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                  🔐
                </div>

                <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-[#06264a]">
                  Ücretsiz Üye Ol
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Telefon bilgilerine erişmek ve ilanları görmek için hesap
                  oluşturun.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#06264a]">
                  Üyelik seç
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ) : isCustomer ? (
            <Link
              href="/taleplerim"
              className="group relative overflow-hidden rounded-[1.8rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/10"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-50 transition group-hover:scale-125" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                  📋
                </div>

                <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-[#06264a]">
                  Taleplerim
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Yayınladığınız temizlik taleplerini buradan takip edin.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#06264a]">
                  Taleplerime git
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href="/is-talepleri"
              className="group relative overflow-hidden rounded-[1.8rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/10"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-50 transition group-hover:scale-125" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                  🔎
                </div>

                <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-[#06264a]">
                  Açık İşler
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Yayındaki iş taleplerini inceleyin ve müşterilerle iletişime
                  geçin.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#06264a]">
                  İşlere git
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}