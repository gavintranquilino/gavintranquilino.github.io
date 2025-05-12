// Homepage content that can be edited through the admin interface

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
export const homepageContent: HomepageContent = {
  "introSection": {
    "title": "Hey, I'm <strong>Gavin</strong>",
    "subtitle": "tinkerer / dev",
    "imageUrl": "/img/smile.svg"
  },
  "aboutSection": {
    "title": "About me",
    "subtitle": "a perpetual work in progress",
    "bodyParagraphs": [
      "As a mechatronics engineering student from the University of Waterloo, I work on 3D mechanical design, embedded programs, IoT, robots, and all things nerd. I like to keep this portfolio updated with various projects I work on.",
      "Honestly, I'm just a guy who likes to tinker with things and see how they work. These skills and experiences are just a side effect of my curiosity. When someone asks for my hobbies, I usually say that I like to build things.",
      "Also, I have a YouTube channel where I post videos about projects and things I have tinkered with that are not on this site. It contains snippets of small projects that just aren't worth making dedicated pages for. Go check it out below!",
      "<em>Quick Note:</em> My YouTube channel and Resumé are honestly probably more up to date than this site depending on when you're viewing this."
    ],
    "imageUrl": "/img/logo.png",
    "buttons": [
      {
        "text": "Resumé",
        "url": "resume.pdf",
        "isExternal": true
      },
      {
        "text": "My Work",
        "url": "#work",
        "isExternal": false
      },
      {
        "text": "YouTube",
        "url": "https://www.youtube.com/@gavintranquilino",
        "isExternal": true
      },
      {
        "text": "LinkedIn",
        "url": "https://www.linkedin.com/in/gavintranquilino",
        "isExternal": true
      }
    ]
  },
  "workSection": {
    "title": "My Work",
    "subtitle": "My projects and contributions"
  }
};