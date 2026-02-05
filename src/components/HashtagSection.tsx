 import { useState } from 'react';
 import { Copy, Check, Hash } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { toast } from 'sonner';
 
 interface HashtagSectionProps {
   hashtags: string[];
 }
 
 export function HashtagSection({ hashtags }: HashtagSectionProps) {
   const [copied, setCopied] = useState(false);
 
   const handleCopyAll = async () => {
     const text = hashtags.map((h) => `#${h}`).join(' ');
     await navigator.clipboard.writeText(text);
     setCopied(true);
     toast.success('Hashtags copied to clipboard!');
     setTimeout(() => setCopied(false), 2000);
   };
 
   return (
     <div className="space-y-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
       <div className="flex items-center justify-between">
         <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
             <Hash className="w-4 h-4 text-primary-foreground" />
           </div>
           <h3 className="font-semibold text-foreground">Hashtags</h3>
         </div>
         <Button variant="outline" size="sm" onClick={handleCopyAll} className="gap-2">
           {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
           Copy All
         </Button>
       </div>
       <div className="flex flex-wrap gap-2">
         {hashtags.map((hashtag, index) => (
           <span
             key={index}
             className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
             onClick={async () => {
               await navigator.clipboard.writeText(`#${hashtag}`);
               toast.success(`#${hashtag} copied!`);
             }}
           >
             #{hashtag}
           </span>
         ))}
       </div>
     </div>
   );
 }