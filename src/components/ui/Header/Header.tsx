import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ReactNode } from "react";
import Sidebar from "../sidebar/Sidebar";

const Header = ({ children }: { children: ReactNode }) => {
  //const dispatch = useAppDispatch();

  return (
    <header className='flex items-center justify-between py-2 mb-4 border-b border-black '>
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Menu />
          </SheetTrigger>
          <SheetContent className='p-0'>
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
      <div>{children}</div>
    </header>
  );
};
export default Header;
