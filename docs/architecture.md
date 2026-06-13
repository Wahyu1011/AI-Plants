# Plant Disease AI Detector - Architecture & Diagrams

## 1. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    User ||--o{ ScanHistory : "has"
    Disease ||--o{ ScanHistory : "diagnosed_as"
    Disease ||--o{ Treatment : "has_recommendations"
    
    User {
        string id PK
        string email
        string name
        string role "USER, ADMIN"
        datetime created_at
    }

    ScanHistory {
        string id PK
        string user_id FK
        string disease_id FK
        string image_url
        float confidence
        datetime scan_date
    }

    Disease {
        string id PK
        string plant "Tomato, Potato, Corn, Rice, Cassava"
        string name "e.g., Early Blight"
        string category "Fungus, Virus, Bacteria, etc."
        text description
    }

    Treatment {
        string id PK
        string disease_id FK
        string content
        string type "PENANGANAN, PENCEGAHAN"
    }
```

## 2. Use Case Diagram

```mermaid
usecaseDiagram
    actor User as "Pengguna"
    actor Admin as "Administrator"
    actor AI as "AI Inference Engine"

    User --> (Ambil Foto Kamera)
    User --> (Unggah Foto Galeri)
    User --> (Lihat Hasil Deteksi)
    User --> (Lihat Riwayat Pemindaian)
    User --> (Lihat Rekomendasi Penanganan)
    
    (Ambil Foto Kamera) ..> (Kirim ke API) : include
    (Unggah Foto Galeri) ..> (Kirim ke API) : include
    
    (Kirim ke API) --> AI
    AI --> (Prediksi Penyakit & Confidence)
    
    Admin --> (Kelola Data Penyakit)
    Admin --> (Kelola Rekomendasi)
    Admin --> (Lihat Statistik Sistem)
    Admin --> (Lihat Seluruh Riwayat)
```

## 3. Flowchart Sistem

```mermaid
flowchart TD
    A[Start] --> B[Buka Aplikasi Plant AI]
    B --> C{Pilih Metode Input}
    C -->|Kamera| D[Akses Kamera & Jepret Foto]
    C -->|Galeri| E[Pilih File Gambar]
    D --> F[Kompresi Gambar Client-Side]
    E --> F
    F --> G[Kirim Gambar ke Backend/API]
    G --> H[FastAPI Terima Request]
    H --> I[AI Preprocessing & Inference]
    I --> J[Dapatkan Kelas & Confidence]
    J --> K[Simpan Hasil ke Database]
    K --> L[Kembalikan JSON ke Frontend]
    L --> M[Tampilkan Hasil & Rekomendasi di UI]
    M --> N[End]
```

## 4. Activity Diagram (Proses Deteksi)

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> MemilihInput : User klik tombol
    state MemilihInput {
        [*] --> Kamera
        [*] --> Galeri
    }
    MemilihInput --> Uploading : Gambar dipilih/dijepret
    Uploading --> ProcessingAI : Dikirim ke server
    ProcessingAI --> MenyimpanData : Inference selesai
    MenyimpanData --> MenampilkanHasil : Data tersimpan
    MenampilkanHasil --> [*]
```
