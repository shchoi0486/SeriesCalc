import { NextResponse } from 'next/server';
import corrosionData from '@/data/alleima_corrosion_data_full.json';

export async function GET() {
  return NextResponse.json(corrosionData);
}