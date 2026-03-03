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

- **Custom domain on GitHub Pages** (e.g. `https://hyphai.us/`): use **`npm run deploy:root`**. This builds for root (no `BASE_PATH`) then pushes to the `gh-pages` branch. GitHub Pages serves it at the custom domain root.
- **GitHub Pages subpath only** (e.g. `https://freesoil.github.io/hyphai_web/` without a custom domain): use `npm run deploy` (builds with `BASE_PATH=/hyphai_web`).

If you see 404s for `/hyphai_web/assets/index-*.js` or `/hyphai_web/assets/index-*.css` on your custom domain, the wrong build was deployed. Run `npm run deploy:root` to fix it.
