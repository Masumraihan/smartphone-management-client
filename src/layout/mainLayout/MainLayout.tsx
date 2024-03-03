import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  //const isOpen = useAppSelector((state) => state.sidebar.isOpen);

  //const dispatch = useAppDispatch();

  //const close = () => dispatch(closeSidebar());

  return (
    <>
      <div className='grid grid-cols-6'>
        <div className='hidden sm:hidden lg:block'>
          <ScrollArea className='border-r'>
            <Sidebar />
          </ScrollArea>
        </div>
        <ScrollArea className='h-full px-4 col-span-full sm:col-span-full lg:col-span-5 max-h-dvh'>
          <>
            <div>
              <Outlet />
            </div>
          </>
          <ScrollBar orientation='horizontal' className='md:hidden' />
        </ScrollArea>
      </div>
    </>
  );
};

export default MainLayout;
