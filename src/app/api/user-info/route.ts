import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  const res = await fetch(
    `${process.env.API_URL}/auth/profile-data`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.accessToken}`,
      },
    },
  );
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!res.ok) {
    return new Response('Failed to fetch user info', {
      status: res.status,
    });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
