import React, { useState, useRef, UIEvent } from "react";
import { Photo } from "../types/photo";
import { PhotoCard } from "./PhotoCard";

interface VirtualizedGridProps {
  photos: Photo[];
  onSelectPhoto: (photo: Photo) => void;
  itemHeight?: number;
  itemsPerRow?: number;
}

export const VirtualizedGrid: React.FC<VirtualizedGridProps> = ({
  photos,
  onSelectPhoto,
  itemHeight = 240,
  itemsPerRow = 4,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const totalRows = Math.ceil(photos.length / itemsPerRow);
  const totalHeight = totalRows * itemHeight;

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const containerHeight = containerRef.current?.clientHeight || 800;

  const startRow = Math.max(0, Math.floor(scrollTop / itemHeight) - 1);
  const endRow = Math.min(
    totalRows - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + 1,
  );

  const visiblePhotos: { photo: Photo; index: number }[] = [];
  for (let row = startRow; row <= endRow; row++) {
    for (let col = 0; col < itemsPerRow; col++) {
      const index = row * itemsPerRow + col;
      if (index < photos.length) {
        visiblePhotos.push({ photo: photos[index], index });
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="virtual-scroll-container"
      onScroll={handleScroll}
      style={{ height: "80vh", overflowY: "auto", position: "relative" }}
    >
      <div style={{ height: `${totalHeight}px`, position: "relative" }}>
        {visiblePhotos.map(({ photo, index }) => {
          const row = Math.floor(index / itemsPerRow);
          const col = index % itemsPerRow;
          const top = row * itemHeight;
          const left = `${(col / itemsPerRow) * 100}%`;
          const width = `${100 / itemsPerRow}%`;

          return (
            <div
              key={photo.id}
              style={{
                position: "absolute",
                top: `${top}px`,
                left,
                width,
                height: `${itemHeight}px`,
                padding: "8px",
                boxSizing: "border-box",
              }}
            >
              <PhotoCard photo={photo} onSelect={onSelectPhoto} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
