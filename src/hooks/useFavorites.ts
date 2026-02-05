 import { useState, useEffect } from 'react';
 import { FavoriteCaption, Platform } from '@/types/content';
 
 const STORAGE_KEY = 'social-content-favorites';
 
 export function useFavorites() {
   const [favorites, setFavorites] = useState<FavoriteCaption[]>([]);
 
   useEffect(() => {
     const stored = localStorage.getItem(STORAGE_KEY);
     if (stored) {
       try {
         const parsed = JSON.parse(stored);
         setFavorites(parsed.map((f: FavoriteCaption) => ({
           ...f,
           createdAt: new Date(f.createdAt),
         })));
       } catch {
         setFavorites([]);
       }
     }
   }, []);
 
   const addFavorite = (caption: string, platform: Platform) => {
     const newFavorite: FavoriteCaption = {
       id: crypto.randomUUID(),
       caption,
       platform,
       createdAt: new Date(),
     };
     const updated = [newFavorite, ...favorites];
     setFavorites(updated);
     localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
   };
 
   const removeFavorite = (id: string) => {
     const updated = favorites.filter((f) => f.id !== id);
     setFavorites(updated);
     localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
   };
 
   const isFavorite = (caption: string) => {
     return favorites.some((f) => f.caption === caption);
   };
 
   return { favorites, addFavorite, removeFavorite, isFavorite };
 }