import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PortfolioItem from '../components/PortfolioItem';
import { projects } from '../projectData';
import { homepageContent } from '../homepageData';

const HomePage: React.FC = () => {
  const { introSection, aboutSection, workSection } = homepageContent;

  return (
    <>
      <Header />
      <main style={{ flexGrow: 1 }}>
        <section className="intro" id="home">
          <h1 className="section__title section__title--intro" 
              dangerouslySetInnerHTML={{ __html: introSection.title }} />
          <p className="section__subtitle section__subtitle--intro">
            {introSection.subtitle}
          </p>
          <img 
            src={introSection.imageUrl} 
            alt="a picture of Gavin" 
            className="intro__img" 
            loading="lazy" 
          />
        </section>

        <section className="about-me" id="about">
          <h2 className="section__title section__title--about">{aboutSection.title}</h2>
          <p className="section__subtitle section__subtitle--about">
            {aboutSection.subtitle}
          </p>
          <div className="about-me__body">
            {aboutSection.bodyParagraphs.map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
          <img 
            src={aboutSection.imageUrl} 
            alt="Gavin's logo" 
            className="about-me__img" 
            loading="lazy" 
          />
          <div className="about-me__btn">
            {aboutSection.buttons.map((button, index) => (
              <a 
                key={index} 
                href={button.url} 
                className="about-me--btn" 
                target={button.isExternal ? "_blank" : undefined} 
                rel={button.isExternal ? "noopener noreferrer" : undefined}
              >
                {button.text}
              </a>
            ))}
          </div>
        </section>

        <section className="my-work" id="work">
          <h2 className="section__title section__title--work">{workSection.title}</h2>
          <p className="section__subtitle section__subtitle--work">
            {workSection.subtitle}
          </p>
          <div className="portfolio">
            {projects.map(project => (
              <PortfolioItem 
                key={project.id} 
                id={project.id} 
                imageUrl={project.imageUrl} 
                altText={project.title} 
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage; 