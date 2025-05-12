export interface Project {
  id: string;
  title: string;
  imageUrl: string; // Used for homepage grid and as default intro image
  introImageUrl?: string; // Used for project detail page intro image, defaults to imageUrl if not provided
  subtitle?: string;
  contentBlocks?: ContentBlock[]; // Flexible content structure
}

export type HeadingBlock = {
  type: 'heading';
  level: 2 | 3 | 4 | 5 | 6;
  text: string;
};

export type ParagraphBlock = {
  type: 'paragraph';
  text: string;
};

export type ImageBlock = {
  type: 'image';
  src: string;
  alt?: string;
  caption?: string;
};

export type SlideshowBlock = {
  type: 'slideshow';
  images: Array<{ src: string; caption?: string }>;
};

export type LinkListItem = {
  url: string;
  title: string;
  iconClass?: string;
};

export type LinkListBlock = {
  type: 'linkList';
  links: LinkListItem[];
};

export type VideoBlock = {
  type: 'video';
  videoUrl: string;
  title?: string;
};

export type GooglePhotosAlbumBlock = {
  type: 'googlePhotosAlbum';
  albumUrl: string;
};

// Union type for all possible content blocks
export type ContentBlock = 
  | HeadingBlock 
  | ParagraphBlock 
  | ImageBlock 
  | SlideshowBlock 
  | LinkListBlock
  | VideoBlock
  | GooglePhotosAlbumBlock; 