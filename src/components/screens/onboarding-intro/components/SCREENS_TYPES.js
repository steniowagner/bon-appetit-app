export const TYPES = {
  FIND_RESTAURANTS: 'FIND_RESTAURANTS',
  WITH_YOUR_TASTE: 'WITH_YOUR_TASTE',
  CHOOSE_YOUR_MEAL: 'CHOOSE_YOUR_MEAL',
};

export const SCREENS = {
  [TYPES.FIND_RESTAURANTS]: {
    title: 'FIND RESTAURANTS',
    description:
      'Search for Restaurants near you that fits with the dishes that you desire.',
    image: 'findrestaurants',
  },

  [TYPES.WITH_YOUR_TASTE]: {
    title: 'WITH YOUR TASTE',
    description:
      'You just need to tell what kind of food you are craving, and then we will show you a lot of different options.',
    image: 'withyourtaste',
  },

  [TYPES.CHOOSE_YOUR_MEAL]: {
    title: 'CHOOSE YOUR MEAL',
    description:
      'Search among hundreds of dishes and pick the right meal for you based on trusted ratings and reviews.',
    image: 'chooseyourmeal',
  },
};
