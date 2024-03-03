export type TProductCard = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  model: string;
  battery: string;
  brand: string;
  camera: string;
  operatingSystem: string;
  price: string;
  quantity: number;
  ram: string;
  releaseDate: Date;
  storage: string;
  screenSize: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
