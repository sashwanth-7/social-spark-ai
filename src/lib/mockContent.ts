 import { GeneratedContent, ContentRequest, PostIdea } from '@/types/content';
 
 const captionTemplates = {
   funny: {
     instagram: [
       "Me trying to adult: *Googles how to fold a fitted sheet for the 47th time* 🤷‍♀️",
       "POV: Your alarm went off 3 times but you convinced yourself each snooze was 'just 5 more minutes' 😴",
       "My bank account after I said 'I'm just looking': 👀💸",
     ],
     twitter: [
       "normalize leaving parties early because your social battery died 3 hours ago",
       "me: I'll just have one more episode\nnetflix: are you still watching?\nme, 6 episodes deep at 3am: absolutely not",
       "adulting is just saying 'let me check my calendar' to avoid commitment",
     ],
     linkedin: [
       "Confession: I put 'proficient in Excel' on my resume but I still Google how to freeze a row. Who else is guilty? 🙋‍♂️",
       "Plot twist: The meeting that could've been an email actually needed to be a meeting. I'll wait while you recover from the shock.",
       "My biggest professional growth this year? Finally admitting I don't know what 'circle back' means but I'm too afraid to ask.",
     ],
   },
   motivational: {
     instagram: [
       "Your only limit is you. Today is the day you break through that barrier. 🚀✨",
       "Small steps still move you forward. Keep going, even when it feels slow. 💪",
       "The version of you that starts today will thank you tomorrow. Begin now. ⭐",
     ],
     twitter: [
       "reminder: you don't need to have it all figured out. just figure out the next step.",
       "growth isn't always visible. trust the process you're in right now.",
       "your setback is setting you up for an even bigger comeback.",
     ],
     linkedin: [
       "The best investment you can make is in yourself. Every skill you learn, every challenge you face, compounds over time. 📈",
       "Success isn't about being the best. It's about being better than you were yesterday. Keep pushing your boundaries.",
       "Rejection isn't failure—it's redirection. Every 'no' is guiding you toward your perfect 'yes.'",
     ],
   },
   professional: {
     instagram: [
       "Behind every successful project is a team that believed in the vision. Grateful for mine. 🙏",
       "Excellence isn't a destination—it's a daily practice. Here's to showing up and doing the work. 💼",
       "Sharing a milestone: We've achieved [goal]! This is what happens when strategy meets execution. 📊",
     ],
     twitter: [
       "Key insight from this quarter: data-driven decisions accelerate growth, but intuition guides innovation. Balance is key.",
       "Launching something new today. Months of work, countless iterations. Excited to share what we've built.",
       "Reflecting on leadership: The best leaders don't create followers—they create more leaders.",
     ],
     linkedin: [
       "Excited to announce a major milestone in our journey. This achievement reflects months of strategic planning and execution.",
       "The future of our industry lies in innovation and collaboration. Here's how we're leading the charge.",
       "Thrilled to share insights from our latest project. Key learnings that every professional should consider:",
     ],
   },
 };
 
 const hashtagsByPlatform = {
   instagram: ['trending', 'viral', 'instadaily', 'photooftheday', 'instagood', 'explorepage', 'reels', 'contentcreator'],
   twitter: ['threadworthy', 'mustread', 'thoughtleader', 'trendingtopic', 'twitterfinds'],
   linkedin: ['leadership', 'growthmindset', 'careergrowth', 'networking', 'thoughtleadership', 'professionaldevelopment'],
 };
 
 const postIdeasByType: Record<string, PostIdea[]> = {
   instagram: [
     { type: 'reel', title: 'Behind-the-Scenes', description: 'Show your authentic process with trending audio' },
     { type: 'carousel', title: 'Tips Carousel', description: 'Share 5-7 actionable tips with bold text overlays' },
     { type: 'story', title: 'Q&A Session', description: 'Use the questions sticker to engage your audience' },
     { type: 'image', title: 'Quote Graphic', description: 'Create a shareable quote with your brand colors' },
   ],
   twitter: [
     { type: 'image', title: 'Thread Opener', description: 'Start with a hook that makes people want to read more' },
     { type: 'carousel', title: 'Visual Thread', description: 'Use images to illustrate each point in your thread' },
     { type: 'story', title: 'Fleet Story', description: 'Share quick thoughts that disappear in 24h' },
   ],
   linkedin: [
     { type: 'image', title: 'Data Visualization', description: 'Share insights with a clean, professional chart' },
     { type: 'carousel', title: 'Document Post', description: 'Create a PDF carousel with key takeaways' },
     { type: 'reel', title: 'Video Insight', description: '60-second video sharing your expertise' },
   ],
 };
 
 export async function generateMockContent(request: ContentRequest): Promise<GeneratedContent> {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 1500));
 
   const { tone, platform, topic } = request;
 
   // Get base captions and customize with topic
   const baseCaptions = captionTemplates[tone][platform];
   const captions = baseCaptions.map((caption) => {
     // Add topic context to some captions
     if (Math.random() > 0.5) {
       return `${caption}\n\nToday's focus: ${topic} 🎯`;
     }
     return caption;
   });
 
   // Generate topic-relevant hashtags
   const topicWords = topic.toLowerCase().split(' ').filter((w) => w.length > 3);
   const topicHashtags = topicWords.slice(0, 3).map((w) => w.replace(/[^a-z]/g, ''));
   const baseHashtags = hashtagsByPlatform[platform];
   const hashtags = [...topicHashtags, ...baseHashtags.slice(0, 8 - topicHashtags.length)];
 
   // Get post ideas
   const postIdeas = postIdeasByType[platform] || postIdeasByType.instagram;
 
   return {
     captions,
     hashtags,
     postIdeas,
   };
 }