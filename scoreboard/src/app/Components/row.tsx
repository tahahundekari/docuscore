interface RowProps {
  rank: any;
  name: any;
  upvotes: any;
}

export default function Row({ rank, name, upvotes }: RowProps) {
  return (
    <div className="flex w-[512px] border-b p-[4px]">
      <div className="flex text text-black text-xl w-[128px] justify-center">
        {rank}
      </div>
      <div className="flex text text-black text-xl w-[384px] justify-center">
        {name}
      </div>
      <div className="justify-center text text-black text-xl w-[128px]">
        {upvotes}
      </div>
    </div>
  );
}
