import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { TProductCard } from "@/pages/SmartphoneManagement/smartphoneManagement.types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAddProductMutation } from "../../../redux/features/product/productApi";
import { useAppSelector } from "../../../redux/hooks";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { ScrollArea } from "../scroll-area";
import { TProduct } from "./product.types";
import {
  batteries,
  displaySizes,
  productBrand,
  ramSizes,
  storageSizes,
} from "./productAddModal.constant";

const ProductAddModal = ({
  product,
  children,
}: {
  product?: TProductCard;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(product?.releaseDate || new Date());
  const [operatingSystem, setOperatingSystem] = useState<string | null>(
    product?.operatingSystem || null,
  );
  const [screenSize, setScreenSize] = useState<string | null>(product?.screenSize || null);
  const [brand, setBrand] = useState<string | null>(product?.brand || null);
  const [ram, setRam] = useState<string | null>(product?.ram || null);
  const [storage, setStorage] = useState<string | null>(product?.storage || null);
  const [battery, setBattery] = useState<string | null>(product?.battery || null);
  const [addProduct, { isLoading, error }] = useAddProductMutation();
  const user = useAppSelector(useCurrentUser);
  const { register, handleSubmit, reset } = useForm<TProduct>({
    defaultValues: {
      model: product?.model || "",
      camera: product?.camera || "",
      price: product?.price || 0,
      quantity: product?.quantity || 1,
    },
  });

  const handleAddProduct = async (data: TProduct) => {
    const releaseDate = moment(date).format("DD MMMM YYYY");
    const price = data.price;
    const info = {
      ...data,
      price,
      releaseDate,
      user: user?._id,
      operatingSystem,
      brand,
      screenSize,
      ram,
      storage,
      battery,
    };

    const res = await addProduct(info).unwrap();
    if (res?.success) {
      setIsOpen(false);
      reset();
      toast.success("Product added successfully!");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className='rounded-lg'>
          <DialogHeader>
            <DialogTitle> {product?.model || " Add Product"}</DialogTitle>
            <DialogDescription>Add new product to your account</DialogDescription>
          </DialogHeader>
          <ScrollArea className='grid gap-4 py-4 h-96 lg:h-full'>
            <form
              onSubmit={handleSubmit(handleAddProduct)}
              className='grid grid-cols-1 gap-4 md:grid-cols-2'
            >
              <div className='space-y-1'>
                <Label>Model</Label>
                <Input type='text' placeholder='Model' {...register("model")} />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='brand'>Brand</Label>

                <Select onValueChange={setBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder={brand ? brand : "Select a brands"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Brands</SelectLabel>
                      {productBrand.map((brand) => (
                        <SelectItem key={brand.value} value={brand.value}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-1'>
                <Label htmlFor='ram'>Ram</Label>
                <Select onValueChange={setRam}>
                  <SelectTrigger>
                    <SelectValue placeholder={ram ? ram : "Select ram"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Ram</SelectLabel>
                      {ramSizes.map((ram) => (
                        <SelectItem key={ram.value} value={ram.value}>
                          {ram.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-1'>
                <Label htmlFor='storage'>Storage</Label>
                <Select onValueChange={setStorage}>
                  <SelectTrigger>
                    <SelectValue placeholder={storage ? storage : "Select storage capacity"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Storage</SelectLabel>
                      {storageSizes.map((storage) => (
                        <SelectItem key={storage.value} value={storage.value}>
                          {storage.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-1'>
                <Label htmlFor='screenSize'>Screen Size</Label>
                <Select onValueChange={setScreenSize}>
                  <SelectTrigger>
                    <SelectValue placeholder={screenSize ? screenSize : "Select screen size"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Brands</SelectLabel>
                      {displaySizes.map((display) => (
                        <SelectItem key={display.value} value={display.value}>
                          {display.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-1'>
                <Label htmlFor='camera'>Camera</Label>
                <Input placeholder='Camera' {...register("camera")} />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='operatingSystem'>Operating System</Label>
                <Select onValueChange={setOperatingSystem}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={operatingSystem ? operatingSystem : "Select operating system"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Brands</SelectLabel>
                      <SelectItem value='Android'>Android</SelectItem>
                      <SelectItem value='IOS'>IOS</SelectItem>
                      {/*<SelectItem value='Windows'>Windows</SelectItem>
                      <SelectItem value='MacOS'>MacOS</SelectItem>
                      <SelectItem value='Linux'>Linux</SelectItem>*/}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-1'>
                <Label htmlFor='price'>Price</Label>
                <Input
                  type='number'
                  placeholder='Price'
                  {...register("price", { valueAsNumber: true })}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='quantity'>Quantity</Label>
                <Input
                  type='number'
                  placeholder='quantity'
                  {...register("quantity", { valueAsNumber: true })}
                />
              </div>

              <div className='space-y-1'>
                <Label htmlFor='battery'>Battery</Label>
                <Select onValueChange={setBattery}>
                  <SelectTrigger>
                    <SelectValue placeholder={battery ? battery : "Select battery size"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Battery</SelectLabel>
                      {batteries.map((battery) => (
                        <SelectItem key={battery.value} value={battery.value}>
                          {battery.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className='col-span-full'>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className='w-4 h-4 mr-2' />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              {error && !isLoading && <p style={{ color: "red" }}>Please provide valid details</p>}
              <Button type='submit' className='md:col-span-2'>
                Submit
              </Button>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductAddModal;
