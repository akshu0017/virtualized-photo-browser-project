import React, { useEffect } from 'react';
import { PhotoViewerModalProps } from '../types/photos';

export const PhotoViewerModal: React.FC<PhotoViewerModalProps> = ({
  photo,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!photo) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '500px', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>{photo.title}</h3>
        <img src={photo.url} alt={photo.title} style={{ maxWidth: '100%', maxHeight: '350px', borderRadius: '4px' }} />
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={onPrev} disabled={!onPrev}>Previous</button>
          <button onClick={onClose}>Close</button>
          <button onClick={onNext} disabled={!onNext}>Next</button>
        </div>
      </div>
    </div>
  );
};