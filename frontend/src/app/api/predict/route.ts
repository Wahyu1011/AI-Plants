import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json({ error: "Gambar tidak ditemukan" }, { status: 400 });
    }

    const backendFormData = new FormData();
    backendFormData.append("image", image);
    
    // In production, FASTAPI_URL should be set in .env
    const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
    const response = await fetch(`${FASTAPI_URL}/api/predict`, {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      throw new Error(`AI Service responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Prediction Error:", error);
    return NextResponse.json(
      { error: "Gagal memproses gambar. Pastikan AI Service menyala." },
      { status: 500 }
    );
  }
}
