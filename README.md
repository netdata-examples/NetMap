# Harita Uygulaması Oluşturmak

Bu proje sayesinde netdata üzerinde bir proje oluşturarak kendi harita uygulamanızı tasarlayabilir ve yayınlayabilirsiniz.

- Netdata.com üzerinden üye olun ve Latitude,Longitude,Name kolonlarını içerecek bir proje oluşturun.
- Projenize bir adet kayıt girmeniz gerekmektedir. Bunun için bölümler kısmından ilgili projenizin bölümünü seçin ve bir kayıt ekleyin. (Kaydı eklerken Latitude ve Longitude değerlerinin rakamsal olmasına özen gösterin)
- Projeniz için bir AccPo oluşturun.
- Oluşturduğunuz bu AccPo'ya ait API Key ve veri erişim seçeneklerinden elde edebileceğiniz bir xml linki edinin.
- Bu API Key ve xml url'yi Default.aspx te sizden istenen alanlara girin.
- Şimdi haritanızı işaretlemeye başlayabilirsiniz.

#Haritayı Yayınlamak
Oluşturduğunuz harita uygulamasını yayınlamak için tek yapmanız gereken projenize ait xml linkini ShowMap.aspx.cs dosyasında bulunan xml adlı değişkene atmak. Sayfa otomatik olarak Latitude,Longitude ve Name verilerine bağlı olarak haritanızı gösterecektir.
