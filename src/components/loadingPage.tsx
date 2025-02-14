import Loader from "@/icons/loader";

export default function LoadingPage() {
   return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
         <Loader />
      </div>
   );
}
