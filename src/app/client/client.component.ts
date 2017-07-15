    export interface Client {
      id: number;
      name?: string;
      address?: string;
      postleihzahl?: number;
      city?: string;
      deliveryCount?: number;
      defaultStore?: string;
      storeGroup?: string;
      lastDeliveryDate?: any;
      firstOrderDate?: any;
      comments?: any;
      abo?: number;
      tel?: string;
      email?:string;
      lng?: number;
      lat?: number;
      starred?: boolean;
      visible?: boolean;
      selected?: boolean; // agm
      label?: string; // agm
      draggable?:  boolean; // agm
      DOMID?: any;
      isOpen?: any;
      $$index?:any;
      

    }