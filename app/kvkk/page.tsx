export default function KvkkPage() {
  return (
    <main className="page-bottom-space py-10 md:py-16">
      <div className="container-main max-w-5xl">
        <div className="soft-card rounded-[2rem] p-6 md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f6a313]">
            Kişisel Verilerin Korunması
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#06264a]">
            KVKK Aydınlatma Metni
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-500">
            Son güncelleme tarihi: 11 Haziran 2026
          </p>

          <div className="mt-8 space-y-8 text-sm leading-8 text-slate-600 md:text-base">
            <section>
              <h2 className="text-2xl font-black text-[#06264a]">
                1. Veri Sorumlusu
              </h2>
              <p className="mt-3">
                6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında,
                BenimElemanım platformu üzerinden işlenen kişisel veriler
                bakımından veri sorumlusu, platformu işleten gerçek veya tüzel
                kişidir. Şirket unvanı, açık adres ve iletişim bilgileri
                kesinleştiğinde bu alanda ayrıca yayınlanacaktır.
              </p>

              <p className="mt-3">
                İletişim: info@benimelemanim.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#06264a]">
                2. İşlenen Kişisel Veriler
              </h2>

              <p className="mt-3">
                Platformu kullanan kişilerin kullanıcı tipine göre aşağıdaki
                kişisel verileri işlenebilir:
              </p>

              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Ad, soyad</li>
                <li>Telefon numarası</li>
                <li>E-posta adresi</li>
                <li>Şifre ve üyelik bilgileri</li>
                <li>İl, ilçe ve bölge bilgileri</li>
                <li>Kullanıcı tipi bilgisi: temizlikçi arayan kullanıcı veya temizlikçi</li>
                <li>Temizlik hizmeti tercihi</li>
                <li>Temizlikçi profili, deneyim, hizmet türleri ve ücret beklentisi</li>
                <li>İş talebi, açıklama, tarih, saat ve hizmet ihtiyacı bilgileri</li>
                <li>Platform kullanım kayıtları, IP adresi, işlem güvenliği kayıtları</li>
                <li>Çerezler aracılığıyla elde edilen sınırlı teknik veriler</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#06264a]">
                3. Kişisel Verilerin İşlenme Amaçları
              </h2>

              <p className="mt-3">
                Kişisel verileriniz aşağıdaki amaçlarla işlenebilir:
              </p>

              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Platform üyeliğinin oluşturulması ve yönetilmesi</li>
                <li>Kullanıcıların giriş yapabilmesi ve hesap güvenliğinin sağlanması</li>
                <li>Temizlikçi arayan kullanıcılar ile temizlik hizmeti sunan kullanıcıların eşleştirilmesi</li>
                <li>Temizlikçi profillerinin bölge, hizmet türü ve deneyime göre listelenmesi</li>
                <li>İş taleplerinin temizlikçiler tarafından görüntülenebilmesi</li>
                <li>Telefon ve iletişim bilgilerinin yalnızca giriş yapmış kullanıcılara gösterilmesi</li>
                <li>Kötüye kullanım, sahte kayıt ve güvenlik risklerinin önlenmesi</li>
                <li>Kullanıcı destek taleplerinin karşılanması</li>
                <li>Hukuki yükümlülüklerin yerine getirilmesi</li>
                <li>Platform performansının, kullanıcı deneyiminin ve hizmet kalitesinin iyileştirilmesi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#06264a]">
                4. Kişisel Verilerin Toplanma Yöntemi
              </h2>

              <p className="mt-3">
                Kişisel verileriniz; internet sitesi, üyelik formları, giriş
                ekranları, temizlikçi kayıt formları, temizlikçi listeleme
                ekranları, iş talebi ekranları, iletişim formları, çerezler ve
                elektronik sistem kayıtları aracılığıyla otomatik veya kısmen
                otomatik yollarla toplanabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#06264a]">
                5. Hukuki Sebepler
              </h2>

              <p className="mt-3">
                Kişisel verileriniz KVKK’nın 5. maddesinde belirtilen aşağıdaki
                hukuki sebeplere dayanılarak işlenebilir:
              </p>

              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması</li>
                <li>Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi</li>
                <li>İlgili kişinin kendisi tarafından alenileştirilmiş olması</li>
                <li>Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması</li>
                <li>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati</li>
                <li>Gerekli hallerde ilgili kişinin açık rızası</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#06264a]">
                6. Kişisel Verilerin Aktarılması
              </h2>

              <p className="mt-3">
                Kişisel verileriniz, hizmetin gerektirdiği ölçüde ve KVKK’ya
                uygun olarak aşağıdaki kişi veya kuruluşlarla paylaşılabilir:
              </p>

              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Temizlikçi arayan kullanıcılar ve temizlik hizmeti sunan kullanıcılar</li>
                <li>Barındırma, yazılım, güvenlik, sunucu ve teknik altyapı hizmeti sağlayıcıları</li>
                <li>E-posta, SMS, bildirim ve iletişim hizmeti sağlayıcıları</li>
                <li>Hukuki zorunluluk halinde yetkili kamu kurum ve kuruluşları</li>
                <li>Uyuşmazlık halinde avukatlar, danışmanlar ve yetkili merciler</li>
              </ul>

              <p className="mt-3">
                Telefon numarası gibi iletişim bilgileri, platformun temel
                amacı kapsamında yalnızca ilgili kullanıcıların iletişim
                kurabilmesi için ve kontrollü şekilde gösterilir. Telefon
                bilgileri herkese açık şekilde yayınlanmaz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#06264a]">
                7. Çerezler ve Teknik Veriler
              </h2>

              <p className="mt-3">
                Platformda oturum yönetimi, güvenlik, performans ölçümü ve
                kullanıcı deneyiminin iyileştirilmesi amacıyla zorunlu ve
                sınırlı çerezler kullanılabilir. Pazarlama veya reklam amaçlı
                çerezler kullanılması halinde ayrıca bilgilendirme yapılabilir
                ve gerekli hallerde açık rıza alınabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#06264a]">
                8. Kişisel Verilerin Saklanma Süresi
              </h2>

              <p className="mt-3">
                Kişisel veriler, işleme amacının gerektirdiği süre boyunca ve
                ilgili mevzuatta öngörülen yasal saklama süreleri kadar
                saklanır. Üyeliğin sona ermesi halinde veriler, hukuki
                yükümlülükler, uyuşmazlıkların çözümü ve güvenlik gerekçeleri
                kapsamında gerekli süreyle muhafaza edilebilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#06264a]">
                9. İlgili Kişinin Hakları
              </h2>

              <p className="mt-3">
                KVKK’nın 11. maddesi kapsamında ilgili kişiler aşağıdaki
                haklara sahiptir:
              </p>

              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Kişisel verilerinin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme</li>
                <li>İşleme amacını ve verilerin amaca uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                <li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme</li>
                <li>KVKK’ya uygun olarak silinmesini veya yok edilmesini isteme</li>
                <li>Düzeltme, silme veya yok etme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme</li>
                <li>Otomatik sistemler ile analiz sonucu aleyhe bir sonucun ortaya çıkmasına itiraz etme</li>
                <li>Kanuna aykırı işleme nedeniyle zarara uğraması halinde zararın giderilmesini talep etme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#06264a]">
                10. Başvuru Yöntemi
              </h2>

              <p className="mt-3">
                Kişisel verilerinize ilişkin taleplerinizi info@benimelemanim.com
                adresine iletebilirsiniz. Başvurularda kimlik doğrulaması
                yapılması amacıyla ek bilgi talep edilebilir. Talepler, mevzuatta
                öngörülen süreler içerisinde değerlendirilir.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}