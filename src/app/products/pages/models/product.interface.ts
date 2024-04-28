interface ResponseHttp {
    httpStatusCode: number;
}

export interface OrderResponse extends ResponseHttp {
    contentResult: any;
}

/* Interfaz para Productos */
export interface Product {
    code: string
    name: string
    description: string
    images: Image[]
    available: boolean
    stock: number
    totalCost: number,
    details: DetailGroup[] | null,
    serviceDestination: string,
    stationColour: string,
  }

  export interface DetailGroup {
    name: string,
    details: Detail[]
  }

  export interface Detail {
    code: string,
    cost: number
  }
  
  export interface Image {
    descriptor: string
    url: string
  }
  
  export interface Cost {
    code: string
    value: number
    derivedCosts?: DerivedCost[]
  }
  
  export interface DerivedCost {
    code: string
    value: number
  }


  /* Interface para Categorias */
  export interface Category {
    code: string;
    order: number;
  }
  
  export interface SummaryBill {
    totalAmount: number;
    details: DetailBill[]
  }

  export interface DetailBill {
    displayName: string;
    total: number;
    orders: OrderBill[]
  }

  export interface OrderBill {
    productName: string;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
  }

/* Interfaz para ordenar producto */
export interface ProductOrder {
  sessionId: string | null
  customerDisplayName: string | null
  orders: ProductoOrderDetail[]
}

export interface ProductoOrderDetail {
  productId: string
  receptionPlace: string
  productName: string
  quantity: number
  price: number,
  stationColor: string,
  details: DetailSelection[]
}

/* Interfaz para ordenar producto con cantidad */
export interface ProductOrderEvent {
    idOrder?: string;
    quantity: number;
    product: Product;
    details: DetailSelection[];
}

export interface DetailSelection {
  name: string,
  code: string,
  cost: number
}
