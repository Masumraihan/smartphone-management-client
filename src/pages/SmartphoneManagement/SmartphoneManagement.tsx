import ConfirmModal from "@/components/ui/ConfirmModal";
import FilterProduct from "@/components/ui/FilterProduct";
import FilterSheet from "@/components/ui/FilterSheet";
import Header from "@/components/ui/Header/Header";
import ProductAddModal from "@/components/ui/ProductAddModal/ProductAddModal";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import ProductSkeleton from "@/components/ui/ProductSkeleton/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/features/product/productApi";
import { TProductCard } from "./smartphoneManagement.types";
import moment from "moment";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { userRole } from "@/constant";

const SmartphoneManagement = () => {
  const [deleteProduct] = useDeleteProductMutation();

  const [minPrice, setMinPrice] = useState<number[]>([0]);
  const [maxPrice, setMaxPrice] = useState<number[]>([0]);
  const [brand, setBrand] = useState<string>("");
  const [ram, setRam] = useState<string>("");
  const [storage, setStorage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [operatingSystem, setOperatingSystem] = useState<string | null>(null);
  const [screenSize, setScreenSize] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const { data: products, isLoading } = useGetProductsQuery({
    searchTerm,
    minPrice: minPrice[0],
    maxPrice: maxPrice[0],
    releaseDate: checked ? moment(date).format("DD MMMM YYYY") : null,
    brand: brand === "all" ? null : brand,
    ram: ram === "all" ? null : ram,
    storage: storage === "all" ? null : storage,
    operatingSystem: operatingSystem === "all" ? null : operatingSystem,
    screenSize: screenSize === "all" ? null : screenSize,
  });

  const handleDeleteProduct = async () => {
    const res = await deleteProduct(deletedIds).unwrap();
    if (res.success) {
      toast.success("Product Deleted Successfully");
      setDeletedIds([]);
    }
  };

  const user = useAppSelector(useCurrentUser);

  return (
    <div>
      <Header>
        <>
          <h1 className='text-lg font-bold md:text-2xl'>Smartphones Management</h1>
        </>
      </Header>
      <div className='pb-4'>
        <div className='flex flex-col items-center justify-between gap-4 mb-4 md:flex-row '>
          <div className='flex w-full gap-4'>
            <Input
              className='max-w-lg focus-visible:ring-transparent focus-visible:ring-offset-0 focus:ring-0'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search Product By Model'
            />
            {deletedIds.length > 0 && user?.role === userRole.superAdmin && (
              <ConfirmModal confirmFn={handleDeleteProduct}>
                <Button variant='destructive'>Delete</Button>
              </ConfirmModal>
            )}
            {(user?.role === userRole.superAdmin || user?.role === userRole.manager) && (
              <ProductAddModal>
                <Button size={"icon"} className='md:hidden'>
                  <Plus size={20} />
                </Button>
              </ProductAddModal>
            )}
          </div>
          <div className='items-center justify-end hidden w-full gap-4 md:flex '>
            <Button size='sm' variant={"outline"} className='gap-2'>
              <ArrowDownUp size={16} /> Sort By
            </Button>
            {(user?.role === userRole.superAdmin || user?.role === userRole.manager) && (
              <ProductAddModal>
                <Button size='sm' className='gap-2'>
                  <Plus size={20} /> Add Smartphone
                </Button>
              </ProductAddModal>
            )}
          </div>
        </div>
        {isLoading ? (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {[...Array(6).keys()].map((key) => (
              <ProductSkeleton key={key} />
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
            {
              <div>
                <div className='hidden lg:block'>
                  <FilterProduct
                    setMinPrice={setMinPrice}
                    minPrice={minPrice}
                    setBrand={setBrand}
                    setRam={setRam}
                    setStorage={setStorage}
                    setMaxPrice={setMaxPrice}
                    maxPrice={maxPrice}
                    date={date}
                    setDate={setDate}
                    setOperatingSystem={setOperatingSystem}
                    setScreenSize={setScreenSize}
                    setChecked={setChecked}
                    checked={checked}
                  />
                </div>
                <div className='flex gap-4 lg:hidden'>
                  <FilterSheet
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    setRam={setRam}
                    setStorage={setStorage}
                    priceRange={minPrice}
                    setPriceRange={setMinPrice}
                    setBrand={setBrand}
                    date={date}
                    setDate={setDate}
                    setOperatingSystem={setOperatingSystem}
                    setScreenSize={setScreenSize}
                    setChecked={setChecked}
                    checked={checked}
                  />
                  <Button size='sm' variant={"outline"} className={"gap-2"}>
                    <ArrowDownUp size={16} /> Sort By
                  </Button>
                </div>
              </div>
            }
            <div className='lg:col-span-3'>
              {products?.data?.length === 0 ? (
                <p className='mt-10 text-3xl font-bold text-center text-black/20'>
                  No Products Found
                </p>
              ) : (
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 '>
                  {products?.data?.map((product: TProductCard) => (
                    <div key={product._id}>
                      <ProductCard
                        deletedIds={deletedIds}
                        setDeletedIds={setDeletedIds}
                        product={product}
                      />
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
export default SmartphoneManagement;
