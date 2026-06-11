import Link from "next/link";
import { cities, districts, services } from "@/lib/site";

export default function Hero() {
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
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="soft-card rounded-[1.4rem] p-4">
                <div className="text-2xl font-black text-[#06264a]">Yerel</div>
                <div className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">
                  İlçe bazlı
                </div>
              </div>

              <div className="soft-card rounded-[1.4rem] p-4">
                <div className="text-2xl font-black text-[#06264a]">Korumalı</div>
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
            <div className="relative overflow-hidden rounded-[1.7rem] bg-[#06264a] p-5 text-white sm:p-7">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#f6a313]/25 blur-2xl" />
              <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-blue-400/20 blur-2xl" />

              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-200">
                  Hızlı Listeleme
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                  Size yakın temizlikçileri listeleyin.
                </h2>

                <p className="mt-3 text-sm leading-7 text-blue-100">
                  Bölgenizi seçin, temizlikçi listesine gidin. Telefon bilgileri
                  sadece giriş yapan kullanıcılara gösterilir.
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <select className="min-h-14 rounded-2xl border border-white/10 bg-white/10 px-4 text-white outline-none focus:border-orange-300">
                      <option className="text-slate-900">İl seçiniz</option>
                      {cities.map((city) => (
                        <option className="text-slate-900" key={city}>
                          {city}
                        </option>
                      ))}
                    </select>

                    <select className="min-h-14 rounded-2xl border border-white/10 bg-white/10 px-4 text-white outline-none focus:border-orange-300">
                      <option className="text-slate-900">İlçe seçiniz</option>
                      {districts.map((district) => (
                        <option className="text-slate-900" key={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>

                  <select className="min-h-14 rounded-2xl border border-white/10 bg-white/10 px-4 text-white outline-none focus:border-orange-300">
                    <option className="text-slate-900">Temizlik türü</option>
                    {services.map((service) => (
                      <option className="text-slate-900" key={service}>
                        {service}
                      </option>
                    ))}
                  </select>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link
                      href="/temizlikci-bul"
                      className="flex min-h-14 items-center justify-center rounded-full bg-[#f6a313] px-6 text-center font-black text-white shadow-lg shadow-orange-400/25 transition hover:bg-[#e58f00]"
                    >
                      Temizlikçi Listele
                    </Link>

                    <Link
                      href="/kayit"
                      className="flex min-h-14 items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 text-center font-black text-white transition hover:bg-white/15"
                    >
                      Üye Ol
                    </Link>
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
                    Telefon için giriş gerekir
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
        Telefon bilgilerine erişmek ve ilanları görmek için hesap oluşturun.
      </p>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#06264a]">
        Üyelik seç
        <span className="transition group-hover:translate-x-1">→</span>
      </div>
    </div>
  </Link>
</div>
      </div>
    </section>
  );
}