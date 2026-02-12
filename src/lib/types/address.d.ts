export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  phone: string;
  latitude?: number;
  longitude?: number;
}

export interface AddressFormData {
  id?: string;
  name: string;
  street: string;
  city: string;
  phone: string;
}

export type ViewMode = 'list' | 'form' | 'map';
