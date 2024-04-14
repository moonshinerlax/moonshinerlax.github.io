import config from '~/config.json';

export const navLinks = [
  {
    label: 'New Game Portfolio!',
    pathname: 'https://gameportfoliomoonshiner.pages.dev/',
    important:true,
  },
  {
    label: 'Projects',
    pathname: '/#project-1',
    important:false,
  },
  {
    label: 'Details',
    pathname: '/#details',
    important:false,
  },
  {
    label: 'Articles',
    pathname: '/articles',
  },
  {
    label: 'Contact',
    pathname: '/contact',
    important:false,
  },
];

export const socialLinks = [
  {
    label: 'Twitter',
    url: `https://twitter.com/${config.twitter}`,
    icon: 'twitter',
  },
  // {
  //   label: 'Figma',
  //   url: `https://www.figma.com/${config.figma}`,
  //   icon: 'figma',
  // },
  {
    label: 'LinkedIn',
    url: `https://www.linkedin.com/${config.linkedin}`,
    icon: 'linkedin',
  },
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
];
