import { useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { GeneratorForm } from '@/components/GeneratorForm';
import { ResultsSection } from '@/components/ResultsSection';
import { FavoritesDrawer } from '@/components/FavoritesDrawer';
 import { ThemeToggle } from '@/components/ThemeToggle';
 import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { useFavorites } from '@/hooks/useFavorites';
import { generateMockContent } from '@/lib/mockContent';
import { ContentRequest, GeneratedContent, Platform } from '@/types/content';
import { toast } from 'sonner';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [currentPlatform, setCurrentPlatform] = useState<Platform>('instagram');
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleGenerate = async (request: ContentRequest) => {
    setIsLoading(true);
    setCurrentPlatform(request.platform);
    try {
      const result = await generateMockContent(request);
      setContent(result);
      toast.success('Content generated successfully!');
    } catch (error) {
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (caption: string) => {
    if (isFavorite(caption)) {
      const fav = favorites.find((f) => f.caption === caption);
      if (fav) removeFavorite(fav.id);
    } else {
      addFavorite(caption, currentPlatform);
    }
  };

  return (
    <div className="min-h-screen gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">ContentAI</h1>
              <p className="text-xs text-muted-foreground">Social Media Generator</p>
            </div>
          </div>
           <div className="flex items-center gap-2">
             <ThemeToggle />
             <FavoritesDrawer favorites={favorites} onRemove={removeFavorite} />
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered Content
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Create Viral Social Media
              <span className="text-gradient block mt-1">Content in Seconds</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Generate engaging captions, hashtags, and post ideas tailored for any platform.
              Just enter your topic and let AI do the magic.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-[400px,1fr] gap-8">
            {/* Form Card */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="p-6 rounded-2xl bg-card shadow-card border border-border/50">
                <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
              </div>
            </div>

            {/* Results */}
            <div className="min-h-[400px]">
             {isLoading ? (
               <LoadingSkeleton />
             ) : content ? (
                <ResultsSection
                  content={content}
                  platform={currentPlatform}
                  isFavorite={isFavorite}
                  onToggleFavorite={handleToggleFavorite}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
                    <Sparkles className="w-10 h-10 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Create?</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Enter a topic, choose your tone and platform, then hit generate to see your content.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>Built with AI • Connect your OpenAI API to unlock full generation</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
