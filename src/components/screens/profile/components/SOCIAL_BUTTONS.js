// @flow

export const TYPES = {
  INSTAGRAM: 'INSTAGRAM',
  LINKEDIN: 'LINKEDIN',
  GITHUB: 'GITHUB',
};

export const SOCIAL_BUTTONS = {
  [TYPES.INSTAGRAM]: {
    colors: ['#8a3ab9', '#bc2a8d', '#fbad50', '#cd486b'],
    url: 'https://www.instagram.com/swmyself/',
    iconName: 'instagram',
    withMarginTop: true,
  },

  [TYPES.LINKEDIN]: {
    colors: ['#0077B5', '#0077B5'],
    url: 'https://www.linkedin.com/in/steniowagner',
    iconName: 'linkedin',
    withMarginTop: false,
  },

  [TYPES.GITHUB]: {
    colors: ['#333333', '#333333'],
    url: 'https://github.com/steniowagner',
    iconName: 'github-circle',
    withMarginTop: true,
  },
};
