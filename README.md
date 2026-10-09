# James Potot — Portfolio v2

An editorial, multi-page portfolio built using React, React Router, Vite, Lucide icons, and React Icons. Light and dark themes use the same layout and token system.

## Run locally (Windows CMD)

1. Extract the ZIP.
2. Open Command Prompt in the extracted `james-portfolio-v2` folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL shown in CMD (usually http://localhost:5173).

You need Node.js installed (`node -v` to check). To create a production bundle, run `npm run build`; output is in `dist/`.

## Personalize

- Update the introduction, bio, email, and project details in `src/main.jsx`.
- Replace illustrative certification cards with your own images in `public/certificates/`:
  - `google-technical-support.jpg`
  - `canva-essentials.jpg`
  - `accenture-ux.jpg`
- Certificate cards automatically display actual images when those files exist. Until then, they show clearly marked illustrative placeholders.
- Add GitHub/LinkedIn links when you have validated the URLs. None are invented.
- The architectural photograph on the homepage is served by Unsplash; fonts come from Google Fonts. These require internet to load.
- Modify palette variables at the beginning of `src/style.css` for both themes.

## Pages

`/` overview; `/about`; `/technologies`; `/projects` with interactive filters; `/certifications`; `/contact`.

Note: For hosting on a static server without route rewrites, configure SPA fallback to `index.html` for paths such as `/projects`.
