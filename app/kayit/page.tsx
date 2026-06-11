"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthUser } from "@/lib/auth";

export default function RegisterChoicePage() {
  const router = useRouter();

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const user = getAuthUser();

    if (!user) {
      setAuthChecked(true);
      return;
    }

    if (user.role === "cleaner") {
      router.replace("/is-talepleri");
      return;
    }

    if (user.role === "customer") {
      router.replace("/temizlikci-bul");
      return;
    }

    router.replace("/");
  }, [router]);

  if (!authChecked) {
    return null;
  }

  return (
    <main className="page-bottom-space py-8 md:py-14">
      <div className="container-main">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="text-sm font-black text-[#06264a]">
            ← Ana sayfaya dön
          </Link>

          <div className="mt-7 text-center">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
              Üyelik
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#06264a] md:text-6xl">
              Nasıl devam etmek istiyorsunuz?
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Temizlikçi arıyorsanız temizlikçi profillerini görüntüleyebilir,
              temizlikçiyseniz iş taleplerine ulaşabilirsiniz.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Link
              href="/kullanici-kayit"
              className="group soft-card rounded-[2rem] p-6 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-950/10 md:p-8"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-100 text-3xl">
                🏠
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-[-0.04em] text-[#06264a]">
                Temizlikçi arıyorum
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Bölgenizdeki temizlikçileri listeleyin. Telefon bilgilerine
                ulaşmak için ücretsiz hesap oluşturun.
              </p>

              <div className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-6 text-sm font-black text-white">
                Kullanıcı Olarak Üye Ol
              </div>
            </Link>

            <Link
              href="/temizlikci-ol"
              className="group rounded-[2rem] bg-[#06264a] p-6 text-white shadow-2xl shadow-blue-950/20 transition hover:-translate-y-2 md:p-8"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-3xl">
                🧹
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-[-0.04em]">
                Temizlikçiyim
              </h2>

              <p className="mt-4 text-sm leading-7 text-blue-100">
                Profilinizi oluşturun. Bölgenizdeki işveren taleplerini görün
                ve iletişime geçin.
              </p>

              <div className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-black text-[#06264a]">
                Temizlikçi Olarak Üye Ol
              </div>
            </Link>
          </div>

          <div className="mt-6 text-center text-sm font-bold text-slate-600">
            Zaten hesabınız var mı?{" "}
            <Link href="/giris" className="font-black text-[#06264a]">
              Giriş yapın
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}