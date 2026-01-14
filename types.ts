
export interface EquipmentListing {
  img: string;
  title: string;
  id: string;
  make: string;
  model: string;
  year: number;
  meter: string;
  price: string;
  city: string;
  state: string;
  category: string;
}

export interface PartListing {
  part_number: string;
  description: string;
  category: string;
  image: string;
  detail_page: string;
  attributes: Record<string, string>;
}

export interface Address {
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  phone?: string;
}

export interface Package {
  weight: { value: number; unit: 'LB' | 'KG' };
  dimensions: { length: number; width: number; height: number; unit: 'IN' | 'CM' };
  declaredValue: { amount: number; currency: string };
}

export interface Quote {
  carrier: 'UPS' | 'DHL';
  service_code: string;
  service_name: string;
  total_cost: number;
  currency: string;
  eta_days: number;
}
