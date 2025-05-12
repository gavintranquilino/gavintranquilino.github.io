import React, { useState, useRef } from 'react';
import type { ContentBlock } from '../types';
import styles from './ContentBlockEditor.module.css';

interface ContentBlockEditorProps {
  block: ContentBlock;
  onUpdateBlock: (updatedBlock: ContentBlock) => void;
  onDeleteBlock: () => void;
}

// Helper component for linkList items
const LinkEditor: React.FC<{
  link: { url: string; title: string; iconClass?: string };
  onChange: (updatedLink: { url: string; title: string; iconClass?: string }) => void;
  onDelete: () => void;
}> = ({ link, onChange, onDelete }) => {
  return (
    <div className={styles.linkItem}>
      <div className={styles.linkFields}>
        <div className={styles.field}>
          <label>URL:</label>
          <input
            type="text"
            value={link.url}
            onChange={(e) => onChange({ ...link, url: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label>Title:</label>
          <input
            type="text"
            value={link.title}
            onChange={(e) => onChange({ ...link, title: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label>Icon Class (optional):</label>
          <input
            type="text"
            value={link.iconClass || ''}
            onChange={(e) => onChange({ ...link, iconClass: e.target.value })}
            placeholder="e.g. fab fa-github"
          />
        </div>
      </div>
      <button className={styles.deleteButton} onClick={onDelete}>
        🗑️
      </button>
    </div>
  );
};

// Helper component for slideshow images - simplified without drag and drop
const SlideEditor: React.FC<{
  image: { src: string; caption?: string };
  index: number;
  onChange: (updatedImage: { src: string; caption?: string }) => void;
  onDelete: () => void;
  onMove: (direction: 'left' | 'right') => void;
  isFirst: boolean;
  isLast: boolean;
}> = ({ 
  image, 
  index, 
  onChange, 
  onDelete, 
  onMove, 
  isFirst, 
  isLast 
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Set temporary preview URL for the user to see
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Inform user they need to upload the file to a server/CDN
      alert('This image is only a local preview. You need to upload this image to your server and use the actual URL for production. Update the image URL field when ready.');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add(styles.dragOver);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove(styles.dragOver);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove(styles.dragOver);
    
    // Handle file drop
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        // Set temporary preview URL for the user to see
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        
        // Inform user they need to upload the file to a server/CDN
        alert('This image is only a local preview. You need to upload this image to your server and use the actual URL for production. Update the image URL field when ready.');
      }
    }
  };

  return (
    <div className={styles.slideItem}>
      <div className={styles.slidePreview}>
        {(previewUrl || image.src) && (
          <img 
            src={previewUrl || image.src} 
            alt={image.caption || 'Preview'} 
            className={styles.previewImage}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
            }}
          />
        )}
      </div>
      <div className={styles.slideFields}>
        <div className={styles.imageDragDrop}>
          <div 
            className={styles.dropZone} 
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <span>Drag image here or click to upload</span>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label>Image URL:</label>
          <input
            type="text"
            value={image.src}
            onChange={(e) => onChange({ ...image, src: e.target.value })}
            placeholder="e.g. /img/project-name/image.jpg"
          />
        </div>
        <div className={styles.field}>
          <label>Caption (optional):</label>
          <input
            type="text"
            value={image.caption || ''}
            onChange={(e) => onChange({ ...image, caption: e.target.value })}
          />
        </div>
      </div>
      <div className={styles.slideActions}>
        <button 
          className={`${styles.moveButton} ${isFirst ? styles.disabled : ''}`}
          onClick={() => onMove('left')}
          disabled={isFirst}
          title="Move left"
        >
          ←
        </button>
        <button 
          className={`${styles.moveButton} ${isLast ? styles.disabled : ''}`}
          onClick={() => onMove('right')}
          disabled={isLast}
          title="Move right"
        >
          →
        </button>
        <button className={styles.deleteButton} onClick={onDelete} title="Delete slide">
          🗑️
        </button>
      </div>
    </div>
  );
};

const ContentBlockEditor: React.FC<ContentBlockEditorProps> = ({ block, onUpdateBlock, onDeleteBlock }) => {
  // Render different editors based on block type
  switch (block.type) {
    case 'heading':
      return (
        <div className={styles.blockEditor}>
          <div className={styles.field}>
            <label>Level:</label>
            <select
              value={block.level}
              onChange={(e) => onUpdateBlock({
                ...block,
                level: parseInt(e.target.value) as 2 | 3 | 4 | 5 | 6
              })}
            >
              <option value={2}>Heading 2</option>
              <option value={3}>Heading 3</option>
              <option value={4}>Heading 4</option>
              <option value={5}>Heading 5</option>
              <option value={6}>Heading 6</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Text:</label>
            <input
              type="text"
              value={block.text}
              onChange={(e) => onUpdateBlock({ ...block, text: e.target.value })}
            />
          </div>
        </div>
      );
      
    case 'paragraph':
      return (
        <div className={styles.blockEditor}>
          <div className={styles.field}>
            <label>Text:</label>
            <textarea
              rows={4}
              value={block.text}
              onChange={(e) => onUpdateBlock({ ...block, text: e.target.value })}
            />
          </div>
        </div>
      );
      
    case 'image':
      const [previewUrl, setPreviewUrl] = useState<string | null>(null);
      const fileInputRef = useRef<HTMLInputElement>(null);

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          // Set temporary preview URL for the user to see
          const url = URL.createObjectURL(file);
          setPreviewUrl(url);
          
          // Inform user they need to upload the file to a server/CDN
          alert('This image is only a local preview. You need to upload this image to your server and use the actual URL for production. Update the image URL field when ready.');
        }
      };

      const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add(styles.dragOver);
      };

      const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove(styles.dragOver);
      };

      const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove(styles.dragOver);
        
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (file.type.startsWith('image/')) {
            // Set temporary preview URL for the user to see
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            
            // Inform user they need to upload the file to a server/CDN
            alert('This image is only a local preview. You need to upload this image to your server and use the actual URL for production. Update the image URL field when ready.');
          }
        }
      };

      return (
        <div className={styles.blockEditor}>
          <div className={styles.imagePreviewContainer}>
            {(previewUrl || block.src) && (
              <img 
                src={previewUrl || block.src} 
                alt={block.alt || 'Preview'} 
                className={styles.previewImage}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                }}
              />
            )}
            <div className={styles.imageDragDrop}>
              <div 
                className={styles.dropZone} 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <span>Drag image here or click to upload</span>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
          <div className={styles.field}>
            <label>Image URL:</label>
            <input
              type="text"
              value={block.src}
              onChange={(e) => onUpdateBlock({ ...block, src: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label>Alt Text:</label>
            <input
              type="text"
              value={block.alt || ''}
              onChange={(e) => onUpdateBlock({ ...block, alt: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label>Caption (optional):</label>
            <input
              type="text"
              value={block.caption || ''}
              onChange={(e) => onUpdateBlock({ ...block, caption: e.target.value })}
            />
          </div>
        </div>
      );
      
    case 'slideshow':
      return (
        <div className={styles.blockEditor}>
          <div className={styles.slideshowContainer}>
            <h4 className={styles.slideshowHeading}>
              Slides <small>(use arrows to reorder)</small>
            </h4>
            <div className={styles.slideList}>
              {block.images.map((image, index) => (
                <SlideEditor
                  key={index}
                  index={index}
                  image={image}
                  onChange={(updatedImage) => {
                    const updatedImages = [...block.images];
                    updatedImages[index] = updatedImage;
                    onUpdateBlock({ ...block, images: updatedImages });
                  }}
                  onDelete={() => {
                    const updatedImages = [...block.images];
                    updatedImages.splice(index, 1);
                    onUpdateBlock({ ...block, images: updatedImages });
                  }}
                  onMove={(direction) => {
                    const updatedImages = [...block.images];
                    if (direction === 'left' && index > 0) {
                      [updatedImages[index], updatedImages[index - 1]] = [updatedImages[index - 1], updatedImages[index]];
                    } else if (direction === 'right' && index < updatedImages.length - 1) {
                      [updatedImages[index], updatedImages[index + 1]] = [updatedImages[index + 1], updatedImages[index]];
                    }
                    onUpdateBlock({ ...block, images: updatedImages });
                  }}
                  isFirst={index === 0}
                  isLast={index === block.images.length - 1}
                />
              ))}
            </div>
            <button
              className={styles.addButton}
              onClick={() => {
                onUpdateBlock({
                  ...block,
                  images: [...block.images, { src: '', caption: '' }]
                });
              }}
            >
              Add Slide
            </button>
          </div>
        </div>
      );
      
    case 'linkList':
      return (
        <div className={styles.blockEditor}>
          <div className={styles.linkList}>
            {block.links.map((link, index) => (
              <LinkEditor
                key={index}
                link={link}
                onChange={(updatedLink) => {
                  const updatedLinks = [...block.links];
                  updatedLinks[index] = updatedLink;
                  onUpdateBlock({ ...block, links: updatedLinks });
                }}
                onDelete={() => {
                  const updatedLinks = [...block.links];
                  updatedLinks.splice(index, 1);
                  onUpdateBlock({ ...block, links: updatedLinks });
                }}
              />
            ))}
          </div>
          <button
            className={styles.addButton}
            onClick={() => {
              onUpdateBlock({
                ...block,
                links: [...block.links, { url: '', title: '', iconClass: 'fas fa-link' }]
              });
            }}
          >
            Add Link
          </button>
        </div>
      );
      
    case 'video':
      return (
        <div className={styles.blockEditor}>
          <div className={styles.field}>
            <label>Video URL:</label>
            <input
              type="text"
              value={block.videoUrl}
              onChange={(e) => onUpdateBlock({ ...block, videoUrl: e.target.value })}
            />
            <p className={styles.fieldHelp}>
              YouTube embed URL format: https://www.youtube.com/embed/VIDEO_ID
            </p>
          </div>
          <div className={styles.field}>
            <label>Title (optional):</label>
            <input
              type="text"
              value={block.title || ''}
              onChange={(e) => onUpdateBlock({ ...block, title: e.target.value })}
            />
          </div>
        </div>
      );
      
    case 'googlePhotosAlbum':
      return (
        <div className={styles.blockEditor}>
          <div className={styles.field}>
            <label>Google Photos Album URL:</label>
            <input
              type="text"
              value={block.albumUrl}
              onChange={(e) => onUpdateBlock({ ...block, albumUrl: e.target.value })}
            />
            <p className={styles.fieldHelp}>
              Example: https://photos.app.goo.gl/abcdefghijklmnop
            </p>
          </div>
        </div>
      );
      
    default:
      return (
        <div className={styles.blockEditor}>
          <p>Unknown block type: {(block as any).type}</p>
        </div>
      );
  }
};

export default ContentBlockEditor; 