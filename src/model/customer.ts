export interface Customer {
  id?: string;
  first_name?: string;
  last_name?: string;
  customer_address_id?: number;
  address?: Address;
}

export interface Address {
  city: string;
  house_number: string;
  street: string;
  zip: string;
}
