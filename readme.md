# MayWeb Website

A React and Vite website for MayWeb Technologies.

## Local development

```bash
npm install
npm run dev
```

The development server runs on the port configured by Vite, or `8443` by default.

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist`.

## Netlify deployment

This repository includes `netlify.toml` with the required Netlify settings:

- Build command: `npm run build`
- Publish directory: `dist`

Connect the repository to Netlify and deploy. Netlify will read these settings automatically.
