import { IconCalendarStats, IconDeviceMobile, IconLock, IconLogout } from "@tabler/icons-react";

import { Link } from "react-router-dom";
import { logout } from "../../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { Button } from "../button";

const mockdata = [
  //{ label: "Dashboard", icon: IconLayoutDashboard },
  {
    label: "Smartphone Management",
    icon: IconDeviceMobile,
    initiallyOpened: true,
    link: "/",
    //links: [
    //  { label: "Overview", link: "/" },
    //  { label: "Forecasts", link: "/" },
    //  { label: "Outlook", link: "/" },
    //  { label: "Real time", link: "/" },
    //],
  },
  {
    label: "Sales Management",
    icon: IconCalendarStats,
    link: "/sales-management",
  },
  {
    label: "Sales History",
    icon: IconLock,
    link: "/sales-history",
  },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className='flex flex-col h-screen pb-4 max-h-dvh'>
      <div className='px-4 border-b border-b-black'>
        <>
          <h2 className='text-xl font-bold  py-2.5 '>Product Management</h2>
        </>
      </div>

      <div className='flex flex-col items-start justify-between'>
        <div className='flex flex-col w-full mt-2'>
          {mockdata.map((link) => (
            <Link to={link.link} key={link.label}>
              <Button className='justify-start w-full' variant={"ghost"}>
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className='w-full px-4 mt-auto'>
        <Button className='w-full' onClick={handleLogout}>
          <IconLogout stroke={1.5} />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
};
export default Sidebar;
