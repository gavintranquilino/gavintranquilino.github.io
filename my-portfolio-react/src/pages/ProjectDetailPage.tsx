import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectPageLayout from '../layouts/ProjectPageLayout';
import { projects } from '../projectData'; // Import main data source
import GooglePhotosAlbum from '../components/GooglePhotosAlbum';
// Import types from types.ts instead of projectData.ts
import type { 
  Project, 
  ContentBlock,
  SlideshowBlock,
  LinkListItem
} from '../types';

// The ProjectDataInterface from projectData.ts should be sufficient now
// interface DetailedProject extends ProjectDataInterface {
//   // Potentially page-specific, non-content fields can go here in the future
// }

// New InteractiveSlideshow Component
interface InteractiveSlideshowProps {
  images: SlideshowBlock['images'];
  blockKey: string;
}

const InteractiveSlideshow: React.FC<InteractiveSlideshowProps> = ({ images, blockKey }) => {
  if (!images || images.length === 0) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPrevHovered, setIsPrevHovered] = useState(false);
  const [isNextHovered, setIsNextHovered] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains('dark-theme'));
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setIsDarkMode(document.body.classList.contains('dark-theme'));
        }
      }
    });
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  // Determine caption colors based on isDarkMode state
  const captionBgColor = isDarkMode ? 'rgb(38, 43, 47)' : 'rgb(255, 255, 255)';
  const captionTextColor = isDarkMode ? '#fffaed' : '#303030';

  if (images.length === 1) {
    const image = images[0];
    return (
      <div key={blockKey} className="slideshow-container" style={{ marginBottom: '1em', textAlign: 'center' }}>
        <div className="individual-slide" style={{ display: 'inline-block' }}>
          <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label="View full image">
            <img 
              src={image.src} 
              alt={image.caption || 'Slideshow image'} 
              style={{ display: 'block', maxWidth: '100%', height: 'auto', borderRadius: 'var(--border-rad)', cursor: 'pointer' }} 
              loading="lazy"
            />
          </a>
          {image.caption && (
            <p 
              style={{
                textAlign: 'center', 
                position: 'relative',
                fontWeight: 'bold',
                backgroundColor: captionBgColor,
                color: captionTextColor,
                padding: '0.25em 0.5em',
                borderRadius: '5px',
                marginTop: '0.5em',
                display: 'inline-block',
                fontSize: 'var(--fs-h3)'
              }}
            >
              {image.caption}
            </p>
          )}
        </div>
      </div>
    );
  }

  const currentImage = images[currentIndex];
  const baseArrowBgColor = isDarkMode ? 'rgba(255, 250, 237, 0.3)' : 'rgba(48, 48, 48, 0.3)';
  const hoverArrowBgColorOpaque = isDarkMode ? '#fffaed' : '#303030';

  const prevArrowStyle: React.CSSProperties = {
    position: 'static' as React.CSSProperties['position'],
    zIndex: 1,
    display: 'inline-block',
    backgroundColor: isPrevHovered ? hoverArrowBgColorOpaque : baseArrowBgColor,
    cursor: 'pointer'
  };

  const nextArrowStyle: React.CSSProperties = {
    position: 'static' as React.CSSProperties['position'],
    zIndex: 1,
    display: 'inline-block',
    backgroundColor: isNextHovered ? hoverArrowBgColorOpaque : baseArrowBgColor,
    cursor: 'pointer'
  };

  return (
    <div key={blockKey} className="slideshow-container" style={{ marginBottom: '1em', textAlign: 'center' }}>
      <div
        className="fade"
        style={{
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
        }}
      >
        <a 
          href={currentImage.src} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label={`View full image for ${currentImage.caption || 'slide ' + (currentIndex + 1)}`}
          style={{ display: 'block' }} // Ensure the anchor wraps the image correctly
        >
          <img
            src={currentImage.src}
            alt={currentImage.caption || `Slide ${currentIndex + 1}`}
            style={{
              display: 'block',
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 'var(--border-rad)',
              cursor: 'pointer' // Add pointer cursor to image as well
            }}
            loading="lazy"
          />
        </a>
        {/* Previous Arrow Button */}
        <a 
          onClick={goToPrevious} 
          aria-label="Previous slide"
          style={{
            position: 'absolute',
            top: '50%',
            left: '0px',
            transform: 'translateY(-50%)',
            zIndex: 2,
            textDecoration: 'none',
            WebkitTapHighlightColor: 'transparent',
          }}
          onMouseEnter={() => setIsPrevHovered(true)}
          onMouseLeave={() => setIsPrevHovered(false)}
        >
          <span className="prev" style={prevArrowStyle}>&#10094;</span>
        </a>

        {/* Next Arrow Button */}
        <a 
          onClick={goToNext} 
          aria-label="Next slide"
          style={{
            position: 'absolute',
            top: '50%',
            right: '0px',
            transform: 'translateY(-50%)',
            zIndex: 2,
            textDecoration: 'none',
            WebkitTapHighlightColor: 'transparent',
          }}
          onMouseEnter={() => setIsNextHovered(true)}
          onMouseLeave={() => setIsNextHovered(false)}
        >
          <span className="next" style={nextArrowStyle}>&#10095;</span>
        </a>

        {/* Caption */}
        {currentImage.caption && (
          <p
            style={{
              position: 'absolute',
              bottom: '15px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'auto',
              maxWidth: 'calc(100% - 40px)',
              display: 'inline-block',
              padding: '0.25em 0.5em',
              borderRadius: '5px',
              backgroundColor: captionBgColor,
              color: captionTextColor,
              fontWeight: 'bold',
              zIndex: 1,
              textAlign: 'center',
              fontSize: 'var(--fs-h3)'
            }}
          >
            {currentImage.caption}
          </p>
        )}
      </div>
      {/* Dots Navigation */}
      {images.length > 1 && (
        <div style={{ textAlign: 'center', marginTop: '1em' }}>
          {images.map((_, slideIndex: number) => (
            <span
              key={slideIndex}
              className={`dot ${currentIndex === slideIndex ? 'active' : ''}`}
              onClick={() => goToSlide(slideIndex)}
              style={{cursor: 'pointer'}}
              aria-label={`Go to slide ${slideIndex + 1}`}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  // Handle /guhbot specially - this should redirect to static page
  useEffect(() => {
    if (projectId === 'guhbot') {
      // This would only execute if somehow the route was matched despite our App.tsx route config
      // Just to be extra sure, we'll redirect to the static page
      window.location.href = '/guhbot/';
    }
  }, [projectId]);
  
  // If we're on the guhbot page, don't proceed with rendering
  if (projectId === 'guhbot') {
    return null;
  }
  
  // Use Project type from types.ts
  const project = projects.find(p => p.id === projectId) as Project | undefined;

  // Handle loading of scripts from embedded HTML content
  useEffect(() => {
    // Find any script tags in the HTML content
    const scriptElements = document.querySelectorAll('script[src^="https://cdn.jsdelivr.net"]');
    
    // Create script elements for each source that isn't already loaded
    const loadedScripts = Array.from(document.querySelectorAll('script')).map(script => script.src);
    
    scriptElements.forEach(element => {
      const src = element.getAttribute('src');
      if (src && !loadedScripts.includes(src)) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
      }
    });
    
    // Cleanup function
    return () => {
      // Optionally remove scripts when component unmounts
    };
  }, [projectId]);

  if (!project) {
    return (
      <ProjectPageLayout title="Uh oh!" subtitle="Page not found" introImageUrl="/img/sad-face.svg">
        <p>The project you\'re looking for doesn\'t seem to exist. Maybe it was moved or the link is incorrect.</p>
        <p><a href="/">Go back to homepage</a></p>
      </ProjectPageLayout>
    );
  }

  const introImageUrl = project.imageUrl;

  const renderContentBlock = (block: ContentBlock, index: number) => {
    const blockKey = `block-${index}`;
    switch (block.type) {
      case 'heading':
        // Correct way to render dynamic heading tags in React/JSX
        const TagName = `h${block.level}` as React.ElementType; // More generic type for HTML elements
        return <TagName key={blockKey}>{block.text}</TagName>;
      case 'paragraph':
        return (
          <p 
            key={blockKey} 
            dangerouslySetInnerHTML={{ __html: block.text }}
          ></p>
        );
      case 'image':
        return (
          <div key={blockKey} style={{ textAlign: 'center', marginBottom: '1em' }}>
            <a href={block.src} target="_blank" rel="noopener noreferrer">
                <img 
                  src={block.src} 
                  alt={block.alt || block.caption || 'Project image'} 
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--border-rad)' }} 
                  loading="lazy" 
                />
            </a>
            {block.caption && <p className="text">{block.caption}</p>}
          </div>
        );
      case 'slideshow':
        // Use the new InteractiveSlideshow component
        return <InteractiveSlideshow images={block.images} blockKey={blockKey} />;
      case 'linkList':
        return (
          <div key={blockKey} style={{ marginTop: '1.5em', marginBottom: '1.5em' }}>
            {block.links.map((link: LinkListItem, linkIndex: number) => (
              <p key={`link-${index}-${linkIndex}`} style={{ marginBottom: '0.5em' }}>
                <a href={link.url} className="custom-link" target="_blank" rel="noopener noreferrer" title={link.title}>
                  {link.iconClass && <i className={`${link.iconClass} github-icon`}></i>}
                  <span> {link.title}</span>
                </a>
              </p>
            ))}
          </div>
        );
      case 'video':
        return (
          <div key={blockKey} style={{ margin: '2em 0'}}>
            <iframe
              width="560"
              height="315"
              src={block.videoUrl}
              title={block.title || 'Project Video'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ borderRadius: 'var(--border-rad)', maxWidth: '100%' }}
            ></iframe>
          </div>
        );
      case 'googlePhotosAlbum':
        return <GooglePhotosAlbum key={blockKey} albumUrl={block.albumUrl} />;
      default:
        // This will help ensure all cases are handled, TypeScript will error if a new type is added to ContentBlock and not handled here.
        // const _exhaustiveCheck: never = block;
        // console.warn("Unsupported content block type:", block);
        return null; 
    }
  };

  return (
    <ProjectPageLayout
      title={project.title}
      subtitle={project.subtitle || ''} 
      introImageUrl={introImageUrl}
    >
      {project.contentBlocks && project.contentBlocks.length > 0 ? (
        project.contentBlocks.map((block: ContentBlock, index: number) => renderContentBlock(block, index))
      ) : (
        <p>This project does not have detailed content yet.</p>
      )}
    </ProjectPageLayout>
  );
};

export default ProjectDetailPage; 