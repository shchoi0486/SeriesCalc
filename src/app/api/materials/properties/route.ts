import { NextResponse } from 'next/server';
import propertiesData from '@/data/makeitfrom_categories_with_properties.json';

export async function GET() {
  return NextResponse.json(propertiesData);
}