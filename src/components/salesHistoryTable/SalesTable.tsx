/* eslint-disable @typescript-eslint/no-explicit-any */
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ChevronDown } from "lucide-react";
import moment from "moment";
import { Dispatch, useRef } from "react";
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
  const pdfRef: any = useRef();

  const downloadPDF = () => {
    if (pdfRef.current) {
      const { offsetWidth, offsetHeight } = pdfRef.current;
      html2canvas(pdfRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const doc = new jsPDF("p", "mm", "a4");
        const width = doc.internal.pageSize.getWidth();
        const height = (offsetHeight / offsetWidth) * width;
        doc.addImage(imgData, "PNG", 0, 0, width, height);
        doc.save("receipt.pdf");
      });
    }
  };

  return (
    <div className='container'>
      <div className='flex justify-end w-full gap-x-3'>
        <Button onClick={downloadPDF} className='bg-green-500 hover:bg-green-600'>
          Download Invoice
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='gap-2 capitalize'>
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
              <DropdownMenuRadioItem value='day'>Today</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div ref={pdfRef}>
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead>Product Brand</TableHead>
              <TableHead>Product Model</TableHead>
              <TableHead>Product Buyer</TableHead>
              <TableHead>Product Quantity</TableHead>
              <TableHead>Sales Date</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((product, i) => (
              <TableRow key={i}>
                <TableCell>{product.product.brand}</TableCell>
                <TableCell>{product.product.model}</TableCell>
                <TableCell>{product.buyer}</TableCell>
                <TableCell>{product.salesQuantity}</TableCell>
                <TableCell>{moment(product.salesDate).format("DD MMMM YYYY")}</TableCell>
                <TableCell className='text-left'>${product.salesPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SalesTable;
