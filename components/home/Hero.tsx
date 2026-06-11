import Link from "next/link";
import { cities, districts, services } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-12 pt-4 md:pb-20 md:pt-8">
      <div className="container-main">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#f6a313]" />
              <span className="text-xs font-black uppercase tracking-[0.14em] text-[#06264a] sm:text-sm">
                Temizlikçi bulmanın kolay yolu
              </span>
            </div>

            <h1 className="text-balance text-[42px] font-black leading-[0.98] tracking-[-0.06em] text-[#06264a] sm:text-6xl lg:text-7xl">
              Eviniz ve iş yeriniz için güvenilir temizlikçi bulun.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              İl ve ilçenizi seçin, talebinizi oluşturun. Bölgenizdeki
              temizlikçiler talebinizi görsün, siz hızlıca çözüm bulun.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/temizlikci-bul"
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#f6a313] px-7 py-4 text-base font-black text-white shadow-xl shadow-orange-400/25 transition hover:-translate-y-1 hover:bg-[#e58f00]"
              >
                Temizlikçi Bul
              </Link>

              <Link
                href="/temizlikci-ol"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-base font-black text-[#06264a] shadow-sm transition hover:-translate-y-1 hover:border-orange-200"
              >
                Temizlikçi Olarak Kayıt Ol
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="soft-card rounded-[1.4rem] p-4">
                <div className="text-2xl font-black text-[#06264a]">1 dk</div>
                <div className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">
                  Temizlikçi Bul
                </div>
              </div>

              <div className="soft-card rounded-[1.4rem] p-4">
                <div className="text-2xl font-black text-[#06264a]">Yerel</div>
                <div className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">
                  İlçe bazlı
                </div>
              </div>

              <div className="soft-card rounded-[1.4rem] p-4">
                <div className="text-2xl font-black text-[#06264a]">Kolay</div>
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
                  Hızlı Talep Formu
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                  Temizlik ihtiyacınızı hemen oluşturun.
                </h2>

                <div className="mt-6 grid gap-3">
                  <input
                    placeholder="Ad Soyad"
                    className="min-h-14 rounded-2xl border border-white/10 bg-white/10 px-4 text-white placeholder:text-blue-100 outline-none focus:border-orange-300"
                  />

                  <input
                    placeholder="Telefon"
                    className="min-h-14 rounded-2xl border border-white/10 bg-white/10 px-4 text-white placeholder:text-blue-100 outline-none focus:border-orange-300"
                  />

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

                  <Link
                    href="/temizlikci-bul"
                    className="mt-2 flex min-h-14 items-center justify-center rounded-full bg-[#f6a313] px-6 text-center font-black text-white shadow-lg shadow-orange-400/25 transition hover:bg-[#e58f00]"
                  >
                    Temizlikçi Bul
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-3 p-3 sm:grid-cols-3">
              <div className="rounded-[1.2rem] bg-white p-4">
                <div className="font-black text-[#06264a]">Kontrollü</div>
                <div className="mt-1 text-xs text-slate-500">
                  Telefon görünümü
                </div>
              </div>

              <div className="rounded-[1.2rem] bg-white p-4">
                <div className="font-black text-[#06264a]">Kayıtlı</div>
                <div className="mt-1 text-xs text-slate-500">
                  Temizlikçiler
                </div>
              </div>

              <div className="rounded-[1.2rem] bg-white p-4">
                <div className="font-black text-[#06264a]">Panel</div>
                <div className="mt-1 text-xs text-slate-500">Talep takibi</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden whitespace-nowrap rounded-full border border-slate-200 bg-white py-4 shadow-sm">
          <div className="flex min-w-max gap-8 px-6 text-lg font-black text-[#06264a] sm:text-2xl">
            <span>✦ Ev Temizliği</span>
            <span>✦ Ofis Temizliği</span>
            <span>✦ Günlük Temizlikçi</span>
            <span>✦ Saatlik Temizlik</span>
            <span>✦ İnşaat Sonrası</span>
          </div>
        </div>
      </div>
    </section>
  );
}