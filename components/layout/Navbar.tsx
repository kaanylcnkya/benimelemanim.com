"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { clearAuth, getAuthUser, type AuthUser } from "@/lib/auth";

const navItems = [
  { label: "Hizmetler", href: "/#hizmetler" },
  { label: "Temizlikçi Ol", href: "/temizlikci-ol" },
];

export default function Navbar() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function loadUser() {
      setUser(getAuthUser());
    }

    loadUser();

    window.addEventListener("auth_changed", loadUser);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("auth_changed", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    setLogoutLoading(true);

    try {
      await apiFetch<{ message: string }>("/auth/logout", {
        method: "POST",
      });
    } catch {
      // Sunucu logout cevap vermezse bile local oturumu temizliyoruz.
    } finally {
      clearAuth();
      setUser(null);
      setUserMenuOpen(false);
      setOpen(false);
      setLogoutLoading(false);
      router.push("/");
      router.refresh();
    }
  }

  const isLoggedIn = Boolean(user);
  const firstName = user?.name?.split(" ")?.[0] || "Hesabım";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3">
      <div className="mx-auto max-w-7xl">
        <div
          className={`border border-white/70 bg-white/95 px-3 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl transition-all md:px-4 ${open ? "rounded-[2rem]" : "rounded-full"
            }`}
        >
          <div className="flex items-center justify-between gap-3">
            {/* LOGO */}
            <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#06264a] shadow-lg shadow-blue-950/20">
                <span className="text-sm font-black text-white">BE</span>
                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-[#f6a313]" />
              </div>

              <div className="min-w-0 leading-none">
                <div className="max-w-[150px] truncate text-[17px] font-black tracking-[-0.04em] text-[#06264a] sm:max-w-none sm:text-[20px]">
                  BenimElemanım
                </div>

                <div className="mt-1 hidden whitespace-nowrap text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 sm:block">
                  Cleaning Service
                </div>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden min-w-0 flex-1 justify-center xl:flex">
              <div className="flex items-center gap-1 rounded-full bg-slate-50 p-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-black text-slate-600 transition hover:bg-white hover:text-[#06264a] hover:shadow-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden shrink-0 items-center gap-2 md:flex">
              {!isLoggedIn ? (
                <>
            

                  <Link
                    href="/kayit"
                    className="hidden whitespace-nowrap rounded-full border border-slate-200 bg-white px-5 py-3 text-[13px] font-black text-[#06264a] transition hover:-translate-y-0.5 hover:border-[#f6a313] hover:text-[#f6a313] lg:inline-flex"
                  >
                    Üye Ol
                  </Link>

                  <Link
                    href="/is-talepleri"
                    className="hidden whitespace-nowrap rounded-full border border-slate-200 bg-white px-5 py-3 text-[13px] font-black text-[#06264a] transition hover:-translate-y-0.5 hover:border-[#f6a313] hover:text-[#f6a313] lg:inline-flex"
                  >
                    İş Talepleri
                  </Link>

                  <Link
                    href="/temizlikci-bul"
                    className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#f6a313] px-5 py-3 text-[13px] font-black text-white shadow-lg shadow-orange-400/25 transition hover:-translate-y-0.5 hover:bg-[#e58f00]"
                  >
                    Temizlikçi Bul
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 transition group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  {user?.role === "customer" && (
                    <>
                      <Link
                        href="/talep-olustur"
                        className="hidden whitespace-nowrap rounded-full border border-slate-200 bg-white px-5 py-3 text-[13px] font-black text-[#06264a] transition hover:-translate-y-0.5 hover:border-[#f6a313] hover:text-[#f6a313] lg:inline-flex"
                      >
                        Talep Oluştur
                      </Link>

                      <Link
                        href="/temizlikci-bul"
                        className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#f6a313] px-5 py-3 text-[13px] font-black text-white shadow-lg shadow-orange-400/25 transition hover:-translate-y-0.5 hover:bg-[#e58f00]"
                      >
                        Temizlikçi Bul
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 transition group-hover:translate-x-0.5">
                          →
                        </span>
                      </Link>
                    </>
                  )}

                  {user?.role === "cleaner" && (
                    <Link
                      href="/is-talepleri"
                      className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#f6a313] px-5 py-3 text-[13px] font-black text-white shadow-lg shadow-orange-400/25 transition hover:-translate-y-0.5 hover:bg-[#e58f00]"
                    >
                      İş Talepleri
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  )}

                  <div ref={menuRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setUserMenuOpen((value) => !value)}
                      className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1.5 pl-2 pr-4 text-left transition hover:border-[#f6a313] hover:shadow-sm"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#06264a] text-xs font-black text-white">
                        {user?.name
                          ?.split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase() || "BE"}
                      </span>

                      <span className="leading-none">
                        <span className="block max-w-[150px] truncate text-[13px] font-black text-[#06264a]">
                          {firstName}
                        </span>
                        <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                          {user?.role === "cleaner"
                            ? "Temizlikçi"
                            : user?.role === "admin"
                              ? "Admin"
                              : "Kullanıcı"}
                        </span>
                      </span>

                      <span className="text-slate-400">▾</span>
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 top-[calc(100%+10px)] w-72 rounded-[1.6rem] border border-slate-200 bg-white p-3 shadow-2xl">
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="text-sm font-black text-[#06264a]">
                            {user?.name}
                          </div>
                          <div className="mt-1 truncate text-xs font-bold text-slate-500">
                            {user?.email}
                          </div>
                        </div>

                        <div className="mt-3 grid gap-2">
                          {user?.role === "customer" && (
                            <>
                              <Link
                                href="/talep-olustur"
                                onClick={() => setUserMenuOpen(false)}
                                className="rounded-2xl px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 hover:text-[#06264a]"
                              >
                                Yeni Talep Oluştur
                              </Link>

                              <Link
                                href="/taleplerim"
                                onClick={() => setUserMenuOpen(false)}
                                className="rounded-2xl px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 hover:text-[#06264a]"
                              >
                                Taleplerim
                              </Link>

                              <Link
                                href="/temizlikci-bul"
                                onClick={() => setUserMenuOpen(false)}
                                className="rounded-2xl px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 hover:text-[#06264a]"
                              >
                                Temizlikçi Bul
                              </Link>
                            </>
                          )}

                          {user?.role === "cleaner" && (
                            <Link
                              href="/is-talepleri"
                              onClick={() => setUserMenuOpen(false)}
                              className="rounded-2xl px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 hover:text-[#06264a]"
                            >
                              İş Talepleri
                            </Link>
                          )}

                          <button
                            type="button"
                            onClick={handleLogout}
                            disabled={logoutLoading}
                            className="rounded-2xl bg-red-50 px-4 py-3 text-left text-sm font-black text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {logoutLoading ? "Çıkış yapılıyor..." : "Çıkış Yap"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#06264a] text-white xl:hidden"
              aria-label="Menüyü aç/kapat"
              aria-expanded={open}
            >
              {open ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* MOBILE MENU */}
          {open && (
            <div className="animate-mobile-menu mt-4 rounded-[1.6rem] border border-slate-200 bg-white p-3 shadow-2xl xl:hidden">
              {isLoggedIn && (
                <div className="mb-3 rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-black text-[#06264a]">
                    {user?.name}
                  </div>
                  <div className="mt-1 text-xs font-bold text-slate-500">
                    {user?.role === "cleaner"
                      ? "Temizlikçi hesabı"
                      : user?.role === "admin"
                        ? "Admin hesabı"
                        : "Kullanıcı hesabı"}
                  </div>
                </div>
              )}

              <div className="grid gap-2">
                <Link
                  href="/temizlikci-bul"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl bg-[#f6a313] px-4 py-3 text-center text-sm font-black text-white"
                >
                  Temizlikçi Bul
                </Link>

                <Link
                  href="/is-talepleri"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl bg-[#06264a] px-4 py-3 text-center text-sm font-black text-white"
                >
                  {user?.role === "customer" ? "Taleplerim" : "İş Talepleri"}
                </Link>

                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 hover:text-[#06264a]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {!isLoggedIn ? (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link
                    href="/giris"
                    onClick={() => setOpen(false)}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-black text-[#06264a]"
                  >
                    Giriş Yap
                  </Link>

                  <Link
                    href="/kayit"
                    onClick={() => setOpen(false)}
                    className="rounded-2xl bg-slate-50 px-4 py-3 text-center text-sm font-black text-[#06264a]"
                  >
                    Üye Ol
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="mt-3 w-full rounded-2xl bg-red-50 px-4 py-3 text-center text-sm font-black text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {logoutLoading ? "Çıkış yapılıyor..." : "Çıkış Yap"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}