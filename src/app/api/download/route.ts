import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'wallet.exe');
    console.log(filePath);
    
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename="wallet.exe"',
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
