 import { Tone } from '@/types/content';
 import { cn } from '@/lib/utils';
 import { Laugh, Sparkles, Briefcase } from 'lucide-react';
 
 interface ToneSelectorProps {
   selected: Tone;
   onChange: (tone: Tone) => void;
 }
 
 const tones: { id: Tone; label: string; icon: React.ElementType; emoji: string }[] = [
   { id: 'funny', label: 'Funny', icon: Laugh, emoji: '😄' },
   { id: 'motivational', label: 'Motivational', icon: Sparkles, emoji: '✨' },
   { id: 'professional', label: 'Professional', icon: Briefcase, emoji: '💼' },
 ];
 
 export function ToneSelector({ selected, onChange }: ToneSelectorProps) {
   return (
     <div className="space-y-2">
       <label className="text-sm font-medium text-foreground">Tone</label>
       <div className="flex gap-2 flex-wrap">
         {tones.map((tone) => {
           const isSelected = selected === tone.id;
           return (
             <button
               key={tone.id}
               type="button"
               onClick={() => onChange(tone.id)}
               className={cn(
                 "flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all duration-200",
                 isSelected
                   ? "border-primary bg-primary/10 text-primary"
                   : "border-border bg-card hover:border-muted-foreground/30 text-muted-foreground"
               )}
             >
               <span className="text-lg">{tone.emoji}</span>
               <span className="font-medium text-sm">{tone.label}</span>
             </button>
           );
         })}
       </div>
     </div>
   );
 }