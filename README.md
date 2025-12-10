# MediMind AI - Yapay Zeka Destekli Sağlık Asistanı 🧠

MediMind AI, kullanıcıların semptomlarını analiz ederek olası hastalıkları tahmin eden, detaylı sağlık raporları sunan ve modern web teknolojileriyle donatılmış kapsamlı bir sağlık asistanıdır.

![MediMind AI Banner](./screenshots/banner.png)

## 🌟 Proje Hakkında

MediMind AI, makine öğrenimi algoritmalarını modern bir web arayüzü ile birleştirerek sağlık okuryazarlığını artırmayı hedefler. Kullanıcı dostu arayüzü, **Karanlık Mod** desteği ve **Türkçe** içerik yapısıyla herkesin kolayca kullanabileceği bir araçtır.

## 📸 Ekran Görüntüleri

Uygulama, sistem tercihinize duyarlı **Aydınlık** ve **Karanlık** mod seçenekleri sunar.

| Aydınlık Mod (Light Mode) | Karanlık Mod (Dark Mode) |
|:-------------------------:|:------------------------:|
| ![Light Home](./screenshots/light1.png) | ![Dark Home](./screenshots/dark2.png) |
| **Ana Sayfa & Semptom Seçimi** | **Ana Sayfa & Semptom Seçimi** |
| ![Light Result](./screenshots/light2.png) | ![Dark Result](./screenshots/dark1.png) |
| **Sonuç Ekranı & Rapor** | **Sonuç Ekranı & Rapor** |

## ✨ Öne Çıkan Özellikler

*   **🤖 Gelişmiş Yapay Zeka:** Random Forest algoritması ile eğitilmiş, yüksek doğruluk oranına sahip tahmin modeli.
*   **🇹🇷 Tam Türkçe Destek:** Hastalık isimleri, tanımlar, önlemler ve arayüz tamamen Türkçeleştirilmiştir.
*   **📄 PDF Raporlama:** Sonuç kartını, grafikleri ve belirtileri içeren profesyonel bir PDF raporu oluşturup indirme imkanı.
*   **🌙 Karanlık Mod (Dark Mode):** Göz yormayan, sistem tercihlerine duyarlı modern karanlık tema desteği.
*   **🕒 Geçmiş Aramalar:** Kullanıcının önceki analizlerini tarayıcı hafızasında (LocalStorage) tutarak hızlı erişim sağlar.
*   **🏥 En Yakın Hastane:** Konum bazlı entegrasyon ile tek tıkla yakındaki sağlık kuruluşlarını listeler.
*   **📊 Görsel Veri Analizi:** Tahmin olasılıklarını interaktif pasta grafikleriyle görselleştirir.
*   **📱 Responsive Tasarım:** Mobil, tablet ve masaüstü cihazlarla tam uyumlu modern arayüz.

## 🛠️ Kullanılan Teknolojiler

### Backend (Python & FastAPI)
*   **FastAPI:** Yüksek performanslı, asenkron API servisi.
*   **Scikit-learn:** Makine öğrenimi modeli (Random Forest Classifier).
*   **Pandas & NumPy:** Veri işleme ve manipülasyon.
*   **Googletrans:** Veri setlerinin dinamik çevirisi.

### Frontend (React & Tailwind)
*   **React.js:** Bileşen tabanlı modern kullanıcı arayüzü.
*   **Tailwind CSS:** Responsive ve özelleştirilebilir stil yönetimi.
*   **Recharts:** Veri görselleştirme kütüphanesi.
*   **JSPDF & HTML2Canvas:** İstemci tarafında PDF oluşturma.
*   **React Select:** Gelişmiş, aranabilir çoklu seçim bileşeni.

## 📂 Proje Yapısı

```bash
MediMind-AI/
├── backend/
│   ├── app/
│   │   ├── main.py            # API Endpoints ve Uygulama
│   │   └── ...
│   ├── data/                  # Veri setleri (CSV/JSON)
│   ├── models/                # Eğitilmiş .joblib modelleri
│   ├── train_model.py         # Model eğitim scripti
│   └── translate_assets.py    # Çeviri scripti
│
├── frontend/
│   ├── src/
│   │   ├── components/        # ResultCard, SymptomForm vb.
│   │   ├── App.js             # Ana uygulama mantığı
│   │   └── ...
│   └── public/
│
└── screenshots/               # Proje görselleri
```

## 🚀 Kurulum ve Çalıştırma

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

Modeli eğitin ve gerekli dosyaları oluşturun:

```bash
python3 train_model.py
python3 translate_assets.py
```

Sunucuyu başlatın:
```bash
uvicorn app.main:app --reload
```
*Backend `http://localhost:8000` adresinde çalışacaktır.*

### 2. Frontend Kurulumu

Yeni bir terminal açın ve `frontend` klasörüne gidin:

```bash
cd frontend
```

Gerekli npm paketlerini yükleyin:

```bash
npm install
```

Uygulamayı başlatın:
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
