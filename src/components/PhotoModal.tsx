import React, { useEffect } from 'react';
import { Photo } from '../types/photo';

interface PhotoModalProps {
  photo: Photo | null;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!photo) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>
        <img src={photo.url} alt={photo.title} />
        <h2>{photo.title}</h2>
        <p>Photographer: {photo.author}</p>
      </div>
    </div>
  );
};
