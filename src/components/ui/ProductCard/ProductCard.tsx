/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { userRole } from "@/constant";
import { TProductCard } from "@/pages/SmartphoneManagement/smartphoneManagement.types";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { Dispatch, SetStateAction, useState } from "react";
import ProductAddModal from "../ProductAddModal/ProductAddModal";
import UpdateProductModal from "../UpdateProductModal/UpdateProductModal";
import { Button } from "../button";
import { Checkbox } from "../checkbox";

type TProductCardProps = {
  product: TProductCard;
  setDeletedIds: Dispatch<SetStateAction<string[]>>;
  deletedIds: string[];
};

const ProductCard = ({ product, setDeletedIds, deletedIds }: TProductCardProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  //const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = jwtDecode(token) as any;
  }
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

  const handleProductChecked = () => {
    setChecked(!checked);
    if (!checked) {
      setDeletedIds([...deletedIds, _id]);
    }
    if (checked) {
      setDeletedIds(deletedIds.filter((id) => id !== _id));
    }
  };

  return (
    <>
      <div className='relative'>
        <Card className='shadow-lg'>
          <CardHeader className='p-2'>
            <picture className='max-h-[300px] w-full h-full relative group'>
              {user?.role === userRole.superAdmin && (
                <>
                  <div
                    onClick={handleProductChecked}
                    className='absolute top-0 left-0 w-full h-full duration-500 opacity-0 cursor-pointer bg-black/20 group-hover:opacity-100'
                  ></div>
                  <Checkbox
                    checked={checked}
                    onCheckedChange={handleProductChecked}
                    className='absolute z-10 right-3 top-3'
                  />
                </>
              )}
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
              {user?.role === userRole.superAdmin ||
                (user?.role === userRole.manager && <UpdateProductModal product={product} />)}
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
                  <span className='font-semibold'>Release Date</span> :
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
          </CardContent>
          <CardFooter className='gap-3'>
            {user.role === userRole.superAdmin && (
              <>
                <ProductAddModal product={product}>
                  <Button className='w-full'>Duplicate & Edit</Button>
                </ProductAddModal>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ProductCard;
