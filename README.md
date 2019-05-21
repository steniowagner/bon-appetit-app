

# Bon-Appetit!

![Preview-Screens](https://github.com/steniowagner/bon-appetit-app/blob/master/images/default.png)

If you want to take a look on all screens of the App, they are [here](https://github.com/steniowagner/bon-appetit-app/tree/master/images).

## About this Project

The idea of the App is:

_"Show differents options of restaurants, dishes and gastronomic events in the city based on what the user is looking to eat and his location in the city."_

**PS:** There's a big market behind this context, and that can be extended to other areas (like music, parties, etc), and I'll be so glad if you could find any idea based on this project to build your own business!

**On the Media 🤩:** An [interview](https://madewithreactnative.com/bon-appetit/) about this app.

## Why?

This project is part of my personal portfolio, so, I'll be happy if you could provide me any feedback about the project, code, structure or anything that you can report that could make me a better developer!

Email-me: stenio.wagner1@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/steniowagner/)

Also, you can use this Project as you wish, be for study, be for make improvements or earn money with it!

It's free!

## Some Observations about this App

1 - All the data abount dishes, gastronomic events and restaurants that is showed in the App are mocked by me, and they don't exists in the real world. The files that contains all data that it's displayed in the App are stored on the [back-end of the app](https://github.com/steniowagner/bon-appetit-server/tree/master/src/json-models).

2 - The current-user-location that is showed by the App is also mocked. All the locations are static and provided by the [back-end of the app](https://github.com/steniowagner/bon-appetit-server) in [this file](https://github.com/steniowagner/bon-appetit-server/blob/master/src/utils/get-user-location.js).

3 - If you're running the App in an Android device (physical or virtual), you'll need to have an Google Maps key to see the Map in _Near Me_ screen and in _Restaurant Address_ Screen. To active your key, follow [this tutorial](https://developers.google.com/maps/documentation/android-sdk/signup). Those Screens will works properly on iOS by default.

4 - There's no functionality of Login/Register, the buttons and the forms in the Login Screen are only for UI matters.

5 - The Screen _Settings_ it's also only for UI matters.

## Installers

If you want to test the App in the Production mode, the installers are listed below:

[Android .apk installer](https://drive.google.com/file/d/1us880aD81EhrlYra527tGJHW3jN7R6Eh/view?usp=sharing)

iOS .ipa installer: Soon!

## Functionalities

- Get a Dashboard with:

  - A list of Gastronomic Events happening in the City
  - Dishes that the User might like
  - Popular Dishes

- Get informations about a specific Dish, with reviews, price, image, comments and the restaurant that offers the dish.

- Get Informations about a specific Restaurant, with address, operating hours, location on the map, image and the menu.

- Get Informations about a specific Gastronomic Event, with a list of the Restaurants participating,

- Search restaurants with a filter based on type of dishes and max distance of search.

- Visualize the most closests Restaurants with a specific type of Dish, sorted by distance from the user to the restaurant.

## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment to run a React-Native App, that can be found [here](https://facebook.github.io/react-native/docs/getting-started).

Also, you'll need to the server running locally on your machine with the mock data. You can find the server and all the instructions to start the server [here](https://github.com/steniowagner/bon-appetit-server).

### Installing

**Cloning the Repository**

```
$ https://github.com/steniowagner/bon-appetit-app

$ cd bon-appetit-app
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

### Connecting the App with the Server

1 - Follow the instructions on the [bon-appetit-server](https://github.com/steniowagner/bon-appetit-server) to have the server running on your machine.

2 - With the server up and running, go to the [src/service/api.js](https://github.com/steniowagner/bon-appetit-app/blob/master/src/services/api.js) file and edit the value of the field _baseURL_ (line 4) with the IP of your machine (you can have some issues with _localhost_ if you're running on an android physical device, but you can use localhost safely on iOS).

3 - Pay attention with the server address in [src/service/api.js](https://github.com/steniowagner/bon-appetit-app/blob/master/src/services/api.js) file! It should looks like this:

_http://< IP of your machine >:3001/bon-appetit/api/v1_ 

*or*

_http:// localhost:3001/bon-appetit/api/v1_

### Running

With all dependencies installed and the environment properly configured, you can now run the app:

Android

```
$ react-native run-android
```

iOS

```
$ react-native run-ios
```

## Built With

- [React-Native](https://facebook.github.io/react-native/) - Build the native app using JavaScript and React
- [React-Navigation](https://reactnavigation.org/docs/en/getting-started.html) - Router
- [Redux](https://redux.js.org/) - React State Manager
- [Redux-Saga](https://redux-saga.js.org/) - Side-Effect model for Redux
- [Axios](https://github.com/axios/axios) - HTTP Client
- [ESlint](https://eslint.org/) - Linter
- [Flow](https://redux-saga.js.org/) - Static Type Checker
- [Prettier](https://prettier.io/) - Code Formatter
- [Babel](https://babeljs.io/) - JavaScript Compiler
- [Reactotron](https://infinite.red/reactotron) - Inspector
- [Styled-Components](https://www.styled-components.com/) - Styles
- [React-Native-Fast-Image](https://github.com/DylanVann/react-native-fast-image) - Image Loader
- [React-Native-Linear-Gradient](https://github.com/react-native-community/react-native-linear-gradient) - Gradient Styles
- [React-Native-Maps](https://github.com/react-native-community/react-native-maps) - Map
- [Shimmer-Placeholder](https://github.com/tomzaku/react-native-shimmer-placeholder) - Placeholder of Images at Home screen
- [React-Native-SplashScreen](https://github.com/crazycodeboy/react-native-splash-screen) - Splashscreen of the App
- [React-Native-Vector-Icons](https://github.com/oblador/react-native-vector-icons) - Icons

## Support tools

- [Image-Resize](https://imageresize.org) - Resize the Images
- [Unsplash](https://unsplash.com) - Source of the Images
- [Tabs and Tidbits](http://www.tabsandtidbits.com) - Dishes Recipes
- [Recipe Tin Eats](https://www.recipetineats.com) - Dishes Recipes
- [Japan - Recipe Tin Eats](https://japan.recipetineats.com) - Japanese Dishes Recipes
- [BBC Good Food](https://www.bbcgoodfood.com) - Dishes Recipes
- [Trip Advisor](https://www.tripadvisor.com.br) - Restaurants Information
- [LatLong](https://www.latlong.net) - Convert Address to LatLong coordinates
- [Amazon S3](https://aws.amazon.com/pt/s3/) - Storage Service

## Contributing

You can send how many PR's do you want, I'll be glad to analyse and accept them! And if you have any question about the project...

Email-me: stenio.wagner1@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/steniowagner/)

Thank you!

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/steniowagner/bon-appetit-app/blob/master/LICENSE) file for details
