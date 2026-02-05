 import { GeneratedContent, Platform } from '@/types/content';
 import { CaptionCard } from './CaptionCard';
 import { HashtagSection } from './HashtagSection';
 import { PostIdeaCard } from './PostIdeaCard';
 import { MessageSquare, Lightbulb } from 'lucide-react';
 
 interface ResultsSectionProps {
   content: GeneratedContent;
   platform: Platform;
   isFavorite: (caption: string) => boolean;
   onToggleFavorite: (caption: string) => void;
 }
 
 export function ResultsSection({ content, platform, isFavorite, onToggleFavorite }: ResultsSectionProps) {
   return (
     <div className="space-y-8">
       {/* Captions */}
       <div className="space-y-4">
         <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
             <MessageSquare className="w-4 h-4 text-primary-foreground" />
           </div>
           <h3 className="font-semibold text-foreground">Captions</h3>
           <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
             {content.captions.length}
           </span>
         </div>
         <div className="grid gap-4">
           {content.captions.map((caption, index) => (
             <CaptionCard
               key={index}
               caption={caption}
               index={index}
               isFavorite={isFavorite(caption)}
               onToggleFavorite={() => onToggleFavorite(caption)}
             />
           ))}
         </div>
       </div>
 
       {/* Hashtags */}
       <HashtagSection hashtags={content.hashtags} />
 
       {/* Post Ideas */}
       <div className="space-y-4">
         <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
             <Lightbulb className="w-4 h-4 text-primary-foreground" />
           </div>
           <h3 className="font-semibold text-foreground">Post Ideas</h3>
         </div>
         <div className="grid gap-4 md:grid-cols-2">
           {content.postIdeas.map((idea, index) => (
             <PostIdeaCard key={index} idea={idea} index={index} />
           ))}
         </div>
       </div>
     </div>
   );
 }