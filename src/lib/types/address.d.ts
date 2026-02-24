export interface Address {
  _id: string;
  name: string;
  street: string;
  city: string;
  phone: string;
  latitude: string;
  longitude: string;
  lat: string;
  long: string;
}

export interface AddressFormData {
  id?: string;
  name: string;
  street: string;
  city: string;
  phone: string;
}

export type ViewMode = 'list' | 'form' | 'map';
