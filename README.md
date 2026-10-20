# my-weather-app

Weather forecast app built with Vite, React 19 and Redux. It fetches 5‑day forecasts from OpenWeather, charts them with sparklines and displays a small Google Map per city.

Live site: https://zkm.github.io/my-weather-app

Recommended Node.js: 22.x (the version CI uses)

## Quick start

1. Install dependencies

```bash
yarn install
```

2. Create a `.env` file in the project root with your API keys (see [API keys](#api-keys))

```dotenv
VITE_OPEN_WEATHER_API_KEY=your_openweather_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

3. Run the app

```bash
yarn start
```

Open http://localhost:5173/my-weather-app/ to use the app.

Vite only exposes variables that start with `VITE_`, and it reads `.env` at startup, so restart `yarn start` after changing it.

## API keys

### OpenWeatherMap

1. Sign up for a free account at https://home.openweathermap.org/users/sign_up
2. After verifying your email, copy your key from the "API keys" page.
3. Set it as `VITE_OPEN_WEATHER_API_KEY` in `.env`.

The app uses the 5‑day forecast endpoint and accepts:

- City: `Chicago`
- City and state: `Chicago, IL` (normalized to `Chicago,IL,US`)
- ZIP: `60601` (defaults to `US`) or `60601,US`

### Google Maps JavaScript API

1. Create a Google Cloud project (or use an existing one): https://console.cloud.google.com/
2. Enable the "Maps JavaScript API" for your project.
3. Create an API key (APIs & Services > Credentials) and restrict it to HTTP referrers:
   - Local dev: `http://localhost:5173/*`
   - GitHub Pages: `https://zkm.github.io/my-weather-app/*`
4. Set it as `VITE_GOOGLE_MAPS_API_KEY` in `.env`.

Security: `.env` is git‑ignored by default. Don’t commit API keys. Keys prefixed with `VITE_` are embedded in the built JavaScript, so restrict them by referrer.

## Scripts

- `yarn start` – start the Vite dev server
- `yarn build` – production build in `build/`
- `yarn test` – run tests with Vitest
- `yarn lint` – lint with ESLint
- `yarn format` – format with Prettier

## Deployment (GitHub Pages via Actions)

This repository deploys to GitHub Pages automatically on pushes to `main` using GitHub Actions.

1. In your repository, go to Settings → Pages and set "Source" to "GitHub Actions".
2. Add repository secrets (Settings → Secrets and variables → Actions → New repository secret):
   - `VITE_OPEN_WEATHER_API_KEY`
   - `VITE_GOOGLE_MAPS_API_KEY`
3. Push to `main`. The workflow installs dependencies, builds the app, uploads `build/` as a Pages artifact and deploys it.

The site is served from `/my-weather-app/`, which is set by `base` in `vite.config.js`.

## Troubleshooting

- Maps not showing / "NoApiKeys" or "ApiProjectMapError" in the console
  - Ensure `VITE_GOOGLE_MAPS_API_KEY` is set and the Maps JavaScript API is enabled.
  - Check referrer restrictions include `http://localhost:5173/*` and the GitHub Pages origin.
- 404 from OpenWeather
  - Try city only first (e.g., `Chicago`), or `City, ST` (the app normalizes to `City,ST,US`).
- Env changes not applied
  - Stop and restart `yarn start`. Vite only reads `.env` at startup, and ignores variables without the `VITE_` prefix.
