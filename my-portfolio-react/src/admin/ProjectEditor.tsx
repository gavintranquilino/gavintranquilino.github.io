import React, { useState } from 'react';
import { projects as originalProjects } from '../projectData';
import type { Project, ContentBlock } from '../types';
import ContentBlockEditor from './ContentBlockEditor';
import styles from './ProjectEditor.module.css';

// Basic template for new projects
const projectTemplate: Project = {
  id: '',
  title: '',
  imageUrl: '',
  subtitle: '',
  contentBlocks: [
    { type: 'heading', level: 2, text: 'Overview' },
    { type: 'paragraph', text: 'Project description goes here...' },
  ]
};

const ProjectEditor: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([...originalProjects]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [editableProject, setEditableProject] = useState<Project | null>(null);

  // Handle selecting a project to edit
  const handleProjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedProjectId(selectedId);
    
    if (selectedId === 'new') {
      // Create a new project from template
      setEditableProject({
        ...projectTemplate,
        id: `project-${Date.now()}`, // Generate a unique ID
      });
    } else {
      // Find existing project
      const project = projects.find(p => p.id === selectedId);
      setEditableProject(project ? { ...project } : null);
    }
  };

  // Handle project field changes
  const handleProjectChange = (field: keyof Project, value: any) => {
    if (editableProject) {
      setEditableProject({
        ...editableProject,
        [field]: value
      });
    }
  };

  // Add a new content block
  const addContentBlock = (type: ContentBlock['type'], afterIndex?: number) => {
    if (!editableProject) return;
    
    let newBlock: ContentBlock;
    
    switch (type) {
      case 'heading':
        newBlock = { type: 'heading', level: 2, text: 'New Heading' };
        break;
      case 'paragraph':
        newBlock = { type: 'paragraph', text: 'New paragraph text...' };
        break;
      case 'image':
        newBlock = { type: 'image', src: '', alt: '' };
        break;
      case 'slideshow':
        newBlock = { type: 'slideshow', images: [{ src: '', caption: '' }] };
        break;
      case 'linkList':
        newBlock = { type: 'linkList', links: [{ url: '', title: '', iconClass: 'fas fa-link' }] };
        break;
      case 'video':
        newBlock = { type: 'video', videoUrl: '', title: '' };
        break;
      case 'googlePhotosAlbum':
        newBlock = { type: 'googlePhotosAlbum', albumUrl: '' };
        break;
      default:
        return;
    }
    
    const updatedBlocks = [...(editableProject.contentBlocks || [])];
    
    if (typeof afterIndex === 'number') {
      // Insert after the specified index
      updatedBlocks.splice(afterIndex + 1, 0, newBlock);
    } else {
      // Add to the end
      updatedBlocks.push(newBlock);
    }
    
    setEditableProject({
      ...editableProject,
      contentBlocks: updatedBlocks
    });
  };

  // Update a content block
  const updateContentBlock = (index: number, updatedBlock: ContentBlock) => {
    if (!editableProject || !editableProject.contentBlocks) return;
    
    const updatedBlocks = [...editableProject.contentBlocks];
    updatedBlocks[index] = updatedBlock;
    
    setEditableProject({
      ...editableProject,
      contentBlocks: updatedBlocks
    });
  };

  // Delete a content block
  const deleteContentBlock = (index: number) => {
    if (!editableProject || !editableProject.contentBlocks) return;
    
    const updatedBlocks = [...editableProject.contentBlocks];
    updatedBlocks.splice(index, 1);
    
    setEditableProject({
      ...editableProject,
      contentBlocks: updatedBlocks
    });
  };

  // Move a content block up or down
  const moveContentBlock = (index: number, direction: 'up' | 'down') => {
    if (!editableProject || !editableProject.contentBlocks) return;
    
    const updatedBlocks = [...editableProject.contentBlocks];
    
    if (direction === 'up' && index > 0) {
      [updatedBlocks[index], updatedBlocks[index - 1]] = [updatedBlocks[index - 1], updatedBlocks[index]];
    } else if (direction === 'down' && index < updatedBlocks.length - 1) {
      [updatedBlocks[index], updatedBlocks[index + 1]] = [updatedBlocks[index + 1], updatedBlocks[index]];
    }
    
    setEditableProject({
      ...editableProject,
      contentBlocks: updatedBlocks
    });
  };

  // Save the current project
  const saveProject = () => {
    if (!editableProject) return;
    
    const projectIndex = projects.findIndex(p => p.id === editableProject.id);
    
    let updatedProjects: Project[];
    if (projectIndex >= 0) {
      // Update existing project
      updatedProjects = [...projects];
      updatedProjects[projectIndex] = editableProject;
    } else {
      // Add new project
      updatedProjects = [...projects, editableProject];
    }
    
    setProjects(updatedProjects);
    alert('Project saved to working memory. Export to get the file.');
  };

  // Export all projects as a TypeScript file
  const exportProjectsFile = () => {
    // Create the TypeScript content
    const fileContent = `export interface Project {
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

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};
`;
    
    // Create a blob and download it
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projectData.ts';
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
      <div className={styles.projectSelector}>
        <label htmlFor="project-select">Select a project to edit:</label>
        <select 
          id="project-select"
          value={selectedProjectId} 
          onChange={handleProjectSelect}
          className={styles.select}
        >
          <option value="">-- Select a project --</option>
          <option value="new">Create New Project</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.title || project.id}
            </option>
          ))}
        </select>
      </div>

      {editableProject && (
        <>
          <h2>{selectedProjectId === 'new' ? 'Create New Project' : 'Edit Project'}</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="project-id">Project ID:</label>
            <input
              id="project-id"
              type="text"
              value={editableProject.id}
              onChange={(e) => handleProjectChange('id', e.target.value)}
              className={styles.textInput}
            />
            <p className={styles.fieldHelp}>
              Used for URLs and references. Use lowercase letters, numbers, and hyphens only.
            </p>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="project-title">Title:</label>
            <input
              id="project-title"
              type="text"
              value={editableProject.title}
              onChange={(e) => handleProjectChange('title', e.target.value)}
              className={styles.textInput}
            />
            <p className={styles.fieldHelp}>
              Main project title. Use \n for line breaks if needed.
            </p>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="project-subtitle">Subtitle:</label>
            <input
              id="project-subtitle"
              type="text"
              value={editableProject.subtitle || ''}
              onChange={(e) => handleProjectChange('subtitle', e.target.value)}
              className={styles.textInput}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="project-image">Main Image URL:</label>
            <input
              id="project-image"
              type="text"
              value={editableProject.imageUrl}
              onChange={(e) => handleProjectChange('imageUrl', e.target.value)}
              className={styles.textInput}
            />
            <p className={styles.fieldHelp}>
              Path to the main image, like: /img/project-name/image.jpg
            </p>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="project-intro-image">Intro Image URL (optional):</label>
            <input
              id="project-intro-image"
              type="text"
              value={editableProject.introImageUrl || ''}
              onChange={(e) => handleProjectChange('introImageUrl', e.target.value)}
              className={styles.textInput}
            />
          </div>

          <h3 className={styles.contentBlocksHeading}>Content Blocks</h3>
          
          <div className={styles.contentBlocksToolbar}>
            <span>Add new block:</span>
            <button onClick={() => addContentBlock('heading')} className={styles.blockButton}>Heading</button>
            <button onClick={() => addContentBlock('paragraph')} className={styles.blockButton}>Paragraph</button>
            <button onClick={() => addContentBlock('image')} className={styles.blockButton}>Image</button>
            <button onClick={() => addContentBlock('slideshow')} className={styles.blockButton}>Slideshow</button>
            <button onClick={() => addContentBlock('linkList')} className={styles.blockButton}>Link List</button>
            <button onClick={() => addContentBlock('video')} className={styles.blockButton}>Video</button>
            <button onClick={() => addContentBlock('googlePhotosAlbum')} className={styles.blockButton}>Google Photos Album</button>
          </div>
          
          <div className={styles.contentBlocks}>
            {editableProject.contentBlocks && editableProject.contentBlocks.length > 0 ? (
              editableProject.contentBlocks.map((block, index) => (
                <div key={index} className={styles.contentBlock}>
                  <div className={styles.blockHeader}>
                    <span className={styles.blockType}>{block.type}</span>
                    <div className={styles.blockActions}>
                      <button 
                        onClick={() => moveContentBlock(index, 'up')} 
                        disabled={index === 0}
                        className={styles.actionButton}
                      >
                        ↑
                      </button>
                      <button 
                        onClick={() => moveContentBlock(index, 'down')} 
                        disabled={index === (editableProject.contentBlocks?.length || 0) - 1}
                        className={styles.actionButton}
                      >
                        ↓
                      </button>
                      <button 
                        onClick={() => deleteContentBlock(index)}
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <ContentBlockEditor
                    block={block}
                    onUpdateBlock={(updatedBlock) => updateContentBlock(index, updatedBlock)}
                    onDeleteBlock={() => deleteContentBlock(index)}
                  />
                  
                  <div className={styles.addBlockInline}>
                    <button 
                      onClick={() => {
                        const dropdown = document.getElementById(`add-block-dropdown-${index}`);
                        if (dropdown) {
                          dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
                        }
                      }}
                      className={styles.addBlockButton}
                    >
                      + Add block below
                    </button>
                    <div id={`add-block-dropdown-${index}`} className={styles.addBlockDropdown}>
                      <button onClick={() => { addContentBlock('heading', index); document.getElementById(`add-block-dropdown-${index}`)!.style.display = 'none'; }}>Heading</button>
                      <button onClick={() => { addContentBlock('paragraph', index); document.getElementById(`add-block-dropdown-${index}`)!.style.display = 'none'; }}>Paragraph</button>
                      <button onClick={() => { addContentBlock('image', index); document.getElementById(`add-block-dropdown-${index}`)!.style.display = 'none'; }}>Image</button>
                      <button onClick={() => { addContentBlock('slideshow', index); document.getElementById(`add-block-dropdown-${index}`)!.style.display = 'none'; }}>Slideshow</button>
                      <button onClick={() => { addContentBlock('linkList', index); document.getElementById(`add-block-dropdown-${index}`)!.style.display = 'none'; }}>Link List</button>
                      <button onClick={() => { addContentBlock('video', index); document.getElementById(`add-block-dropdown-${index}`)!.style.display = 'none'; }}>Video</button>
                      <button onClick={() => { addContentBlock('googlePhotosAlbum', index); document.getElementById(`add-block-dropdown-${index}`)!.style.display = 'none'; }}>Google Photos Album</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noBlocks}>No content blocks yet. Add some using the buttons above.</p>
            )}
          </div>
          
          <div className={styles.formActions}>
            <button onClick={saveProject} className={styles.primaryButton}>
              Save Project
            </button>
          </div>
        </>
      )}
      
      <div className={styles.exportSection}>
        <h3>Export Projects</h3>
        <p>
          After saving your changes, export the updated projectData.ts file.
          Replace your existing file with this one to update your portfolio.
        </p>
        <button onClick={exportProjectsFile} className={styles.exportButton}>
          Export projectData.ts
        </button>
      </div>
    </div>
  );
};

export default ProjectEditor; 