import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { VirtualizedGrid } from './components/VirtualizedGrid';
import { PhotoModal } from './components/PhotoModal';
import { generatePhotos } from './utils/mockData';
import { Photo } from './types/photo';

export const App: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const photos = useMemo(() => generatePhotos(10000), []);

  return (
    <div className="app-container">
      <Header totalPhotos={photos.length} />
      <main>
        <VirtualizedGrid
          photos={photos}
          onSelectPhoto={(photo) => setSelectedPhoto(photo)}
        />
      </main>
      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
};

export default App;
