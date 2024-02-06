import { Billboard as BillboardType} from "@/types";

interface BillboardProps{
    data:BillboardType
};
const Billboard: React.FC<BillboardProps>=({
    data
})=>{
  return ( 
    <div className="p-1 sm:p-1 lg:p-3 rounded-xl overflow-hidden">
      <div style={{ backgroundImage: `url(${data?.imageUrl})` }} className="rounded-xl relative aspect-video md:aspect-[3/1] overflow-hidden bg-cover">
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs"
           style={{
            background: 'rgba(255, 255, 255, 0.5)',
            textShadow: '0 0 20px grey',
          }}
          
          >
            {data?.label}
          </div>
        </div>
      </div>
    </div>
   );
};
export default Billboard;
