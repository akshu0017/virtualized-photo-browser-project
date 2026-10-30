import { Photo } from "../types/photo";

export const generatePhotos = (count: number): Photo[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `photo-${index + 1}`,
    title: `Photo Title ${index + 1}`,
    url: `https://picsum.photos/id/${(index % 100) + 1}/1000/800`,
    thumbnailUrl: `https://picsum.photos/id/${(index % 100) + 1}/300/200`,
    author: `Creator ${index + 1}`,
    width: 1000,
    height: 800,
  }));
};
