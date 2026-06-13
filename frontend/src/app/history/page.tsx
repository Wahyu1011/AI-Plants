import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { History as HistoryIcon, AlertCircle, Leaf } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  let histories: Array<{
    id: string;
    imageUrl: string;
    confidence: number;
    scanDate: Date;
    disease: { name: string; plant: string; }
  }> = [];
  let errorMsg = null;

  try {
    histories = await prisma.scanHistory.findMany({
      include: { disease: true },
      orderBy: { scanDate: "desc" },
    });
  } catch (err) {
    // Fallback if DB is not connected
    console.error("Database error:", err);
    errorMsg = "Database belum terkoneksi. Ini adalah data contoh.";
    histories = [
      {
        id: "1",
        imageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=200",
        confidence: 96.72,
        scanDate: new Date(),
        disease: { name: "Early Blight", plant: "Tomato" }
      }
    ];
  }

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
          <HistoryIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Riwayat Pemindaian</h1>
          <p className="text-muted-foreground">Log hasil deteksi penyakit tanaman Anda</p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-orange-50 text-orange-800 rounded-lg flex items-center gap-2 border border-orange-200">
          <AlertCircle className="w-5 h-5" />
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {histories.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-white/50 rounded-xl border border-dashed">
            <Leaf className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
            <p>Belum ada riwayat pemindaian.</p>
          </div>
        ) : (
          histories.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex h-32">
                <div className="w-32 bg-slate-100 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.imageUrl} 
                    alt={item.disease.name} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=No+Image";
                    }}
                  />
                </div>
                <div className="p-4 flex flex-col justify-center flex-1">
                  <div className="text-xs text-muted-foreground mb-1">
                    {new Date(item.scanDate).toLocaleDateString("id-ID", {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 line-clamp-1">{item.disease.name}</h3>
                  <p className="text-sm text-primary mb-2">Tanaman: {item.disease.plant}</p>
                  <div className="text-xs font-medium inline-block px-2 py-1 bg-slate-100 rounded-md self-start">
                    Conf: {item.confidence.toFixed(1)}%
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
