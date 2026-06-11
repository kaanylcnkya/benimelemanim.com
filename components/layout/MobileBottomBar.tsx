import Link from "next/link";

export default function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-3 shadow-[0_-12px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/temizlikci-bul"
          className="flex min-h-12 items-center justify-center rounded-full bg-[#f6a313] px-4 text-sm font-black text-white"
        >
          Temizlikçi Bul
        </Link>

        <Link
          href="/temizlikci-ol"
          className="flex min-h-12 items-center justify-center rounded-full bg-[#06264a] px-4 text-sm font-black text-white"
        >
          Temizlikçi Ol
        </Link>
      </div>
    </div>
  );
}