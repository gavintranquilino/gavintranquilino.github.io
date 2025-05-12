import React from 'react';
import type { Project, ContentBlock, HeadingBlock } from '../types';
import styles from './ProjectPreview.module.css';

interface ProjectPreviewProps {
  project: Project;
  activeBlockIndex: number | null;
  onBlockClick: (index: number) => void;
  onUpdateBlock: (index: number, block: ContentBlock) => void;
  onDeleteBlock: (index: number) => void;
  onMoveBlock: (index: number, direction: 'up' | 'down') => void;
  onAddBlock: (type: ContentBlock['type'], afterIndex: number) => void;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({
  project,
  activeBlockIndex,
  onBlockClick,
  onUpdateBlock,
  onDeleteBlock,
  onMoveBlock,
  onAddBlock
}) => {
  const renderBlock = (block: ContentBlock, index: number) => {
    const isActive = activeBlockIndex === index;
    
    const blockControls = (
      <div className={styles.blockControls}>
        <button 
          className={styles.moveUpButton} 
          onClick={(e) => { e.stopPropagation(); onMoveBlock(index, 'up'); }}
          disabled={index === 0}
          title="Move Up"
        >
          ↑
        </button>
        <button 
          className={styles.moveDownButton}
          onClick={(e) => { e.stopPropagation(); onMoveBlock(index, 'down'); }}
          disabled={!project.contentBlocks || index === project.contentBlocks.length - 1}
          title="Move Down"
        >
          ↓
        </button>
        <button 
          className={styles.deleteButton}
          onClick={(e) => { e.stopPropagation(); onDeleteBlock(index); }}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    );

    const addBlockButton = (
      <div className={styles.addBlockButtonContainer}>
        <button 
          className={styles.addBlockButton}
          onClick={(e) => {
            e.stopPropagation();
            const dropdown = document.getElementById(`preview-add-block-${index}`);
            if (dropdown) {
              dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
            }
          }}
        >
          + Add Block
        </button>
        <div id={`preview-add-block-${index}`} className={styles.addBlockDropdown}>
          <button onClick={(e) => { e.stopPropagation(); onAddBlock('heading', index); }}>Heading</button>
          <button onClick={(e) => { e.stopPropagation(); onAddBlock('paragraph', index); }}>Paragraph</button>
          <button onClick={(e) => { e.stopPropagation(); onAddBlock('image', index); }}>Image</button>
          <button onClick={(e) => { e.stopPropagation(); onAddBlock('slideshow', index); }}>Slideshow</button>
          <button onClick={(e) => { e.stopPropagation(); onAddBlock('linkList', index); }}>Link List</button>
          <button onClick={(e) => { e.stopPropagation(); onAddBlock('video', index); }}>Video</button>
          <button onClick={(e) => { e.stopPropagation(); onAddBlock('googlePhotosAlbum', index); }}>Google Photos Album</button>
        </div>
      </div>
    );

    switch (block.type) {
      case 'heading': {
        const headingBlock = block as HeadingBlock;
        const level = headingBlock.level;
        return (
          <div 
            key={index}
            className={`${styles.previewBlock} ${isActive ? styles.activeBlock : ''}`}
            onClick={() => onBlockClick(index)}
          >
            {level === 2 && <h2 className={styles.heading}>{headingBlock.text}</h2>}
            {level === 3 && <h3 className={styles.heading}>{headingBlock.text}</h3>}
            {level === 4 && <h4 className={styles.heading}>{headingBlock.text}</h4>}
            {level === 5 && <h5 className={styles.heading}>{headingBlock.text}</h5>}
            {level === 6 && <h6 className={styles.heading}>{headingBlock.text}</h6>}
            {blockControls}
            {addBlockButton}
          </div>
        );
      }
      case 'paragraph':
        return (
          <div 
            key={index}
            className={`${styles.previewBlock} ${isActive ? styles.activeBlock : ''}`}
            onClick={() => onBlockClick(index)}
          >
            <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: block.text }} />
            {blockControls}
            {addBlockButton}
          </div>
        );
        
      case 'image':
        return (
          <div 
            key={index}
            className={`${styles.previewBlock} ${isActive ? styles.activeBlock : ''}`}
            onClick={() => onBlockClick(index)}
          >
            <figure className={styles.imageContainer}>
              <img 
                src={block.src}
                alt={block.alt || ''} 
                className={styles.image}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
              />
              {block.caption && <figcaption className={styles.imageCaption}>{block.caption}</figcaption>}
            </figure>
            {blockControls}
            {addBlockButton}
          </div>
        );
        
      case 'slideshow':
        return (
          <div 
            key={index}
            className={`${styles.previewBlock} ${isActive ? styles.activeBlock : ''}`}
            onClick={() => onBlockClick(index)}
          >
            <div className={styles.slideshow}>
              {block.images.length > 0 ? (
                <div className={styles.slideshowPreview}>
                  <img 
                    src={block.images[0].src}
                    alt={block.images[0].caption || 'Slideshow preview'} 
                    className={styles.slideshowImage}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x300?text=Slideshow+Preview';
                    }}
                  />
                  {block.images.length > 1 && (
                    <div className={styles.slideshowInfo}>
                      +{block.images.length - 1} more images
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.slideshowEmpty}>
                  Empty slideshow - add images in editor
                </div>
              )}
            </div>
            {blockControls}
            {addBlockButton}
          </div>
        );
        
      case 'linkList':
        return (
          <div 
            key={index}
            className={`${styles.previewBlock} ${isActive ? styles.activeBlock : ''}`}
            onClick={() => onBlockClick(index)}
          >
            <div className={styles.linkList}>
              {block.links.map((link, linkIndex) => (
                <div key={linkIndex} className={styles.linkItem}>
                  {link.iconClass && <i className={`${link.iconClass} ${styles.linkIcon}`}></i>}
                  <span className={styles.linkTitle}>{link.title || link.url}</span>
                </div>
              ))}
            </div>
            {blockControls}
            {addBlockButton}
          </div>
        );
        
      case 'video':
        return (
          <div 
            key={index}
            className={`${styles.previewBlock} ${isActive ? styles.activeBlock : ''}`}
            onClick={() => onBlockClick(index)}
          >
            <div className={styles.videoContainer}>
              <div className={styles.videoPreview}>
                <span className={styles.videoPlaceholder}>
                  <i className="fas fa-video"></i> Video Embed: {block.title || block.videoUrl}
                </span>
              </div>
            </div>
            {blockControls}
            {addBlockButton}
          </div>
        );
        
      case 'googlePhotosAlbum':
        return (
          <div 
            key={index}
            className={`${styles.previewBlock} ${isActive ? styles.activeBlock : ''}`}
            onClick={() => onBlockClick(index)}
          >
            <div className={styles.googlePhotosContainer}>
              <div className={styles.googlePhotosPreview}>
                <span className={styles.googlePhotosPlaceholder}>
                  <i className="fas fa-images"></i> Google Photos Album: {block.albumUrl}
                </span>
              </div>
            </div>
            {blockControls}
            {addBlockButton}
          </div>
        );
        
      default:
        return (
          <div 
            key={index}
            className={`${styles.previewBlock} ${styles.unknownBlock} ${isActive ? styles.activeBlock : ''}`}
            onClick={() => onBlockClick(index)}
          >
            Unknown block type: {(block as any).type}
            {blockControls}
            {addBlockButton}
          </div>
        );
    }
  };

  const renderAddBlockForEmptyProject = () => {
    return (
      <div className={styles.emptyProjectButtons}>
        <h3>Add your first content block:</h3>
        <div className={styles.emptyProjectButtonsGrid}>
          <button onClick={() => onAddBlock('heading', -1)}>Heading</button>
          <button onClick={() => onAddBlock('paragraph', -1)}>Paragraph</button>
          <button onClick={() => onAddBlock('image', -1)}>Image</button>
          <button onClick={() => onAddBlock('slideshow', -1)}>Slideshow</button>
          <button onClick={() => onAddBlock('linkList', -1)}>Link List</button>
          <button onClick={() => onAddBlock('video', -1)}>Video</button>
          <button onClick={() => onAddBlock('googlePhotosAlbum', -1)}>Google Photos Album</button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewHeader}>
        <h1 
          className={styles.previewTitle}
          style={{ whiteSpace: 'pre-line' }}
        >
          {project.title || 'Project Title'}
        </h1>
        {project.subtitle && (
          <p className={styles.previewSubtitle}>{project.subtitle}</p>
        )}
        {project.imageUrl && (
          <div className={styles.previewImage}>
            <img 
              src={project.imageUrl}
              alt={project.title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/800x400?text=Project+Image';
              }}
            />
          </div>
        )}
      </div>
      
      <div className={styles.previewContent}>
        {project.contentBlocks && project.contentBlocks.length > 0 ? (
          project.contentBlocks.map((block, index) => renderBlock(block, index))
        ) : (
          renderAddBlockForEmptyProject()
        )}
      </div>
    </div>
  );
};

export default ProjectPreview; 