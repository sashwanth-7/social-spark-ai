 import { Heart, Trash2, Copy, Check } from 'lucide-react';
 import { useState } from 'react';
 import { Button } from '@/components/ui/button';
 import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
 } from '@/components/ui/sheet';
 import { FavoriteCaption } from '@/types/content';
 import { toast } from 'sonner';
 import { cn } from '@/lib/utils';
 
 interface FavoritesDrawerProps {
   favorites: FavoriteCaption[];
   onRemove: (id: string) => void;
 }
 
 const platformColors = {
   instagram: 'bg-instagram/10 text-instagram',
   twitter: 'bg-twitter/10 text-twitter',
   linkedin: 'bg-linkedin/10 text-linkedin',
 };
 
 export function FavoritesDrawer({ favorites, onRemove }: FavoritesDrawerProps) {
   const [copiedId, setCopiedId] = useState<string | null>(null);
 
   const handleCopy = async (caption: string, id: string) => {
     await navigator.clipboard.writeText(caption);
     setCopiedId(id);
     toast.success('Caption copied!');
     setTimeout(() => setCopiedId(null), 2000);
   };
 
   return (
     <Sheet>
       <SheetTrigger asChild>
         <Button variant="outline" size="icon" className="relative">
           <Heart className="w-4 h-4" />
           {favorites.length > 0 && (
             <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
               {favorites.length}
             </span>
           )}
         </Button>
       </SheetTrigger>
       <SheetContent className="w-full sm:max-w-md">
         <SheetHeader>
           <SheetTitle className="flex items-center gap-2">
             <Heart className="w-5 h-5 text-primary" />
             Saved Captions
           </SheetTitle>
         </SheetHeader>
         <div className="mt-6 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
           {favorites.length === 0 ? (
             <div className="text-center py-12 text-muted-foreground">
               <Heart className="w-12 h-12 mx-auto mb-3 opacity-30" />
               <p>No saved captions yet</p>
               <p className="text-sm mt-1">Click the heart icon on any caption to save it</p>
             </div>
           ) : (
             favorites.map((fav) => (
               <div
                 key={fav.id}
                 className="p-4 rounded-xl bg-secondary/50 border border-border group"
               >
                 <div className="flex items-start justify-between gap-2 mb-2">
                   <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full capitalize", platformColors[fav.platform])}>
                     {fav.platform}
                   </span>
                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button
                       variant="ghost"
                       size="icon"
                       className="h-7 w-7"
                       onClick={() => handleCopy(fav.caption, fav.id)}
                     >
                       {copiedId === fav.id ? (
                         <Check className="w-3.5 h-3.5 text-accent" />
                       ) : (
                         <Copy className="w-3.5 h-3.5" />
                       )}
                     </Button>
                     <Button
                       variant="ghost"
                       size="icon"
                       className="h-7 w-7 text-destructive hover:text-destructive"
                       onClick={() => onRemove(fav.id)}
                     >
                       <Trash2 className="w-3.5 h-3.5" />
                     </Button>
                   </div>
                 </div>
                 <p className="text-sm text-foreground leading-relaxed">{fav.caption}</p>
               </div>
             ))
           )}
         </div>
       </SheetContent>
     </Sheet>
   );
 }