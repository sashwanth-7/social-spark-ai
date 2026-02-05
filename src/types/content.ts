 export type Platform = 'instagram' | 'twitter' | 'linkedin';
 export type Tone = 'funny' | 'motivational' | 'professional';
 
 export interface GeneratedContent {
   captions: string[];
   hashtags: string[];
   postIdeas: PostIdea[];
 }
 
 export interface PostIdea {
   type: 'image' | 'reel' | 'story' | 'carousel';
   title: string;
   description: string;
 }
 
 export interface ContentRequest {
   topic: string;
   tone: Tone;
   platform: Platform;
 }
 
 export interface FavoriteCaption {
   id: string;
   caption: string;
   platform: Platform;
   createdAt: Date;
 }