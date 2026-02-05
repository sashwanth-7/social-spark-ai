 import { PostIdea } from '@/types/content';
 import { Image, Video, Clock, LayoutGrid } from 'lucide-react';
 import { cn } from '@/lib/utils';
 
 interface PostIdeaCardProps {
   idea: PostIdea;
   index: number;
 }
 
 const typeIcons: Record<PostIdea['type'], React.ElementType> = {
   image: Image,
   reel: Video,
   story: Clock,
   carousel: LayoutGrid,
 };
 
 const typeLabels: Record<PostIdea['type'], string> = {
   image: 'Image Post',
   reel: 'Reel',
   story: 'Story',
   carousel: 'Carousel',
 };
 
 const typeColors: Record<PostIdea['type'], string> = {
   image: 'bg-blue-500/10 text-blue-600',
   reel: 'bg-pink-500/10 text-pink-600',
   story: 'bg-orange-500/10 text-orange-600',
   carousel: 'bg-purple-500/10 text-purple-600',
 };
 
 export function PostIdeaCard({ idea, index }: PostIdeaCardProps) {
   const Icon = typeIcons[idea.type];
 
   return (
     <div
       className="p-5 rounded-xl bg-card shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300 animate-fade-in"
       style={{ animationDelay: `${(index + 3) * 100}ms` }}
     >
       <div className="flex items-start gap-4">
         <div className={cn("p-2.5 rounded-lg", typeColors[idea.type])}>
           <Icon className="w-5 h-5" />
         </div>
         <div className="flex-1 min-w-0">
           <div className="flex items-center gap-2 mb-1">
             <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", typeColors[idea.type])}>
               {typeLabels[idea.type]}
             </span>
           </div>
           <h4 className="font-semibold text-foreground mb-1">{idea.title}</h4>
           <p className="text-sm text-muted-foreground leading-relaxed">{idea.description}</p>
         </div>
       </div>
     </div>
   );
 }