# Lifebloom — pre-booking landing page (v2)

## Go live
Drag this folder onto Netlify (app.netlify.com > Add new site > Deploy manually). No build step.

## Photos
Free Unsplash photos (commercial use allowed): Ian Schneider, Luisa Brimble, Sincerely Media, BenMoses M.
To host them yourself before launch (recommended):

    node download-photos.mjs        # Node 18+, saves into assets/photos/

Then set  localPhotos: true  in CFG inside index.html. If a photo ever fails to load, the page shows a
soft blush panel with the Lifebloom emblem instead of a broken image.
Replace them with the brand's own shoot when available — same file names in assets/photos/.

## Pedestal mockups
assets/pedestal-blush.webp (hero) and assets/pedestal-ivory.webp (pre-book section): the client's
pedestal images, cut out to real transparency (the originals had the checkerboard painted in) with
LIFEBLOOM engraved on the stone base. Swap in the real product on the pedestal after launch.

## Fonts
Zodiak (headings) and Satoshi (text) from Fontshare — free for commercial use.

## Where pre-bookings go
Netlify Forms: dashboard > your site > Forms > "prebook" (name, age, mobile in +91 format,
products, consent). Export as CSV. Turn on email alerts under Site configuration > Notifications.
Netlify plans have a monthly form-submission limit; check yours if pre-bookings grow large.
If saving fails, visitors get a one-tap WhatsApp message with their details. Not on Netlify?
Set  saveTo: 'whatsapp'  in CFG.

## Intro animation
Plays once per browser session (about 2.5 seconds, click to skip). Skipped for visitors who
have reduced motion turned on.

## Editing
Near the top of the main <script>: CFG (WhatsApp number, min age), PHOTOS, PRODUCTS, FAQ, TICKER.
