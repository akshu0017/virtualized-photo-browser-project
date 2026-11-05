import React from 'react';
import { PhotoCardProps } from '../types/photos';

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  return (
    <div
      onClick={() => onClick(photo)}
      style={{
        cursor: 'pointer',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'hidden',
        padding: '8px',
        background: '#fff',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <img
        src={photo.thumbnailUrl}
        alt={photo.title}
        style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <p style={{ fontSize: '11px', marginTop: '6px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
        {photo.title}
      </p>
    </div>
  );
};