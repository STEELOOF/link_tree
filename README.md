# Contact site

A simple link-in-bio page. Vanilla HTML, CSS and JavaScript — no frameworks, no build step.

## Features

- Profile picture with a blue gradient frame, tilted backing card and waving "Say hi" badge
- White background with a faint dot grid and soft blue glows
- Stacked blue gradient pill buttons: circle fill, lift and sliding arrow on hover
- Everything fades up one by one on load (turned off for reduced-motion users)
- Custom cursor: a dot plus a ring that glides after it, grows over buttons and squeezes on click (turned off on touch devices)
- Footer year updates automatically
- Responsive on phones

## Structure

```
.
├── index.html          # all content lives here
├── images/
│   └── pfp.svg         # placeholder profile picture
├── styles/
│   ├── normalize.css
│   └── style.css       # colors, layout, buttons
└── scripts/
    ├── cursor.js       # custom cursor
    └── getYear.js      # footer year
```

## Customize

- **Name & tagline**: `<title>`, `<h1>`, `<p>` and the footer in `index.html`
- **Links**: the `<a>` tags inside `#btn-div` (icons from [Boxicons](https://boxicons.com/))
- **Profile picture**: add a photo to `images/` and update the `src` of `#pfp`
- **Colors**: the variables at the top of `styles/style.css`
- **Badge text**: the `.badge` span in `index.html` ("Say hi")

## Run locally

Open `index.html`, or:

```bash
python3 -m http.server 8000
```

## License

MIT
