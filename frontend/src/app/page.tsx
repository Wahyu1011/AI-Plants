import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanLine, History, ShieldCheck, Activity, Leaf } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center flex-1 w-full gap-12 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center space-y-6 mt-8">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <Leaf className="mr-2 h-4 w-4" />
          Smart Farming Technology
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Deteksi Penyakit Daun <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">
            Berbasis AI
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Unggah foto daun tanaman Anda atau gunakan kamera langsung untuk mendapatkan diagnosis instan, tingkat risiko, dan rekomendasi penanganan yang akurat.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link href="/scan">
            <Button size="lg" className="w-full sm:w-auto gap-2 rounded-full shadow-lg hover:shadow-primary/25 transition-all">
              <ScanLine className="w-5 h-5" />
              Mulai Pindai
            </Button>
          </Link>
          <Link href="/history">
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 rounded-full">
              <History className="w-5 h-5" />
              Lihat Riwayat
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
              <Activity className="w-6 h-6" />
            </div>
            <CardTitle>Analisis Real-time</CardTitle>
            <CardDescription>
              Model Deep Learning kami memproses gambar dalam hitungan detik untuk memberikan hasil.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <CardTitle>Akurasi Tinggi</CardTitle>
            <CardDescription>
              Terlatih dengan ribuan dataset untuk mengenali penyakit pada tomat, kentang, padi, jagung, dan singkong.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
              <Leaf className="w-6 h-6" />
            </div>
            <CardTitle>Rekomendasi Ahli</CardTitle>
            <CardDescription>
              Dapatkan langkah-langkah penanganan dan pencegahan yang tepat untuk menyelamatkan panen Anda.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
