import { v4 as uuidv4 } from 'uuid';

export const nav = {
  mobile: {
    primary: {
      label: 'Navigation',
      items: [
        {
          label: 'Home',
          icon: 'home',
          href: '/',
          id: uuidv4(),
        },
        {
          label: 'Browse',
          icon: 'search',
          href: '/browse',
          id: uuidv4(),
        },
        {
          label: 'Leagues',
          icon: 'user-group',
          href: '/league',
          id: uuidv4(),
        },
        {
          label: 'Community',
          icon: 'globe',
          href: '/community',
          id: uuidv4(),
        },
      ],
    },
    authenticated: {
      items: [
        {
          label: 'Notifications',
          icon: 'bell',
          href: '/notification-center',
          id: uuidv4(),
        },
        {
          label: 'Messages',
          icon: 'mail',
          href: '/messages',
          id: uuidv4(),
        },
        {
          label: 'Help Center',
          icon: 'question-mark-circle',
          href: '',
          id: uuidv4(),
        },
      ],
    },
    secondary: {
      label: 'Account',
      items: [
        {
          label: 'My Channel',
          icon: 'desktop-computer',
          href: '/profile',
          id: uuidv4(),
        },
        {
          label: 'Settings',
          icon: 'cog',
          href: '/settings',
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
          label: 'Skills',
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
