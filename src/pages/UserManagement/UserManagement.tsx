import UserTable from "@/components/UserTable";
import Header from "@/components/ui/Header/Header";
import SalesLoader from "@/components/ui/SalesLoader";
import { useGetUsersQuery } from "@/redux/features/user/userApi";

const UserManagement = () => {
  const { data: users, isLoading } = useGetUsersQuery(undefined);
  return (
    <div>
      <Header>
        <h1 className='text-lg font-bold md:text-2xl'>Sales Management</h1>
      </Header>
      <div>
        <>
          {isLoading ? (
            <SalesLoader />
          ) : (
            //<SalesHistoryTable />
            <div className='w-full'>
              <UserTable data={users?.data} />
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default UserManagement;
