export default function PrivacyPage() {
  return (
    <main className="page-bottom-space py-10 md:py-16">
      <div className="container-main max-w-4xl">
        <div className="soft-card rounded-[2rem] p-6 md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
            Yasal Bilgilendirme
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#06264a]">
            Gizlilik Politikası
          </h1>

          <div className="mt-6 space-y-5 text-sm leading-8 text-slate-600 md:text-base">
            <p>
              BenimElemanım, kullanıcıların kişisel verilerinin gizliliğine önem
              verir. Platform üzerinde paylaşılan ad, soyad, telefon, e-posta,
              il, ilçe ve hizmet bilgileri yalnızca platform hizmetlerinin
              sunulması amacıyla işlenir.
            </p>

            <p>
              Temizlikçi arayan kullanıcılar ile temizlik hizmeti sunan
              kullanıcıların iletişim kurabilmesi için bazı bilgiler sisteme
              kaydedilebilir. Telefon bilgileri herkese açık şekilde
              yayınlanmaz; yalnızca giriş yapmış kullanıcılar tarafından
              görüntülenebilir.
            </p>

            <p>
              Kullanıcı bilgileri üçüncü kişilerle ticari amaçla paylaşılmaz.
              Yasal zorunluluklar ve hizmetin sağlanması için gerekli teknik
              durumlar saklıdır.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}