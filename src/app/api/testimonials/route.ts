import { TestimonialsAPISuccessResponse } from '@/lib/types/testimonials';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res: Response = await fetch(
      `${process.env.API_URL}/api/v1/testimonials`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch testimonials');
    }

    const payload: TestimonialsAPISuccessResponse =
      await res.json();

    return NextResponse.json(
      { ...payload },
      { status: 200 },
    );
  } catch (e: unknown) {
    return NextResponse.json(
      {
        message:
          (e as Error).message || 'Failed to fetch !',
      },
      { status: 500 },
    );
  }
}
