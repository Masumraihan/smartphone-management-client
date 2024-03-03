import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TProductCard } from "../../../pages/SmartphoneManagement/smartphoneManagement.types";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";
import { useUpdateProductMutation } from "../../../redux/features/product/productApi";
import { useAppSelector } from "../../../redux/hooks";
import { TProduct } from "../ProductAddModal/product.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../button";
import { CalendarIcon, Edit } from "lucide-react";
import { ScrollArea } from "../scroll-area";
import { Label } from "../label";
import { Input } from "../input";
import {
  batteries,
  displaySizes,
  productBrand,
  ramSizes,
  storageSizes,
} from "../ProductAddModal/productAddModal.constant";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../calendar";

type TUpdateProductModalProps = { product: TProductCard };

const UpdateProductModal = ({ product }: TUpdateProductModalProps) => {
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

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date(releaseDate));
  const [operatingSystemType, setOperatingSystemType] = useState<string | null>(operatingSystem);
  const [screenSizeType, setScreenSizeType] = useState<string | null>(screenSize);
  const [brandType, setBrandType] = useState<string | null>(brand);
  const [ramType, setRamType] = useState<string | null>(ram);
  const [storageType, setStorageType] = useState<string | null>(storage);
  const [batteryType, setBatteryType] = useState<string | null>(battery);

  const user = useAppSelector(useCurrentUser);
  const [updateProduct, { isLoading, error }] = useUpdateProductMutation();
  const { register, handleSubmit } = useForm<TProduct>({
    defaultValues: {
      model,
      battery,
      ram,
      storage,
      screenSize,
      camera,
      price,
      quantity,
      brand,
    },
  });

  const handleUpdateProduct = async (data: TProduct) => {
    const releaseDate = moment(date).format("DD MMMM YYYY");
    const info = {
      ...data,
      releaseDate,
      user: user?._id,
      operatingSystem: operatingSystemType,
      brand: brandType,
      screenSize: screenSizeType,
      ram: ramType,
      storage: storageType,
      battery: batteryType,
    };
    const res = await updateProduct({ id: _id, data: info }).unwrap();
    if (res.success) {
      setIsOpen(false);
      toast.success("Product Added Successfully");
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='sm' className='gap-2'>
          <Edit size={20} />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className='rounded-lg'>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>Add new product to your account</DialogDescription>
        </DialogHeader>
        <ScrollArea className='grid gap-4 py-4 h-96 lg:h-full'>
          <form
            onSubmit={handleSubmit(handleUpdateProduct)}
            className='grid grid-cols-1 gap-4 md:grid-cols-2'
          >
            <div className='space-y-1'>
              <Label>Model</Label>
              <Input type='text' placeholder='Model' required {...register("model")} />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='brand'>Brand</Label>

              <Select onValueChange={setBrandType}>
                <SelectTrigger>
                  <SelectValue placeholder='Select a brands' />
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
              <Select onValueChange={setRamType}>
                <SelectTrigger>
                  <SelectValue placeholder='Select ram size' />
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
              <Select onValueChange={setStorageType}>
                <SelectTrigger>
                  <SelectValue placeholder='Select storage capacity' />
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
              <Select onValueChange={setScreenSizeType}>
                <SelectTrigger>
                  <SelectValue placeholder='Select screen size' />
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
              <Input placeholder='Camera' required {...register("camera")} />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='operatingSystem'>Operating System</Label>
              <Select onValueChange={setOperatingSystemType}>
                <SelectTrigger>
                  <SelectValue placeholder='Select screen size' />
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
                required
                {...register("price", { valueAsNumber: true })}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='quantity'>Quantity</Label>
              <Input
                type='number'
                placeholder='quantity'
                required
                {...register("quantity", { valueAsNumber: true })}
              />
            </div>

            <div className='space-y-1'>
              <Label htmlFor='battery'>Battery</Label>
              <Select onValueChange={setBatteryType}>
                <SelectTrigger>
                  <SelectValue placeholder='Select battery size' />
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

            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
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
  );
};

export default UpdateProductModal;
