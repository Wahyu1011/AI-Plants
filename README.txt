====================================================
Aplikasi Pendeteksi Penyakit Tanaman AI (AI Plants)
====================================================

Deskripsi Proyek:
Aplikasi cerdas berbasis Web (Next.js) dan AI (TensorFlow/FastAPI) yang dirancang untuk membantu petani mendeteksi penyakit pada tanaman (terutama padi dan tomat) hanya dengan mengunggah foto daun.

----------------------------------------------------
1. Struktur Folder Utama
----------------------------------------------------
- /frontend  : Berisi antarmuka pengguna (Website) yang dibangun dengan Next.js dan Tailwind CSS.
- /ai-service: Berisi mesin AI (Backend) yang dibangun dengan Python, FastAPI, dan TensorFlow.

----------------------------------------------------
2. Teknologi yang Digunakan
----------------------------------------------------
* Frontend (Tampilan Web)
  - Framework: Next.js (React)
  - Styling: Tailwind CSS
  - Hosting: Vercel

* Backend & AI (Pemroses Gambar)
  - API Server: FastAPI (Python)
  - AI Engine: TensorFlow (Keras) & MobileNetV3
  - Hosting: Hugging Face Spaces (Docker)

----------------------------------------------------
3. Cara Menjalankan di Komputer Lokal (Localhost)
----------------------------------------------------
A. Menjalankan Backend AI
   1. Buka terminal/CMD, masuk ke folder ai-service:
      cd ai-service
   2. Install pustaka Python yang dibutuhkan:
      pip install -r requirements.txt
   3. Jalankan server lokal:
      uvicorn main:app --reload
   4. Backend akan berjalan di http://localhost:8000

B. Menjalankan Frontend Web
   1. Buka terminal baru, masuk ke folder frontend:
      cd frontend
   2. Install paket Node.js:
      npm install
   3. Jalankan website:
      npm run dev
   4. Website bisa diakses di http://localhost:3000

----------------------------------------------------
4. Cara Melatih Ulang AI (Training)
----------------------------------------------------
1. Siapkan kumpulan gambar penyakit (dataset) di folder:
   ai-service/training/dataset/<nama_penyakit>/
2. Buka Google Colab atau jalankan di komputer (jika punya GPU).
3. Jalankan file: ai-service/training/train.py
4. Tunggu hingga proses selesai dan menghasilkan file `plant_disease_model.h5`.
5. Pindahkan file tersebut ke folder `ai-service/`.

====================================================
Dibuat oleh: Wahyu1011
====================================================
