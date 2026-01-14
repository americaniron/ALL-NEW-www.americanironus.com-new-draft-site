
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
  pn: string;
  desc: string;
}

export interface ShippingQuote {
  carrier: 'UPS' | 'DHL';
  service: string;
  rate: number;
  currency: string;
  estimatedDays: number;
}
