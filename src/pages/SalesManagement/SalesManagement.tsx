import Header from "@/components/ui/Header/Header";
import ProductSalesCard from "@/components/ui/ProductSalesCard";
import ProductSkeleton from "@/components/ui/ProductSkeleton/ProductSkeleton";
import { Input } from "@/components/ui/input";
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { useState } from "react";
import { TProductCard } from "../SmartphoneManagement/smartphoneManagement.types";

const SalesManagement = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: products, isLoading } = useGetProductsQuery({
    searchTerm,
  });
  return (
    <div>
      <Header>
        <h1 className='text-lg font-bold md:text-2xl'>Sales Management</h1>
      </Header>
      <div className='container pb-4'>
        <div className='flex flex-col items-center justify-between gap-4 mb-4 md:flex-row '>
          <div className='flex w-full gap-4'>
            <Input
              className='max-w-lg focus-visible:ring-transparent focus-visible:ring-offset-0 focus:ring-0'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search Product'
            />
          </div>
        </div>
        {isLoading ? (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {[...Array(6).keys()].map((key) => (
              <ProductSkeleton key={key} />
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4'>
            <div className='lg:col-span-3'>
              {products?.data?.length === 0 ? (
                <p className='mt-10 text-3xl font-bold text-center text-black/20'>
                  No Products Found
                </p>
              ) : (
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 '>
                  {products?.data?.map((product: TProductCard) => (
                    <div key={product._id}>
                      <ProductSalesCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesManagement;
