export default function PageLoader({
  text = "Yükleniyor...",
}: {
  text?: string;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-2xl shadow-slate-300/40">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#f6a313]" />
        <div className="mt-4 text-sm font-black text-[#06264a]">{text}</div>
      </div>
    </div>
  );
}