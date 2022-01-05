export interface Customer {
  customerId: string;
  firstName?: string;
  lastName?: string;
  customer_address_id?: number;
  role: Roles;
}


export interface Roles {
  customer?: boolean;
  admin?: boolean;
}
