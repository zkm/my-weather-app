# API Key Setup

This app requires an OpenWeatherMap API key to fetch weather data.

1. Sign up for a free account at https://home.openweathermap.org/users/sign_up
2. After verifying your email, go to the "API keys" section in your OpenWeatherMap dashboard.
3. Copy your API key.
4. In the root of this project, create a file named `.env` (if it doesn't exist).
5. Add the following line to your `.env` file, replacing `your_actual_api_key_here` with your key:

```
REACT_APP_OPEN_WEATHER_API_KEY=your_actual_api_key_here
```

Restart the development server after adding or changing the `.env` file.

## Google Maps API Key (for map rendering)

This project also renders a small Google Map preview per city. You’ll need a Google Maps JavaScript API key:

1. Create a Google Cloud project (or use an existing one): https://console.cloud.google.com/
2. Enable the "Maps JavaScript API" for your project.
3. Create an API key (APIs & Services > Credentials) and restrict it to HTTP referrers (recommended). For local dev, add `http://localhost:3000/*`.
4. Add the key to your `.env` file:

```
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key_here
```

After changing `.env`, stop and restart `yarn start`.

Troubleshooting:
- If you see "NoApiKeys" or "ApiProjectMapError" in the browser console, ensure the key is present, the Maps JavaScript API is enabled, and referrer restrictions allow your origin.
- If you change `.env` while the dev server is running, it won’t pick up changes until you restart.

# my-weather-app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Recommended Node version `v16.19.0`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
