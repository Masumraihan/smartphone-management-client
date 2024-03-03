import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import FilterProduct from "./FilterProduct";
import { Button } from "./button";
import { SelectSingleEventHandler } from "react-day-picker";

type TFilterProductProps = {
  setPriceRange: Dispatch<SetStateAction<number[]>>;
  priceRange: number[];
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
const FilterSheet = ({
  priceRange,
  setPriceRange,
  setMaxPrice,
  maxPrice,
  setRam,
  setStorage,
  setBrand,
  date,
  setDate,
  setOperatingSystem,
  setScreenSize,
  checked,
  setChecked,
}: TFilterProductProps) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size='sm' variant={"outline"} className={"gap-2"}>
            <SlidersHorizontal size={16} /> Filter
          </Button>
        </SheetTrigger>
        <SheetContent>
          <FilterProduct
            setMinPrice={setPriceRange}
            minPrice={priceRange}
            setMaxPrice={setMaxPrice}
            maxPrice={maxPrice}
            setRam={setRam}
            setStorage={setStorage}
            setBrand={setBrand}
            date={date}
            setDate={setDate}
            setOperatingSystem={setOperatingSystem}
            setScreenSize={setScreenSize}
            checked={checked}
            setChecked={setChecked}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FilterSheet;
