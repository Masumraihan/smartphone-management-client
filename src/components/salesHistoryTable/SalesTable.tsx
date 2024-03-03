import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import moment from "moment";
import { Dispatch } from "react";
import { TSale } from "./salesTable.type";
const SalesTable = ({
  data,
  filterBy,
  setFilterBy,
}: {
  data: TSale[];
  filterBy: string;
  setFilterBy: Dispatch<string>;
}) => {
  return (
    <div className='container'>
      <div className='flex justify-end w-full'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size={"lg"} className='gap-2 capitalize'>
              {filterBy} <ChevronDown size={20} className='mt-1' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={filterBy} onValueChange={setFilterBy}>
              <DropdownMenuRadioItem value='all'>All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='year'>Last Year</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='month'>Last Month</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='week'>Last week</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead>Product Id</TableHead>
            <TableHead>Product Quantity</TableHead>
            <TableHead>Sales Date</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product._id}>
              <TableCell className='font-medium'>{product.product._id}</TableCell>
              <TableCell>{product.salesQuantity}</TableCell>
              <TableCell>{moment(product.salesDate).format("DD MMMM YYYY")}</TableCell>
              <TableCell className='text-left'>${product.salesPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SalesTable;
