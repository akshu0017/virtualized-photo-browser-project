import React, { useState } from 'react';
import { usePhotos } from './hooks/usePhotos';
import { VirtualizedGrid } from './components/virtualizedGrid';
import { PhotoViewerModal } from './components/PhotoViewerModal';
import { Photo } from './types/photos';

export const App: React.FC = () => {
  const { photos, loading, error } = usePhotos();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handleSelectPhoto = (photo: Photo) => {
    const idx = photos.findIndex((p) => p.id === photo.id);
    setSelectedPhotoIndex(idx);
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading photos...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '16px', fontFamily: 'sans-serif' }}>
      <h2>Virtualized Photo Browser</h2>
      <VirtualizedGrid photos={photos} onSelectPhoto={handleSelectPhoto} />

      {selectedPhotoIndex !== null && (
        <PhotoViewerModal
          photo={photos[selectedPhotoIndex]}
          onClose={() => setSelectedPhotoIndex(null)}
          onNext={selectedPhotoIndex < photos.length - 1 ? () => setSelectedPhotoIndex(selectedPhotoIndex + 1) : undefined}
          onPrev={selectedPhotoIndex > 0 ? () => setSelectedPhotoIndex(selectedPhotoIndex - 1) : undefined}
        />
      )}
    </div>
  );
};

export default App;