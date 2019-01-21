// @flow

export const TYPES = {
  RECEIVE_ALL_NOTIFICATIONS: 'RECEIVE_ALL_NOTIFICATIONS',
  WHEN_ABOUT_DISCOUNTS: 'WHEN_ABOUT_DISCOUNTS',
  NOTIFICATIONS_SOUND: 'NOTIFICATIONS_SOUND',
  PROMOTIONS_NEAR_ME: 'PROMOTIONS_NEAR_ME',
  WHEN_PAST_SEARCH: 'WHEN_PAST_SEARCH',
};

export const SWITCH_STATE_REFS = {
  RECEIVE_ALL_NOTIFICATIONS: 'receiveAllNotifications',
  WHEN_ABOUT_DISCOUNTS: 'whenIsAboutPromotions',
  NOTIFICATIONS_SOUND: 'notificationsSound',
  PROMOTIONS_NEAR_ME: 'promotionsNearMe',
  WHEN_PAST_SEARCH: 'whenPastSearch',
};

const CONFIG = {
  [TYPES.PROMOTIONS_NEAR_ME]: {
    switchId: SWITCH_STATE_REFS.PROMOTIONS_NEAR_ME,
    text:
      'By enabling this option, the app will periodically use your current location and will show promotions that are happening near to you.',
    title: 'Receive Promotions near me',
  },
  [TYPES.NOTIFICATIONS_SOUND]: {
    switchId: SWITCH_STATE_REFS.NOTIFICATIONS_SOUND,
    text: 'Enable the sound of the Notifications',
    title: 'Notifications Sound',
  },
  [TYPES.RECEIVE_ALL_NOTIFICATIONS]: {
    switchId: SWITCH_STATE_REFS.RECEIVE_ALL_NOTIFICATIONS,
    title: 'Receive all notifications',
  },
  [TYPES.WHEN_PAST_SEARCH]: {
    switchId: SWITCH_STATE_REFS.WHEN_PAST_SEARCH,
    title: 'When is about my past searches',
  },
  [TYPES.WHEN_ABOUT_DISCOUNTS]: {
    switchId: SWITCH_STATE_REFS.WHEN_ABOUT_DISCOUNTS,
    title: 'When is about discounts',
  },
};

export const getItemConfig = (type: string): Object => CONFIG[type];
