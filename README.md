# my-weather-app

Weather forecast app built with Create React App, React 19, Redux, and Axios. It fetches 5‑day forecasts from OpenWeather and displays a small Google Map per city.

Recommended Node.js: 18.x or 20.x LTS

## API key setup

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

## Google Maps API key (for map rendering)

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

## Quick start

1) Install dependencies

```bash
yarn install
```

2) Create `.env` with required API keys

```dotenv
REACT_APP_OPEN_WEATHER_API_KEY=your_openweather_key
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

3) Run the app

```bash
yarn start
```

Open http://localhost:3000 to use the app.

## API keys

### OpenWeatherMap
- Sign up: https://home.openweathermap.org/users/sign_up
- Copy your key from the “API keys” page.
- The app uses the 5‑day forecast endpoint and supports:
	- City: `Chicago`
	- City and state: `Chicago, IL` (normalized to `Chicago,IL,US`)
	- ZIP: `60601` (defaults to `US`) or `60601,US`

### Google Maps JavaScript API
- Create a project in Google Cloud Console: https://console.cloud.google.com/
- Enable “Maps JavaScript API”.
- Create an API key and restrict it to HTTP referrers:
	- Local dev: `http://localhost:3000/*`
	- GitHub Pages: `https://zkm.github.io/my-weather-app/*`

Security: `.env` is git‑ignored by default. Don’t commit API keys.

## Scripts

- `yarn start` – start local dev server
- `yarn build` – production build in `build/`
- `yarn test` – run tests (if any)

## Deployment (GitHub Pages via Actions)

This repository is configured to deploy to GitHub Pages automatically on pushes to `main` using GitHub Actions.

0) In your repository, go to Settings → Pages and set "Source" to "GitHub Actions".

1) Ensure the `homepage` field in `package.json` is set to:

```json
"homepage": "https://zkm.github.io/my-weather-app"
```

2) Add repository secrets (Settings → Secrets and variables → Actions → New repository secret):
- `REACT_APP_OPEN_WEATHER_API_KEY`
- `REACT_APP_GOOGLE_MAPS_API_KEY`

3) Push to `main`. The workflow will:
- Install dependencies
- Build the app
- Upload the build as a Pages artifact
- Deploy to GitHub Pages

Your site will be available at: https://zkm.github.io/my-weather-app

## Troubleshooting

- Maps not showing / NoApiKeys or ApiProjectMapError
	- Ensure `REACT_APP_GOOGLE_MAPS_API_KEY` is set and Maps JavaScript API is enabled.
	- Check referrer restrictions include localhost and the GitHub Pages origin.
- 404 from OpenWeather
	- Try city only first (e.g., `Chicago`), or `City, ST` (the app normalizes to `City,ST,US`).
- Env changes not applied
	- Stop and restart `yarn start` – CRA only reads `.env` at startup.

