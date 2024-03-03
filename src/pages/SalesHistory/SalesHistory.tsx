import SalesTable from "@/components/salesHistoryTable/SalesTable";
import Header from "@/components/ui/Header/Header";
import SalesLoader from "@/components/ui/SalesLoader";
import { useGetSalesQuery } from "@/redux/features/sales/salesApi";
import { useState } from "react";

const SalesHistory = () => {
  const [filterBy, setFilterBy] = useState("all");
  const { data, isLoading } = useGetSalesQuery(filterBy);

  return (
    <div>
      <Header>
        <h1 className='text-lg font-bold md:text-2xl'>Sales History</h1>
      </Header>
      <div>
        <>
          {isLoading ? (
            <SalesLoader />
          ) : (
            <div className='w-full'>
              <SalesTable filterBy={filterBy} setFilterBy={setFilterBy} data={data?.data} />
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default SalesHistory;
