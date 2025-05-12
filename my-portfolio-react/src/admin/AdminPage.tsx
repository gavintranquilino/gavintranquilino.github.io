import React, { useState } from 'react';
import ProjectEditor from './ProjectEditor';
import HomePageEditor from './HomePageEditor';
import styles from './AdminPage.module.css';

type EditorTab = 'projects' | 'homepage';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EditorTab>('projects');

  return (
    <div className={styles.adminContainer}>
      <header className={styles.adminHeader}>
        <h1>Portfolio Content Editor</h1>
        <p>Edit your portfolio content and export the updated data files</p>
      </header>
      
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'projects' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Project Editor
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'homepage' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('homepage')}
        >
          Homepage Editor
        </button>
      </div>
      
      <main className={styles.adminMain}>
        {activeTab === 'projects' && <ProjectEditor />}
        {activeTab === 'homepage' && <HomePageEditor />}
      </main>
      
      <footer className={styles.adminFooter}>
        <p>
          This editor exports data files that you can use to replace your existing files. After editing,
          download the updated file and replace it in your project source.
        </p>
      </footer>
    </div>
  );
};

export default AdminPage; 