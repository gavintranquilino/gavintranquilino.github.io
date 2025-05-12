import React, { useState } from 'react';
import { homepageContent as originalContent } from '../homepageData';
import type { HomepageContent } from '../homepageData';
import styles from './ProjectEditor.module.css'; // Reusing the same styles

const HomePageEditor: React.FC = () => {
  const [content, setContent] = useState<HomepageContent>({ ...originalContent });

  // Helper for updating nested objects
  const handleUpdate = (
    section: keyof HomepageContent,
    field: string,
    value: any
  ) => {
    setContent({
      ...content,
      [section]: {
        ...content[section],
        [field]: value
      }
    });
  };

  // Helper for updating paragraphs
  const handleParagraphUpdate = (index: number, value: string) => {
    const newParagraphs = [...content.aboutSection.bodyParagraphs];
    newParagraphs[index] = value;
    setContent({
      ...content,
      aboutSection: {
        ...content.aboutSection,
        bodyParagraphs: newParagraphs
      }
    });
  };

  // Helper for updating buttons
  const handleButtonUpdate = (index: number, field: string, value: any) => {
    const newButtons = [...content.aboutSection.buttons];
    newButtons[index] = {
      ...newButtons[index],
      [field]: value
    };
    setContent({
      ...content,
      aboutSection: {
        ...content.aboutSection,
        buttons: newButtons
      }
    });
  };

  // Export the updated content as a TypeScript file
  const exportHomePageContent = () => {
    // Create the TypeScript content
    const fileContent = `// Homepage content that can be edited through the admin interface

export interface HomepageContent {
  introSection: {
    title: string;
    subtitle: string;
    imageUrl: string;
  };
  aboutSection: {
    title: string;
    subtitle: string;
    bodyParagraphs: string[];
    imageUrl: string;
    buttons: Array<{
      text: string;
      url: string;
      isExternal: boolean;
    }>;
  };
  workSection: {
    title: string;
    subtitle: string;
  };
}

// Default content that matches the current homepage
export const homepageContent: HomepageContent = ${JSON.stringify(content, null, 2)};`;
    
    // Create a blob and download it
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'homepageData.ts';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  return (
    <div className={styles.editorContainer}>
      <h2>Edit Homepage Content</h2>
      
      {/* Intro Section */}
      <div className={styles.formGroup}>
        <h3>Intro Section</h3>
        <div className={styles.field}>
          <label htmlFor="intro-title">Title:</label>
          <input
            id="intro-title"
            type="text"
            value={content.introSection.title}
            onChange={(e) => handleUpdate('introSection', 'title', e.target.value)}
            className={styles.textInput}
          />
          <p className={styles.fieldHelp}>
            You can use HTML tags like &lt;strong&gt; for styling
          </p>
        </div>
        
        <div className={styles.field}>
          <label htmlFor="intro-subtitle">Subtitle:</label>
          <input
            id="intro-subtitle"
            type="text"
            value={content.introSection.subtitle}
            onChange={(e) => handleUpdate('introSection', 'subtitle', e.target.value)}
            className={styles.textInput}
          />
        </div>
        
        <div className={styles.field}>
          <label htmlFor="intro-image">Image URL:</label>
          <input
            id="intro-image"
            type="text"
            value={content.introSection.imageUrl}
            onChange={(e) => handleUpdate('introSection', 'imageUrl', e.target.value)}
            className={styles.textInput}
          />
        </div>
      </div>
      
      {/* About Section */}
      <div className={styles.formGroup}>
        <h3>About Section</h3>
        <div className={styles.field}>
          <label htmlFor="about-title">Title:</label>
          <input
            id="about-title"
            type="text"
            value={content.aboutSection.title}
            onChange={(e) => handleUpdate('aboutSection', 'title', e.target.value)}
            className={styles.textInput}
          />
        </div>
        
        <div className={styles.field}>
          <label htmlFor="about-subtitle">Subtitle:</label>
          <input
            id="about-subtitle"
            type="text"
            value={content.aboutSection.subtitle}
            onChange={(e) => handleUpdate('aboutSection', 'subtitle', e.target.value)}
            className={styles.textInput}
          />
        </div>
        
        <div className={styles.field}>
          <label>Paragraphs:</label>
          {content.aboutSection.bodyParagraphs.map((paragraph, index) => (
            <div key={index} className={styles.field}>
              <label htmlFor={`paragraph-${index}`}>Paragraph {index + 1}:</label>
              <textarea
                id={`paragraph-${index}`}
                value={paragraph}
                onChange={(e) => handleParagraphUpdate(index, e.target.value)}
                className={styles.textInput}
                rows={4}
              />
            </div>
          ))}
          <button
            onClick={() => {
              const newParagraphs = [...content.aboutSection.bodyParagraphs, ''];
              handleUpdate('aboutSection', 'bodyParagraphs', newParagraphs);
            }}
            className={styles.addButton}
          >
            Add Paragraph
          </button>
        </div>
        
        <div className={styles.field}>
          <label htmlFor="about-image">Image URL:</label>
          <input
            id="about-image"
            type="text"
            value={content.aboutSection.imageUrl}
            onChange={(e) => handleUpdate('aboutSection', 'imageUrl', e.target.value)}
            className={styles.textInput}
          />
        </div>
        
        <div className={styles.field}>
          <label>Buttons:</label>
          {content.aboutSection.buttons.map((button, index) => (
            <div key={index} className={styles.contentBlock}>
              <h4>Button {index + 1}</h4>
              <div className={styles.field}>
                <label htmlFor={`button-text-${index}`}>Text:</label>
                <input
                  id={`button-text-${index}`}
                  type="text"
                  value={button.text}
                  onChange={(e) => handleButtonUpdate(index, 'text', e.target.value)}
                  className={styles.textInput}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor={`button-url-${index}`}>URL:</label>
                <input
                  id={`button-url-${index}`}
                  type="text"
                  value={button.url}
                  onChange={(e) => handleButtonUpdate(index, 'url', e.target.value)}
                  className={styles.textInput}
                />
              </div>
              <div className={styles.field}>
                <label>
                  <input
                    type="checkbox"
                    checked={button.isExternal}
                    onChange={(e) => handleButtonUpdate(index, 'isExternal', e.target.checked)}
                  />
                  Opens in new tab (external link)
                </label>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const newButtons = [
                ...content.aboutSection.buttons,
                { text: 'New Button', url: '#', isExternal: false }
              ];
              handleUpdate('aboutSection', 'buttons', newButtons);
            }}
            className={styles.addButton}
          >
            Add Button
          </button>
        </div>
      </div>
      
      {/* Work Section */}
      <div className={styles.formGroup}>
        <h3>Work Section</h3>
        <div className={styles.field}>
          <label htmlFor="work-title">Title:</label>
          <input
            id="work-title"
            type="text"
            value={content.workSection.title}
            onChange={(e) => handleUpdate('workSection', 'title', e.target.value)}
            className={styles.textInput}
          />
        </div>
        
        <div className={styles.field}>
          <label htmlFor="work-subtitle">Subtitle:</label>
          <input
            id="work-subtitle"
            type="text"
            value={content.workSection.subtitle}
            onChange={(e) => handleUpdate('workSection', 'subtitle', e.target.value)}
            className={styles.textInput}
          />
        </div>
      </div>
      
      <div className={styles.exportSection}>
        <h3>Export Homepage Content</h3>
        <p>
          After making your changes, export the updated homepageData.ts file.
          Replace your existing file with this one to update your homepage.
        </p>
        <button onClick={exportHomePageContent} className={styles.exportButton}>
          Export homepageData.ts
        </button>
      </div>
    </div>
  );
};

export default HomePageEditor; 