import React from 'react';

interface GooglePhotosAlbumProps {
  albumUrl: string;
}

const GooglePhotosAlbum: React.FC<GooglePhotosAlbumProps> = ({ albumUrl }) => {
  return (
    <div className="google-photos-album" style={{ margin: '2em 0', textAlign: 'center' }}>
      <a
        href={albumUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-block', position: 'relative' }}
      >
        <img
          src="/img/ideas-clinic/crutch.jpg"
          alt="Instrumented Knee Crutch"
          style={{
            maxWidth: '100%',
            borderRadius: 'var(--border-rad)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '0',
            right: '0',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '12px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          View Full Album
        </div>
      </a>
      <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
        Click the image to view the complete Google Photos album
      </p>
    </div>
  );
};

export default GooglePhotosAlbum; 