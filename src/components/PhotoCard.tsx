import React from 'react';
import { Photo } from '../types/photo';

interface PhotoCardProps {
  photo: Photo;
  onSelect: (photo: Photo) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onSelect }) => {
  return (
    <div
      className="photo-card"
      onClick={() => onSelect(photo)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(photo);
        }
      }}
    >
      <img src={photo.thumbnailUrl} alt={photo.title} loading="lazy" />
      <div className="photo-info">
        <h3>{photo.title}</h3>
        <p>By {photo.author}</p>
      </div>
    </div>
  );
};
