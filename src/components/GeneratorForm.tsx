 import { useState } from 'react';
 import { Sparkles, Loader2 } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { PlatformSelector } from './PlatformSelector';
 import { ToneSelector } from './ToneSelector';
 import { ContentRequest, Platform, Tone } from '@/types/content';
 
 interface GeneratorFormProps {
   onGenerate: (request: ContentRequest) => void;
   isLoading: boolean;
 }
 
 export function GeneratorForm({ onGenerate, isLoading }: GeneratorFormProps) {
   const [topic, setTopic] = useState('');
   const [tone, setTone] = useState<Tone>('motivational');
   const [platform, setPlatform] = useState<Platform>('instagram');
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (!topic.trim()) return;
     onGenerate({ topic, tone, platform });
   };
 
   return (
     <form onSubmit={handleSubmit} className="space-y-6">
       <div className="space-y-2">
         <label htmlFor="topic" className="text-sm font-medium text-foreground">
           Topic or Keywords
         </label>
         <Input
           id="topic"
           placeholder="e.g., morning routine, productivity tips, new product launch..."
           value={topic}
           onChange={(e) => setTopic(e.target.value)}
           className="h-12 text-base"
         />
       </div>
 
       <ToneSelector selected={tone} onChange={setTone} />
       <PlatformSelector selected={platform} onChange={setPlatform} />
 
       <Button
         type="submit"
         variant="gradient"
         size="lg"
         className="w-full"
         disabled={!topic.trim() || isLoading}
       >
         {isLoading ? (
           <>
             <Loader2 className="w-5 h-5 animate-spin" />
             Generating...
           </>
         ) : (
           <>
             <Sparkles className="w-5 h-5" />
             Generate Content
           </>
         )}
       </Button>
     </form>
   );
 }