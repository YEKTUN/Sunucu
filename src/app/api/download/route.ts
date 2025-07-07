import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'yektun.zip');

    const fileBuffer = await fs.readFile(filePath);

    // Buffer → Uint8Array (BodyInit ile uyumlu)
    const uint8 = new Uint8Array(fileBuffer);

    return new NextResponse(uint8, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="yektun.zip"',
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
