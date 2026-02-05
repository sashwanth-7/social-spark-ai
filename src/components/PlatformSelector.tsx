 import { Platform } from '@/types/content';
 import { cn } from '@/lib/utils';
 import { Instagram, Twitter, Linkedin } from 'lucide-react';
 
 interface PlatformSelectorProps {
   selected: Platform;
   onChange: (platform: Platform) => void;
 }
 
 const platforms: { id: Platform; label: string; icon: React.ElementType; gradient: string }[] = [
   { id: 'instagram', label: 'Instagram', icon: Instagram, gradient: 'gradient-instagram' },
   { id: 'twitter', label: 'Twitter', icon: Twitter, gradient: 'gradient-twitter' },
   { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, gradient: 'gradient-linkedin' },
 ];
 
 export function PlatformSelector({ selected, onChange }: PlatformSelectorProps) {
   return (
     <div className="space-y-2">
       <label className="text-sm font-medium text-foreground">Platform</label>
       <div className="grid grid-cols-3 gap-3">
         {platforms.map((platform) => {
           const Icon = platform.icon;
           const isSelected = selected === platform.id;
           return (
             <button
               key={platform.id}
               type="button"
               onClick={() => onChange(platform.id)}
               className={cn(
                 "relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                 isSelected
                   ? "border-transparent shadow-elevated"
                   : "border-border bg-card hover:border-muted-foreground/20"
               )}
             >
               {isSelected && (
                 <div className={cn("absolute inset-0 rounded-xl opacity-10", platform.gradient)} />
               )}
               <div
                 className={cn(
                   "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                   isSelected ? platform.gradient : "bg-muted"
                 )}
               >
                 <Icon className={cn("w-5 h-5", isSelected ? "text-primary-foreground" : "text-muted-foreground")} />
               </div>
               <span className={cn("text-sm font-medium", isSelected ? "text-foreground" : "text-muted-foreground")}>
                 {platform.label}
               </span>
             </button>
           );
         })}
       </div>
     </div>
   );
 }