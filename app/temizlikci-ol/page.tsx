import Link from "next/link";
import { cities, districts, services } from "@/lib/site";

export default function CleanerRegisterPage() {
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
                Temizlikçi Üyeliği
              </p>

              <h1 className="mt-4 text-4xl font-black leading-tight tracking-[-0.05em]">
                İş taleplerine ulaşmak için profilinizi oluşturun.
              </h1>

              <p className="mt-5 text-sm leading-8 text-blue-100">
                Kayıt olduktan sonra bölgenizdeki temizlik taleplerini
                görebilir, işveren iletişim bilgilerine ulaşabilirsiniz.
              </p>

              <div className="mt-7 grid gap-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="font-black">Bölgesel talepler</div>
                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Kendi il ve ilçenizdeki iş taleplerini görün.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="font-black">Profil görünürlüğü</div>
                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Temizlikçi arayan kullanıcılar profilinizi görebilir.
                  </p>
                </div>
              </div>
            </aside>

            <form className="soft-card rounded-[2.2rem] p-5 md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Ad Soyad
                  </span>
                  <input
                    placeholder="Adınız soyadınız"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Telefon
                  </span>
                  <input
                    placeholder="05xx xxx xx xx"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    E-posta
                  </span>
                  <input
                    type="email"
                    placeholder="ornek@mail.com"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Şifre
                  </span>
                  <input
                    type="password"
                    placeholder="Şifre oluşturun"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    İl
                  </span>
                  <select className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white">
                    <option>İl seçiniz</option>
                    {cities.map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    İlçe
                  </span>
                  <select className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white">
                    <option>İlçe seçiniz</option>
                    {districts.map((district) => (
                      <option key={district}>{district}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Deneyim
                  </span>
                  <select className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white">
                    <option>0-1 yıl</option>
                    <option>1-3 yıl</option>
                    <option>3-5 yıl</option>
                    <option>5 yıl ve üzeri</option>
                  </select>
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Günlük Ücret Beklentisi
                  </span>
                  <input
                    placeholder="Örn. 1.500 TL"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                  />
                </label>
              </div>

              <div className="mt-5">
                <span className="mb-3 block text-sm font-black text-slate-700">
                  Verdiğiniz hizmetler
                </span>

                <div className="grid gap-2 sm:grid-cols-2">
                  {services.map((service) => (
                    <label
                      key={service}
                      className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700"
                    >
                      <input type="checkbox" />
                      {service}
                    </label>
                  ))}
                </div>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-black text-slate-700">
                  Kısa açıklama
                </span>
                <textarea
                  rows={5}
                  placeholder="Kendinizden, deneyiminizden ve çalışabileceğiniz bölgelerden bahsedin."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
                />
              </label>

              <label className="mt-5 flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <input type="checkbox" className="mt-1" />
                <span>
                  KVKK Aydınlatma Metni ve Kullanım Şartları’nı okudum, kabul
                  ediyorum.
                </span>
              </label>

              <button
                type="button"
                className="mt-6 min-h-14 w-full rounded-full bg-[#f6a313] px-6 font-black text-white shadow-lg shadow-orange-400/25"
              >
                Temizlikçi Olarak Üye Ol
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}