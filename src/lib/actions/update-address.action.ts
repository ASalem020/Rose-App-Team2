'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

interface UpdateAddressFields {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
}

export async function updateAddressAction(addressId: string, fields: UpdateAddressFields) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return {
      error: 'You must be logged in to update an address',
    };
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/addresses/${addressId}`,
      {
        method: 'PUT',
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
        error: payload.error || payload.message || 'Failed to update address',
      };
    }

    return payload;
  } catch {
    return {
      error: 'An error occurred while updating the address',
    };
  }
}
