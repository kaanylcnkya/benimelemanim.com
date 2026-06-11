import Link from "next/link";

export default function CustomerRegisterPage() {
  return (
    <main className="page-bottom-space py-8 md:py-14">
      <div className="container-main">
        <div className="mx-auto max-w-2xl">
          <Link href="/kayit" className="text-sm font-black text-[#06264a]">
            ← Üyelik seçimine dön
          </Link>

          <div className="soft-card mt-7 rounded-[2.2rem] p-5 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
              Temizlikçi Arayan Üyeliği
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#06264a]">
              Ücretsiz hesap oluşturun
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Temizlikçi telefon bilgilerine erişmek için hesabınızı oluşturun.
            </p>

            <form className="mt-7 grid gap-4">
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

              <label className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <input type="checkbox" className="mt-1" />
                <span>
                  KVKK Aydınlatma Metni ve Kullanım Şartları’nı okudum, kabul
                  ediyorum.
                </span>
              </label>

              <button
                type="button"
                className="min-h-14 rounded-full bg-[#f6a313] px-6 font-black text-white shadow-lg shadow-orange-400/25"
              >
                Üye Ol
              </button>
            </form>

            <div className="mt-6 text-center text-sm font-bold text-slate-600">
              Zaten hesabınız var mı?{" "}
              <Link href="/giris" className="font-black text-[#06264a]">
                Giriş yapın
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}