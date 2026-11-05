import React, { useRef } from 'react';
import { Photo } from '../types/photos';
import { PhotoCard } from './PhotoCard';
import { useVirtualization } from '../hooks/useVirtualization';
import { COLUMN_COUNT, ITEM_HEIGHT } from '../utils/constants';

interface VirtualizedGridProps {
  photos: Photo[];
  onSelectPhoto: (photo: Photo) => void;
}

export const VirtualizedGrid: React.FC<VirtualizedGridProps> = ({ photos, onSelectPhoto }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerHeight = 600;
  const { totalRows, startRow, endRow, onScroll, totalHeight } = useVirtualization(photos.length, containerHeight);

  const visibleItems = [];
  for (let row = startRow; row <= endRow; row++) {
    for (let col = 0; col < COLUMN_COUNT; col++) {
      const index = row * COLUMN_COUNT + col;
      if (index < photos.length) {
        visibleItems.push({ photo: photos[index], index, row, col });
      }
    }
  }

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      style={{
        height: `${containerHeight}px`,
        overflowY: 'auto',
        position: 'relative',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
      }}
    >
      <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
        {visibleItems.map(({ photo, index, row, col }) => (
          <div
            key={photo.id || index}
            style={{
              position: 'absolute',
              top: `${row * ITEM_HEIGHT}px`,
              left: `${(col / COLUMN_COUNT) * 100}%`,
              width: `${100 / COLUMN_COUNT}%`,
              height: `${ITEM_HEIGHT}px`,
              padding: '6px',
              boxSizing: 'border-box',
            }}
          >
            <PhotoCard photo={photo} onClick={onSelectPhoto} />
          </div>
        ))}
      </div>
    </div>
  );
};