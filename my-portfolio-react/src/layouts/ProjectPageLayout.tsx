import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ProjectPageLayoutProps {
  title: string;
  subtitle: string;
  introImageUrl: string;
  children: React.ReactNode; // For specific project content
}

const ProjectPageLayout: React.FC<ProjectPageLayoutProps> = ({ title, subtitle, introImageUrl, children }) => {
  return (
    <>
      <Header />
      <main style={{ flexGrow: 1 }}> {/* Wrapper for main content */}
        <section className="intro" id="home"> {/* Reusing some classes for now */}
          <h1 className="section__title section__title--intro" style={{ whiteSpace: 'pre-line' }}>
            {title}
          </h1>
          <p className="section__subtitle section__subtitle--intro">
            {subtitle}
          </p>
          <img src={introImageUrl} alt={`${title} intro image`} className="intro__img" />
        </section>

        <div className="individual-item">
          {children} {/* Specific project details (demo, overview) will go here */}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectPageLayout; 