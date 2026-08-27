import { NextResponse } from 'next/server';
import propertiesData from '@/data/makeitfrom_categories_with_properties.json';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json(propertiesData);
}