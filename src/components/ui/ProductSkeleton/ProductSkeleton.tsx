import { Skeleton } from "../skeleton";

const ProductSkeleton = () => {
  return (
    <div className='flex flex-col space-y-3'>
      <Skeleton className='h-[300px] w-full rounded-xl' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <div className='grid grid-cols-2 gap-x-4 gap-y-1'>
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
        </div>
        <Skeleton className='w-full h-10 mt-4' />
      </div>
    </div>
  );
};

export default ProductSkeleton;
