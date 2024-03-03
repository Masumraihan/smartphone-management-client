import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";
import { useCreateSalesMutation } from "@/redux/features/sales/salesApi";
import { toast } from "sonner";

export type TSales = {
  quantity: number;
  date: Date;
  buyer: string;
};

const SalesModal = ({ quantity, _id }: { quantity: number; _id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { handleSubmit, register } = useForm<TSales>();
  const [createSales, { error, isLoading }] = useCreateSalesMutation();
  const handleSalesProduct = async (data: TSales) => {
    const res = await createSales({ ...data, product: _id, salesDate: date }).unwrap();
    if (res?.success) {
      setIsOpen(false);
      toast.success(res?.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='w-full'>Sell</Button>
      </DialogTrigger>
      <DialogContent className='rounded-lg'>
        <DialogHeader>
          <DialogTitle>Sell This Product</DialogTitle>
        </DialogHeader>
        <ScrollArea className='grid gap-4 py-4 lg:h-full'>
          <form onSubmit={handleSubmit(handleSalesProduct)} className='space-y-4'>
            <div className='space-y-1'>
              <Label htmlFor='quantity'>Quantity</Label>
              <Input
                type='number'
                min={1}
                max={quantity}
                placeholder='salesQuantity'
                required
                {...register("quantity", { valueAsNumber: true })}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='buyer'>Name Of the Buyer</Label>
              <Input type='text' placeholder='buyer' required {...register("buyer")} />
            </div>

            <div className='space-y-1'>
              <h3>Sales Date</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full flex justify-start text-left font-normal",
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
            {error && !isLoading && <p style={{ color: "red" }}>Please Provide valid details</p>}
            <Button type='submit' className='w-full'>
              Sell
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SalesModal;
