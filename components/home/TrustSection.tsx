export default function TrustSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white">
          <p className="font-black text-blue-300">Güven Odaklı Sistem</p>
          <h2 className="mt-3 text-3xl font-black">
            Telefon bilgileri kontrollü şekilde gösterilir.
          </h2>
          <p className="mt-4 leading-7 text-slate-300">
            Talep sahibinin iletişim bilgileri herkese açık şekilde
            yayınlanmaz. Temizlikçiler sisteme kayıt olarak talepleri görür.
            İleride onaylı profil, SMS doğrulama ve puanlama sistemi
            eklenebilir.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-black text-slate-950">Hizmet arayan için kolay</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Üyelik karmaşası olmadan hızlıca temizlik talebi bırakabilir.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-black text-slate-950">Temizlikçi için pratik</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Kendi il ve ilçesindeki talepleri panelinden takip edebilir.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-black text-slate-950">Büyümeye uygun</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Başlangıçta temizlik, sonra farklı hizmet ve personel
              kategorileri eklenebilir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}