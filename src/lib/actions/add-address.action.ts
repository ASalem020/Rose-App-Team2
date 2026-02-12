'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

interface AddAddressFields {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
}

export async function addAddressAction(fields: AddAddressFields) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return {
      error: 'You must be logged in to add an address',
    };
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/addresses`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(fields),
      },
    );

    const payload = await response.json();

    if (!response.ok) {
      return {
        error: payload.error || payload.message || 'Failed to add address',
      };
    }

    return payload;
  } catch {
    return {
      error: 'An error occurred while adding the address',
    };
  }
}
