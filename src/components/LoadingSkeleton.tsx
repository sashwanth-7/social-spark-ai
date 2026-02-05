 import { Skeleton } from '@/components/ui/skeleton';
 
 export function LoadingSkeleton() {
   return (
     <div className="space-y-8 animate-fade-in">
       {/* Captions skeleton */}
       <div className="space-y-4">
         <div className="flex items-center gap-2">
           <Skeleton className="w-8 h-8 rounded-lg" />
           <Skeleton className="h-5 w-24" />
         </div>
         <div className="space-y-4">
           {[1, 2, 3].map((i) => (
             <Skeleton key={i} className="h-24 w-full rounded-xl" />
           ))}
         </div>
       </div>
 
       {/* Hashtags skeleton */}
       <div className="space-y-4">
         <div className="flex items-center gap-2">
           <Skeleton className="w-8 h-8 rounded-lg" />
           <Skeleton className="h-5 w-24" />
         </div>
         <div className="flex flex-wrap gap-2">
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <Skeleton key={i} className="h-8 w-20 rounded-full" />
           ))}
         </div>
       </div>
 
       {/* Post Ideas skeleton */}
       <div className="space-y-4">
         <div className="flex items-center gap-2">
           <Skeleton className="w-8 h-8 rounded-lg" />
           <Skeleton className="h-5 w-24" />
         </div>
         <div className="grid gap-4 md:grid-cols-2">
           {[1, 2, 3, 4].map((i) => (
             <Skeleton key={i} className="h-32 w-full rounded-xl" />
           ))}
         </div>
       </div>
     </div>
   );
 }