export default function PageLoader({
  text = "Yükleniyor...",
}: {
  text?: string;
}) {
  return (
    <div className="pointer-events-auto absolute inset-0 z-40 flex items-center justify-center rounded-[2rem] bg-white/65 backdrop-blur-[2px]">
      <div className="rounded-[1.6rem] border border-slate-200 bg-white px-6 py-5 text-center shadow-2xl shadow-slate-300/40">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#f6a313]" />
        <div className="mt-4 text-sm font-black text-[#06264a]">{text}</div>
      </div>
    </div>
  );
}