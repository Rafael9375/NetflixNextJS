import { Dispatch, SetStateAction } from "react";

export interface MovieInterface {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    duration: string;
    genre: string;
    isFavorite: boolean;
    setFavorite: Dispatch<SetStateAction<boolean>>
  }
  