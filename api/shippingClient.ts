
import { shippingHttpClient } from './clients';
import { Address, Package, Quote } from '../types';

export const getRates = async (carrier: 'UPS' | 'DHL' | 'AUTO', shipper: Address, recipient: Address, packages: Package[]) => {
  const res = await shippingHttpClient.post('/api/shipping/rates', { carrier, shipper, recipient, packages });
  return res.data.quotes as Quote[];
};

export const createShipment = async (payload: {
  carrier: 'UPS' | 'DHL';
  selected_service_code: string;
  shipper: Address;
  recipient: Address;
  packages: Package[];
  reference?: { order_id?: string };
}) => {
  const res = await shippingHttpClient.post('/api/shipping/create-shipment', payload);
  return res.data;
};

export const trackShipment = async (carrier: string, tracking: string) => {
  const res = await shippingHttpClient.get(`/api/shipping/track?carrier=${carrier}&tracking=${tracking}`);
  return res.data;
};
