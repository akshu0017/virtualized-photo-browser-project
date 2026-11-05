import { useState } from 'react';
import { ITEM_HEIGHT, COLUMN_COUNT, OVERSCAN } from '../utils/constants';

export const useVirtualization = (totalItems: number, containerHeight: number) => {
  const [scrollTop, setScrollTop] = useState(0);

  const totalRows = Math.ceil(totalItems / COLUMN_COUNT);
  const startRow = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN);
  const endRow = Math.min(totalRows - 1, Math.ceil((scrollTop + containerHeight) / ITEM_HEIGHT) + OVERSCAN);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return {
    totalRows,
    startRow,
    endRow,
    onScroll,
    totalHeight: totalRows * ITEM_HEIGHT,
  };
};