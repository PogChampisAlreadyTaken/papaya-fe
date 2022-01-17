export interface Customer {
  id?: string;
  first_name?: string;
  last_name?: string;
  customer_address_id?: number;
  address?: Address;
}

export interface Address {
  id?: number;
  city: string;
  house_number: string;
  street: string;
  zip: string;
}
