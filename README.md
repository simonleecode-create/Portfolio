# Simon Lee Portfolio

React and Three.js portfolio with a 3D background, loading and welcome screens, animated project details, a typewriter introduction, and a custom cursor.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

## Structure

- `src/`: application components and styles.
- `tests/`: browser verification scripts.
- `docs/`: reference design notes.
- `test-results/`: generated test screenshots (gitignored).
- `dist/`: generated production build (gitignored).

## Content

Edit the profile and projects in `src/main.jsx`. Set `profile.email` to enable the contact link. The supplied resume did not include contact details. Project previews are illustrative HTML/CSS recreations of the supplied screenshots.

## Verification

With the development server running at `http://localhost:5173` and Google Chrome installed:

```sh
npm test
```

Checks cover project dialogs, filters, mobile navigation, accordions, the welcome sequence, cursor behavior, and reduced-motion support.
