"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Camera, Upload, RefreshCw, Loader2, AlertCircle, CheckCircle2, ScanLine, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ResultData = {
  plant: string;
  disease: string;
  confidence: number;
  category: string;
  description: string;
  treatment: string[];
  prevention: string[];
};

export default function ScanPage() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      setError("Tidak dapat mengakses kamera. Pastikan izin telah diberikan.");
    }
  };

  const stopCamera = useCallback(() => {
    setStream((prevStream) => {
      if (prevStream) {
        prevStream.getTracks().forEach((track) => track.stop());
      }
      return null;
    });
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // start camera on mount only

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setImageSrc(dataUrl);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const retakeImage = () => {
    setImageSrc(null);
    setResult(null);
    startCamera();
  };

  const analyzeImage = async () => {
    if (!imageSrc) return;
    setLoading(true);
    setError(null);

    try {
      // Convert base64 to blob
      const res = await fetch(imageSrc);
      const blob = await res.blob();
      
      const formData = new FormData();
      formData.append("image", blob, "scan.jpg");

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Gagal menganalisis gambar.");
      const data = await response.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Scanner Daun</h1>
        <p className="text-muted-foreground">Deteksi penyakit dengan instan menggunakan AI</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!result ? (
        <Card className="overflow-hidden border-2 shadow-lg">
          <CardContent className="p-0 relative bg-black min-h-[400px] flex items-center justify-center">
            {!imageSrc ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full max-h-[60vh] object-cover"
                />
                {!stream && !error && (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                )}
              </>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={imageSrc} alt="Captured" className="w-full max-h-[60vh] object-contain bg-black" />
            )}
            <canvas ref={canvasRef} className="hidden" />
          </CardContent>
          <div className="p-4 bg-white flex flex-col sm:flex-row justify-center gap-3">
            {!imageSrc ? (
              <>
                <Button onClick={captureImage} size="lg" className="w-full sm:w-auto rounded-full gap-2">
                  <Camera className="w-5 h-5" />
                  Jepret Foto
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <Button 
                  onClick={() => fileInputRef.current?.click()} 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto rounded-full gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Upload Galeri
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={analyzeImage} 
                  disabled={loading}
                  size="lg" 
                  className="w-full sm:w-auto rounded-full gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ScanLine className="w-5 h-5" />}
                  {loading ? "Menganalisis..." : "Analisis Sekarang"}
                </Button>
                <Button 
                  onClick={retakeImage} 
                  disabled={loading}
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto rounded-full gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Ulangi
                </Button>
              </>
            )}
          </div>
        </Card>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom-4">
          <Card className="border-primary/20 shadow-md">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    {result.disease === "Healthy" ? <CheckCircle2 className="text-green-500" /> : <AlertCircle className="text-orange-500" />}
                    {result.disease}
                  </CardTitle>
                  <CardDescription className="text-lg">Tanaman: {result.plant}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-muted-foreground">Confidence</div>
                  <div className="text-2xl font-bold">{result.confidence.toFixed(1)}%</div>
                </div>
              </div>
              <Progress value={result.confidence} className="h-2 mt-4" />
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Deskripsi Gejala</h3>
                <p className="text-muted-foreground">{result.description}</p>
              </div>
              
              {result.treatment.length > 0 && (
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100 text-orange-900">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> Penanganan
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.treatment.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              )}

              {result.prevention.length > 0 && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-100 text-green-900">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Pencegahan
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.prevention.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              )}

              <Button onClick={retakeImage} className="w-full gap-2 mt-4" variant="outline">
                <Camera className="w-4 h-4" /> Scan Daun Lain
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
