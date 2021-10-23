import { v4 as uuidv4 } from 'uuid';

export const nav = {
  mobile: {
    primary: {
      label: 'Navigation',
      items: [
        {
          label: 'Home',
          icon: 'calendar',
          href: '/',
          id: uuidv4(),
        },
        {
          label: 'Projects',
          icon: 'calendar',
          href: '/projects',
          id: uuidv4(),
        },
        {
          label: 'Contact',
          icon: 'calendar',
          href: '/contact',
          id: uuidv4(),
        },
      ],
    },
    secondary: {
      label: 'More',
      items: [
        {
          label: 'Experience',
          icon: 'calendar',
          href: '/experience',
          id: uuidv4(),
        },
        {
          label: 'Technical Skills',
          icon: 'calendar',
          href: '/skills',
          id: uuidv4(),
        },
        {
          label: 'Blockchain',
          icon: 'calendar',
          href: '/blockchain',
          id: uuidv4(),
        },
      ],
    },
  },
  desktop: {
    primary: {
      label: 'More',
      items: [
        {
          label: 'About Me',
          href: '/about',
          id: uuidv4(),
        },
        {
          label: 'Experience',
          href: '/experience',
          id: uuidv4(),
        },
        {
          label: 'Technical Skills',
          href: '/skills',
          id: uuidv4(),
        },
        {
          label: 'Blockchain',
          href: '/blockchain',
          id: uuidv4(),
        },
      ],
    },
    authenticated: {
      items: [
        {
          label: 'Messages',
          icon: 'mail',
          href: '/messages',
          id: uuidv4(),
        },
      ],
    },
    secondaryLoggedOut: {
      label: '',
      items: [
        {
          label: 'Darkmode',
          icon: 'moon',
          href: '/',
          id: uuidv4(),
        },
      ],
    },
  },
};
