/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import { toast } from "sonner";
const UserTable = ({ data }: { data: any }) => {
  const user = useAppSelector(useCurrentUser);
  const [value, setValue] = useState(user?.role);

  const [updateUser] = useUpdateUserMutation();
  const handleUpdateRole = async ({ _id, role }: { _id: string; role: string }) => {
    const toastId = toast.loading("Updating...");
    setValue(role);
    try {
      const res = await updateUser({ _id, data: { role } }).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div className='container'>
      <div className='flex justify-end w-full'></div>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell className='font-medium'>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span
                  className={`text-xs border py-1 px-3 rounded-full ${
                    user.role === "seller"
                      ? "text-green-500 border-green-500"
                      : user.role === "manager"
                      ? "text-blue-500 border-blue-500"
                      : user.role === "superAdmin" && "text-red-500 border-red-500"
                  } `}
                >
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size={"sm"}>
                      Update Role
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56'>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      defaultValue={value}
                      value={value}
                      onValueChange={(value) => handleUpdateRole({ _id: user._id, role: value })}
                    >
                      <DropdownMenuRadioItem value='manager'>Manager</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value='seller'>Seller</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
