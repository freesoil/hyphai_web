<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1RoBqtExP96izB-iH-QhUAuBr21GxfeYn

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. (Optional) Set `GEMINI_API_KEY` in `.env.local` if you use Gemini features.
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. **Open in your browser:** [http://localhost:3000](http://localhost:3000)

   The app uses hash routing: try `http://localhost:3000/#/`, `http://localhost:3000/#/solutions`, `http://localhost:3000/#/contact`, etc.

## Build & deploy

- **Deploy at site root** (e.g. custom domain `https://hyphai.us/`): use `npm run build`, then upload the `dist/` folder. Asset URLs will be `/assets/...`, `/hero-transplanter-video.mp4`, etc.
- **Deploy to a subpath** (e.g. GitHub Pages `https://...github.io/hyphai_web/`): use `npm run build:gh-pages` or `npm run deploy`. Asset URLs will be `/hyphai_web/assets/...`, `/hyphai_web/hero-transplanter-video.mp4`, etc.

If you see 404s for `index-*.js` or `index-*.css`, the build base path does not match where the app is served: use `npm run build` for root, or `npm run build:gh-pages` for the `/hyphai_web/` subpath.
