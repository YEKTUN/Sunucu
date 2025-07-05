import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'yektun_1.exe');

    const fileBuffer = await fs.readFile(filePath);

    // Buffer → Uint8Array (BodyInit ile uyumlu)
    const uint8 = new Uint8Array(fileBuffer);

    return new NextResponse(uint8, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename="yektun_1.exe"',
      },
    });
  } catch (error) {
    console.error('Dosya indirme hatası:', error);
    return NextResponse.json(
      { error: 'Dosya indirme işlemi başarısız' },
      { status: 500 }
    );
  }
}
