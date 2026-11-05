import React from 'react';

interface HeaderProps {
  totalPhotos: number;
}

export const Header: React.FC<HeaderProps> = ({ totalPhotos }) => {
  return (
    <header className="header">
      <h1>Virtualized Photo Gallery</h1>
      <p>Displaying {totalPhotos.toLocaleString()} items efficiently</p>
    </header>
  );
};
