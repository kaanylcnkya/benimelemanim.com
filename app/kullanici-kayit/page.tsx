import Link from "next/link";
import { cities, districts } from "@/lib/site";

export default function CustomerRegisterPage() {
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
                Ücretsiz hesap oluşturduktan sonra temizlikçi telefon
                bilgilerini görüntüleyebilir ve doğrudan iletişime
                geçebilirsiniz.
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

            <form className="soft-card rounded-[2.2rem] p-5 md:p-8">
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

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Ad Soyad
                  </span>
                  <input
                    placeholder="Adınız soyadınız"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Telefon
                  </span>
                  <input
                    placeholder="05xx xxx xx xx"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    E-posta
                  </span>
                  <input
                    type="email"
                    placeholder="ornek@mail.com"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Şifre
                  </span>
                  <input
                    type="password"
                    placeholder="Şifre oluşturun"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    İl
                  </span>
                  <select className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white">
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
                  <select className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white">
                    <option>İlçe seçiniz</option>
                    {districts.map((district) => (
                      <option key={district}>{district}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-5 flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <input type="checkbox" className="mt-1" />
                <span>
                  KVKK Aydınlatma Metni, Gizlilik Politikası ve Kullanım
                  Şartları’nı okudum, kabul ediyorum.
                </span>
              </label>

              <button
                type="button"
                className="mt-6 min-h-14 w-full rounded-full bg-[#f6a313] px-6 font-black text-white shadow-lg shadow-orange-400/25 transition hover:bg-[#e58f00]"
              >
                Kullanıcı Olarak Üye Ol
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