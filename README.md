# MediMind AI - Yapay Zeka Destekli Sağlık Asistanı 🧠

MediMind AI, kullanıcıların semptomlarını analiz ederek olası hastalıkları tahmin eden, detaylı sağlık raporları sunan ve modern web teknolojileriyle donatılmış kapsamlı bir sağlık asistanıdır.

![MediMind AI Banner](https://via.placeholder.com/1000x300?text=MediMind+AI+Project+Preview)
*(Buraya projenizin ekran görüntüsünü ekleyebilirsiniz)*

## 🌟 Öne Çıkan Özellikler

Bu proje sadece bir tahmin aracı değil, tam kapsamlı bir kullanıcı deneyimi sunar:

*   **🤖 Gelişmiş Yapay Zeka:** Random Forest algoritması ile eğitilmiş, %100'e yakın doğruluk oranına sahip tahmin modeli.
*   **🇹🇷 Tam Türkçe Destek:** Hastalık isimleri, tanımlar, önlemler ve arayüz tamamen Türkçeleştirilmiştir.
*   **📄 PDF Raporlama:** Sonuç kartını, grafikleri ve belirtileri içeren profesyonel bir PDF raporu oluşturup indirme imkanı.
*   **🌙 Karanlık Mod (Dark Mode):** Göz yormayan, sistem tercihlerine duyarlı modern karanlık tema desteği.
*   **🕒 Geçmiş Aramalar:** Kullanıcının önceki analizlerini tarayıcı hafızasında (LocalStorage) tutarak hızlı erişim sağlar.
*   **🏥 En Yakın Hastane:** Konum bazlı entegrasyon ile tek tıkla yakındaki sağlık kuruluşlarını listeler.
*   **📊 Görsel Veri Analizi:** Tahmin olasılıklarını pasta grafikleriyle görselleştirir.
*   **📱 Responsive Tasarım:** Mobil ve masaüstü cihazlarla tam uyumlu modern arayüz.

## 🛠️ Kullanılan Teknolojiler

### Backend (Python & FastAPI)
*   **FastAPI:** Yüksek performanslı API servisi.
*   **Scikit-learn:** Makine öğrenimi modeli (Random Forest Classifier).
*   **Pandas & NumPy:** Veri işleme ve manipülasyon.
*   **Googletrans:** Dinamik veri çevirisi.

### Frontend (React & Tailwind)
*   **React.js:** Bileşen tabanlı kullanıcı arayüzü.
*   **Tailwind CSS:** Modern ve esnek stil yönetimi.
*   **Recharts:** Veri görselleştirme ve grafikler.
*   **JSPDF & HTML2Canvas:** PDF oluşturma motoru.
*   **React Select:** Gelişmiş çoklu seçim menüsü.

## 📂 Proje Yapısı

```bash
MediMind-AI/
├── backend/
│   ├── app/
│   │   ├── main.py            # API Endpoints
│   │   └── ...
│   ├── data/                  # Veri setleri ve çeviri dosyaları
│   ├── models/                # Eğitilmiş .joblib modelleri
│   ├── train_model.py         # Model eğitim scripti
│   └── translate_assets.py    # Çeviri scripti
│
└── frontend/
    ├── src/
    │   ├── components/        # ResultCard, SymptomForm vb.
    │   ├── App.js             # Ana uygulama mantığı
    │   └── ...
    └── public/
```

## 🚀 Kurulum (Installation)

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler
*   Python 3.8 veya üzeri
*   Node.js ve npm

### 1. Backend Kurulumu

Terminali açın ve `backend` klasörüne gidin:

```bash
cd backend
```

Gerekli Python kütüphanelerini yükleyin:

```bash
pip3 install -r requirements.txt
```

Modeli eğitin ve Türkçe varlıkları oluşturun:

```bash
python3 train_model.py
python3 translate_assets.py
```

### 2. Frontend Kurulumu

Yeni bir terminal açın ve `frontend` klasörüne gidin:

```bash
cd frontend
```

Gerekli npm paketlerini yükleyin:

```bash
npm install
```

## ▶️ Çalıştırma (How to Run)

Uygulamayı çalıştırmak için hem Backend hem de Frontend sunucularını başlatmanız gerekir.

**Adım 1: Backend'i Başlatın**
`backend` klasöründe:
```bash
uvicorn app.main:app --reload
```
*Backend `http://localhost:8000` adresinde çalışacaktır.*

**Adım 2: Frontend'i Başlatın**
`frontend` klasöründe:
```bash
npm start
```
*Tarayıcınız otomatik olarak `http://localhost:3000` adresini açacaktır.*

## ⚠️ Yasal Uyarı (Disclaimer)

Bu proje eğitim ve bilgilendirme amaçlı geliştirilmiş bir yapay zeka uygulamasıdır. **Kesinlikle tıbbi teşhis yerine geçmez.**

*   Burada sunulan sonuçlar sadece istatistiksel tahminlerdir.
*   Sağlık sorunlarınız için lütfen uzman bir doktora başvurunuz.
*   Acil durumlarda derhal 112'yi arayınız.

---
© 2025 MediMind AI. Tüm hakları saklıdır.
