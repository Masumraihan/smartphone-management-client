import { Card } from "./card";
import { Skeleton } from "./skeleton";

const SalesLoader = () => {
  return (
    <div className='mt-10 space-y-4'>
      {[...Array(6).keys()].map((key) => (
        <Card key={key} className='flex items-center justify-between'>
          <Skeleton className='w-40 h-10' />
          <Skeleton className='h-10 w-60' />
          <Skeleton className='w-40 h-10' />
          <Skeleton className='w-56 h-10' />
        </Card>
      ))}
    </div>
  );
};

export default SalesLoader;
