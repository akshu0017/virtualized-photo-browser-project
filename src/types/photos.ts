export interface Photo {
  id: string | number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface PhotoViewerModalProps {
  photo: Photo | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}