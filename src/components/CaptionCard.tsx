 import { useState, forwardRef } from 'react';
 import { Copy, Check, Heart } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { cn } from '@/lib/utils';
 import { toast } from 'sonner';
 
 interface CaptionCardProps {
   caption: string;
   index: number;
   isFavorite: boolean;
   onToggleFavorite: () => void;
 }
 
 export const CaptionCard = forwardRef<HTMLDivElement, CaptionCardProps>(
   function CaptionCard({ caption, index, isFavorite, onToggleFavorite }, ref) {
   const [copied, setCopied] = useState(false);
 
   const handleCopy = async () => {
     await navigator.clipboard.writeText(caption);
     setCopied(true);
     toast.success('Caption copied to clipboard!');
     setTimeout(() => setCopied(false), 2000);
   };
 
     return (
       <div
         ref={ref}
         className="group relative p-5 rounded-xl bg-card shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300 animate-fade-in"
         style={{ animationDelay: `${index * 100}ms` }}
       >
         <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button
             variant="ghost"
             size="icon"
             className="h-8 w-8"
             onClick={onToggleFavorite}
           >
             <Heart className={cn("w-4 h-4", isFavorite ? "fill-primary text-primary" : "")} />
           </Button>
           <Button
             variant="ghost"
             size="icon"
             className="h-8 w-8"
             onClick={handleCopy}
           >
           {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
           </Button>
         </div>
         <p className="text-foreground leading-relaxed pr-16">{caption}</p>
       </div>
     );
   }
 );