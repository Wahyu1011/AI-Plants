import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ShieldCheck, Leaf, Users } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto w-full space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Ringkasan Statistik dan Manajemen Sistem</p>
        </div>
        <div className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full border border-primary/20">
          Admin Mode
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm bg-white/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Scan</CardTitle>
            <Activity className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-green-600 mt-1">+12% dari bulan lalu</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-white/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Penyakit Terbanyak</CardTitle>
            <ShieldCheck className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-orange-600">Tomato Early Blight</div>
            <p className="text-xs text-muted-foreground mt-1">340 Kasus (27%)</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tanaman Sehat</CardTitle>
            <Leaf className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">42.5%</div>
            <p className="text-xs text-muted-foreground mt-1">Total: 530 scan</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pengguna</CardTitle>
            <Users className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">312</div>
            <p className="text-xs text-muted-foreground mt-1">+4 pengguna baru hari ini</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Grafik Pemindaian Mingguan</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center border-t border-dashed bg-slate-50/50">
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Activity className="w-4 h-4" /> Area Grafik (Gunakan library Recharts)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Penyakit Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {/* Mock list */}
             {[1,2,3].map((i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white border rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">User_{i}92</p>
                    <p className="text-xs text-muted-foreground">Corn Common Rust</p>
                  </div>
                  <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">High Risk</div>
                </div>
             ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
