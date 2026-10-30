export interface Photo {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  author: string;
  width: number;
  height: number;
}

export interface ModalState {
  isOpen: boolean;
  selectedPhoto: Photo | null;
}
