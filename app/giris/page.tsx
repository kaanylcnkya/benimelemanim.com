import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="page-bottom-space py-8 md:py-14">
      <div className="container-main">
        <div className="grid min-h-[calc(100vh-190px)] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden lg:block">
            <div className="rounded-[2.4rem] bg-[#06264a] p-10 text-white shadow-2xl shadow-blue-950/20">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-200">
                BenimElemanım
              </p>

              <h1 className="mt-5 text-5xl font-black leading-tight tracking-[-0.06em]">
                Temizlikçi ve işverenleri tek platformda buluşturuyoruz.
              </h1>

              <p className="mt-6 max-w-md text-base leading-8 text-blue-100">
                Giriş yaparak temizlikçi telefonlarına ulaşabilir veya iş
                taleplerini görüntüleyebilirsiniz.
              </p>

              <div className="mt-8 grid gap-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="font-black">Temizlikçi arayanlar için</div>
                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Bölgenizdeki temizlikçileri listeleyin, iletişim bilgilerine
                    giriş yaptıktan sonra ulaşın.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="font-black">Temizlikçiler için</div>
                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Yakınınızdaki işveren taleplerini görün ve iletişime geçin.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="soft-card rounded-[2.2rem] p-5 md:p-8">
              <Link href="/" className="text-sm font-black text-[#06264a]">
                ← Ana sayfaya dön
              </Link>

              <div className="mt-7">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
                  Giriş Yap
                </p>

                <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#06264a]">
                  Hesabınıza giriş yapın
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Telefon bilgilerine ve iş taleplerine erişmek için giriş
                  yapmanız gerekir.
                </p>
              </div>

              <form className="mt-7 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Telefon veya E-posta
                  </span>
                  <input
                    type="text"
                    placeholder="05xx xxx xx xx veya e-posta"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Şifre
                  </span>
                  <input
                    type="password"
                    placeholder="Şifrenizi girin"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-[#f6a313] focus:bg-white"
                  />
                </label>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <label className="flex items-center gap-2 font-bold text-slate-600">
                    <input type="checkbox" />
                    Beni hatırla
                  </label>

                  <Link href="#" className="font-black text-[#06264a]">
                    Şifremi unuttum
                  </Link>
                </div>

                <button
                  type="button"
                  className="min-h-14 w-full rounded-full bg-[#06264a] px-6 font-black text-white shadow-lg shadow-blue-950/20 transition hover:bg-[#0b355f]"
                >
                  Giriş Yap
                </button>
              </form>

              <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-center">
                <p className="text-sm font-bold text-slate-600">
                  Henüz hesabınız yok mu?
                </p>

                <Link
                  href="/kayit"
                  className="mt-3 flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-5 text-sm font-black text-white"
                >
                  Ücretsiz Üye Ol
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}