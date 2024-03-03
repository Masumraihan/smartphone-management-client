export interface TProduct {
  user: string;
  model: string;
  battery: string;
  brand: string;
  camera: string;
  operatingSystem: string;
  price: number;
  quantity: number;
  ram: string;
  releaseDate: string;
  storage: string;
  screenSize: string;
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TSale {
  _id: string;
  buyer: string;
  salesQuantity: number;
  salesPrice: number;
  product: TProduct;
  salesDate: Date;
  seller: TSeller;
}

export type TSeller = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
