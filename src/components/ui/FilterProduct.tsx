import { cn } from "@/lib/utils";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";
import {
  displaySizes,
  productBrand,
  ramSizes,
  storageSizes,
} from "./ProductAddModal/productAddModal.constant";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Slider } from "./slider";
import { Switch } from "./switch";
import { Label } from "./label";
type TFilterProductProps = {
  setMinPrice: Dispatch<SetStateAction<number[]>>;
  minPrice: number[];
  setMaxPrice: Dispatch<SetStateAction<number[]>>;
  maxPrice: number[];
  setRam: Dispatch<SetStateAction<string>>;
  setStorage: Dispatch<SetStateAction<string>>;
  setBrand: Dispatch<SetStateAction<string>>;
  date: Date | undefined;
  setDate: SelectSingleEventHandler;
  setOperatingSystem: Dispatch<SetStateAction<string | null>>;
  setScreenSize: Dispatch<SetStateAction<string | null>>;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
};
const FilterProduct = ({
  setMinPrice,
  setMaxPrice,
  setBrand,
  setRam,
  setStorage,
  date,
  setDate,
  setOperatingSystem,
  setScreenSize,
  checked,
  setChecked,
}: TFilterProductProps) => {
  const [currentMinPrice, setCurrentMinPrice] = useState<number[]>([0]);
  const [currentMaxPrice, setCurrentMaxPrice] = useState<number[]>([0]);
  //const [checked, setChecked] = useState(false);

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <h3 className='font-semibold'>
          Filter By Minimum Price <span className='font-bold'>{currentMinPrice}</span>
        </h3>
        <Slider
          defaultValue={currentMinPrice}
          onValueChange={setCurrentMinPrice}
          onValueCommit={setMinPrice}
          min={0}
          max={1000}
        />
      </div>
      <div className='space-y-2'>
        <h3 className='font-semibold'>
          Filter By Maximum Price <span className='font-bold'>{currentMaxPrice}</span>
        </h3>
        <Slider
          defaultValue={currentMaxPrice}
          onValueChange={setCurrentMaxPrice}
          onValueCommit={setMaxPrice}
          min={0}
          max={1000}
        />
      </div>
      <div className='space-y-2'>
        <h3 className='font-semibold'>FIlter By Brand</h3>
        <Select onValueChange={setBrand}>
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
      <div className='space-y-2'>
        <h3 className='font-semibold'>Filter By Ram</h3>
        <Select onValueChange={setRam}>
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
      <div className='space-y-2'>
        <h3 className='font-semibold'>Filter By Storage</h3>
        <Select onValueChange={setStorage}>
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
      <div className='space-y-2'>
        <h3 className='font-semibold'>Filter By Operating System</h3>
        <Select onValueChange={setOperatingSystem}>
          <SelectTrigger>
            <SelectValue placeholder='Select screen size' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Brands</SelectLabel>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='Android'>Android</SelectItem>
              <SelectItem value='IOS'>IOS</SelectItem>
              {/*<SelectItem value='Windows'>Windows</SelectItem>
                      <SelectItem value='MacOS'>MacOS</SelectItem>
                      <SelectItem value='Linux'>Linux</SelectItem>*/}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <h3 className='font-semibold'>Filter By Release Screen Size</h3>
        <Select onValueChange={setScreenSize}>
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

      <div className='space-y-2'>
        <div>
          <div className='flex items-center space-x-2'>
            <Label htmlFor='filter-by-date' className='font-semibold'>
              Filter By Release Date
            </Label>
            <Switch id='filter-by-date' checked={checked} onCheckedChange={setChecked} />
          </div>
        </div>
        {checked && (
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
        )}
      </div>
    </div>
  );
};

export default FilterProduct;
