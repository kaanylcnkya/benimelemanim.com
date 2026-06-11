export default function PanelPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="font-black text-blue-700">Panel</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">
          Temizlikçi paneli
        </h1>
        <p className="mt-3 text-slate-600">
          Burada temizlikçiler kendi bölgesindeki talepleri görecek.
        </p>
      </div>
    </main>
  );
}