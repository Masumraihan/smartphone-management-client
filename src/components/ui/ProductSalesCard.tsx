import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TProductCard } from "@/pages/SmartphoneManagement/smartphoneManagement.types";
import SalesModal from "./SalesModal";
import moment from "moment";
const ProductSalesCard = ({ product }: { product: TProductCard }) => {
  const {
    brand,
    battery,
    ram,
    storage,
    screenSize,
    camera,
    price,
    quantity,
    operatingSystem,
    releaseDate,
    model,
    _id,
  } = product;
  return (
    <div className='relative'>
      <Card className='shadow-lg'>
        <CardHeader className='p-2'>
          <picture className='max-h-[300px] w-full h-full relative group'>
            <img
              src={`https://img.freepik.com/free-photo/phone-14-right-side-arabic-themed-background_187299-35435.jpg?w=826&t=st=1708451198~exp=1708451798~hmac=50094ea68ff31ec3423d8eb93e822200ecab82d70639c2be2ab7754bc4cee3e2`}
              alt={model}
              className='object-cover w-full h-full rounded '
            />
          </picture>
        </CardHeader>
        <CardContent className='grid space-y-1'>
          <CardTitle className='flex items-center justify-between text-base font-semibold'>
            {model}
          </CardTitle>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1'>
              <p className='text-sm font-semibold border-b'>Details</p>
              <p className='text-xs'>
                <span className='font-semibold'>Brand</span> : {brand}
              </p>
              <p className='text-xs'>
                <span className='font-semibold'>Model</span> : {model}
              </p>
              <p className='text-xs'>
                <span className='font-semibold'>Quantity</span> : {quantity}
              </p>

              <p className='text-xs'>
                <span className='font-semibold'>Price</span> : {price}
              </p>
              <p className='text-xs'>
                <span className='font-semibold'>Release Date</span> :{" "}
                {moment(releaseDate).format("DD MMM YYYY")}
              </p>
              <p className='text-sm'>
                {quantity < 1 ? (
                  <span className='font-semibold text-red-500'>Out of stock</span>
                ) : (
                  <span className='font-semibold text-green-500'>In stock</span>
                )}
              </p>
            </div>
            <div className='space-y-1'>
              <p className='text-sm font-semibold border-b'>Features</p>
              <p className='text-xs'>
                <span className='font-semibold'>Ram</span> : {ram}
              </p>
              <p className='text-xs'>
                <span className='font-semibold'>Storage</span> : {storage}
              </p>
              <p className='text-xs'>
                <span className='font-semibold'>Screen Size</span> : {screenSize}
              </p>
              <p className='text-xs'>
                <span className='font-semibold'>Camera</span> : {camera}
              </p>
              <p className='text-xs'>
                <span className='font-semibold'>Operating System</span> : {operatingSystem}
              </p>
              <p className='text-xs'>
                <span className='font-semibold'>Battery</span> : {battery}
              </p>
            </div>
          </div>

          <CardDescription>
            {/*Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, doloremque!*/}
          </CardDescription>
          {/*<div className='flex items-center gap-2 pt-2 text-xl font-semibold'>
              <span className='text-red'>${product.price}</span>
              <span className='text-gray-400 line-through group-last:hidden'>${product.price}</span>
              {product.discount && (
                <span className='px-2 py-0.5 text-xs rounded bg-red/10 text-red'>
                  {product.discount}%
                </span>
              )}
            </div>*/}
        </CardContent>
        <CardFooter className='gap-3'>
          <>
            <SalesModal quantity={quantity} _id={_id} />
          </>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductSalesCard;
