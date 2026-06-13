Plant Disease AI Detector

Proyek ini terbagi menjadi dua bagian:
1. `frontend/` - Berisi aplikasi web Next.js 15
2. `ai-service/` - Berisi FastAPI backend dan model ML
3. `docs/` - Berisi dokumentasi arsitektur sistem

=== Deployment ===
Proyek Frontend ini dikonfigurasi untuk dideploy ke Vercel.
Link Project Vercel: https://vercel.com/wahyus-projects-592966a7/equitas-ai

Cara Deploy Frontend ke Vercel:
1. Jalankan `npm run build` untuk memastikan tidak ada error saat build.
2. Push repository ini ke GitHub.
3. Hubungkan repository GitHub ke project Vercel Anda di link tersebut.
4. Set Environment Variables di Vercel:
   - `NEXT_PUBLIC_API_URL` = (URL dari Railway tempat ai-service di-deploy, atau biarkan kosong jika Anda akan deploy backend juga di Vercel/Next.js routes)
   - `DATABASE_URL` = (URL PostgreSQL Anda, misalnya dari Supabase)

Cara Menjalankan Lokal:
1. Buka folder `frontend`
   - `cd frontend`
   - `npm install`
   - `npm run dev` (Aplikasi akan jalan di http://localhost:3000)

2. Buka folder `ai-service`
   - `cd ai-service`
   - `pip install -r requirements.txt`
   - `uvicorn main:app --reload` (Aplikasi akan jalan di http://localhost:8000)
