# Sit Stand Stretch

Small, free web tools for people who want calm breathing, a simple focus timer, and a pushup plan. Together they make up the website sitstandstretch.com.

> Screenshot: add `docs/screenshot.png` (placeholder line — leave it exactly like this for GUI apps)

> **Not medical advice. Stop if you feel dizzy or have pain. Ask your doctor or physical therapist before starting new exercises.**

The home page (`/`) shows every tool as a card. Click a card, or its **Open** button, to start that tool. Each tool has a small **All tools** link at the top that takes you back to the home page.

| Tool | Web address | What it does | Manual |
|---|---|---|---|
| Calm Breathing Bubble | `/breathing` | A bubble grows and shrinks to guide your breathing. | [Calm Breathing Bubble](#calm-breathing-bubble) |
| 50 Minute Timer | `/timer` | A plain focus countdown for one task: 50 minutes, or the length you choose. | [50 Minute Timer](#50-minute-timer) |
| Pushup Coach | `/pushup-coach` | A weekly plan that takes you from countertop pushups to floor pushups. | [Pushup Coach](#pushup-coach) |

Old addresses still work. On the web host, `.htaccess` sends `/requests` and `/requests.html` to `/timer`, and `/myfitness` and `/myfitness.html` to `/pushup-coach` (permanent 301 redirects).

## What you need
- [Node.js](https://nodejs.org/) version 18 or newer (this includes `npm`). You only need it to run or build the site.
- A modern web browser (Chrome, Edge, Firefox, or Safari).
- An internet connection. Pushup Coach and the 50 Minute Timer load React and fonts from public web servers.

## Install
1. Download this repository (green **Code** button, then **Download ZIP**) and unzip it, or clone it with git.
2. Open a terminal in the project folder.
3. Run `npm install` one time. This downloads React, Vite, and Tailwind CSS into a `node_modules` folder.
4. Run `npm run dev` and open the address it shows (usually `http://localhost:5173/`). You see the home page with the tool cards. You can also add a web address from the table above, for example `http://localhost:5173/timer`.

## Calm Breathing Bubble

The page heading says **Free Easy Breath Tool**.

**What it does**
- A bubble grows and shrinks to show you when to breathe in, hold, and breathe out.
- Offers four breathing patterns: 4-7-8 Relaxation, Box Breathing Focus, Gentle Beginner, and Double Exhale Stress.
- Each session has a set length and a progress bar.

**How to use**
1. Under **Choose a Pattern**, click one of the four patterns.
2. Click **Start: (pattern name)**.
3. Follow the bubble. It shows **Breathe In**, **Hold**, or **Breathe Out** and counts down the seconds.
4. Click **Stop Session** to end early. The session also stops on its own when the progress bar is full.

## 50 Minute Timer

**What it does**
- Counts down 50 minutes, shown in whole minutes, with a bar that fills as time passes.
- Lets you change the length (1 to 120 minutes) and save your own default.
- Shows **Done** when the time is up. The box gets wider if needed so the word fits. It does not play a sound.
- Remembers your task, your timer and your default, even if you close the tab and come back.

**How to use**
1. Type your task in **What are you working on?**.
2. Click **Play** to start. Click **Pause** to stop, and **Play** again to go on from where you paused.
3. Click **Reset Timer** to go back to your default length (50 minutes until you save another one).

**Change the length**
1. Click **Adjust Timer** (next to **Reset Timer**). If the timer is running, it pauses.
2. Type the number of minutes, or click the **‹** and **›** arrows on each side of the box. Holding an arrow keeps changing the number. The arrow keys on your keyboard work too.
3. Click **Set as Default** if you want this length every time you click **Reset Timer**.
4. Click **Done**, press **Enter**, or click **Play**. The arrows go away and the timer starts fresh from the new length. Press **Esc** to close without a change.

## Pushup Coach

**What it does**
- Moves you down a ladder of four surfaces: Countertop, Chair / Bench, Stairs, then Floor.
- Plans a 7-day week: one Test + Hard day, Hard days, Easy days, and a Rest day. Day 1 is the day you first open it.
- Works out your reps for each set from your weekly max, and runs a 4-minute rest timer with a beep between sets.
- Tells you when to start moving sets to the next surface, and keeps a Progress Log.
- Offers the paper plan, `Pushup_Coach_Plan.pdf`, as a download.

**How to use**
1. Your first workout is a max test. Do as many pushups as you can, type the number in the box under **Max Pushups**, and click **Completed Fitness Set & Pause**.
2. Rest while the timer counts down from 4:00. Click **Skip Rest → Set 2** to go early, or **Start Set 2** when it shows **Ready**. **Undo — I tapped by accident** takes back the last set.
3. Do each set and click **Done Set (number) → Rest 4:00**. On the last set click **Finish Workout**. **Finish workout now** ends the day early.
4. On transition days, check the box (for example **I hit ≥15 reps on Chair / Bench with good form**) before you finish. You can also type your **Reps on (surface) (optional)**.
5. On a rest day, click **Log Rest Day**.
6. Click a day letter in the week strip to see that day's plan. Open **The Full Method** to read how the plan works.

**Settings and options**
- The speaker button at the top turns the rest-timer beep on or off.
- The download button at the top, and **Printable PDF** at the bottom, save the paper plan `Pushup_Coach_Plan.pdf`. The same file is also on the site at `/Pushup_Coach_Plan.pdf`. Printing the page prints a paper plan with a blank workout log.
- **Download** saves your Progress Log as `pushup_progress.csv`.
- **Reset** asks first, then **Reset everything** clears your max, surface, and log, and makes today your new Day 1.

## Add a new tool

All tools are listed in one file, `src/tools.js`. The home page makes one card for each entry in that list.

1. **Create the page.** Make one HTML file for the tool, named after its web address. For a tool at `/stretch-break`:
   - A page that works on its own (plain HTML, or React loaded from a CDN like Pushup Coach): save it as `public/stretch-break.html`. Put any pictures or files it needs in `public/` too.
   - A page that Vite builds (like the breathing tool): save it as `stretch-break.html` in the main folder, put its code in `src/stretch-break/`, and add one line to `build.rollupOptions.input` in `vite.config.js`, for example `'stretch-break': 'stretch-break.html',`.
   - Add a small link back to the home page near the top: `<a href="./">All tools</a>`.
2. **Add one entry to the tools list.** Open `src/tools.js` and add a block like this inside the list:
   ```js
   {
     id: 'stretch-break',
     name: 'Stretch Break',
     description: 'A short list of gentle desk stretches.',
     path: 'stretch-break',
     tag: 'Stretching',   // optional
   },
   ```
   `path` is the file name without `.html`. `tag` is optional. `icon` is also optional: use `'breath'`, `'timer'`, or `'strength'`, or leave it out to show the first letter of the name. Cards appear in the same order as the list.
3. **Build.** Run `npm run dev` to check the new card and page, then run `npm run build`.
4. **Upload.** Upload everything inside `dist/` to your web host, as described in the next section.

## Build and put it on a website
1. Run `npm run build`. This creates a `dist/` folder with the whole site: `index.html` (the home page), `breathing.html`, `timer.html`, `pushup-coach.html`, `Pushup_Coach_Plan.pdf`, `.htaccess`, and `assets/`.
2. Upload everything inside `dist/` to the main (root) folder of your web host. `.htaccess` starts with a dot, so turn on "show hidden files" in your upload program to be sure it is included.
3. To preview the built site on your own computer first, run `npm run preview`.

When you upload a new build, remove the old files in the host's `assets/` folder first, so old files are not left on the server.

Everything in `public/` is copied into `dist/` without changes. That is where the 50 Minute Timer, Pushup Coach, the PDF, and `.htaccess` live.

On an Apache web host, `.htaccess` lets people leave off `.html` (for example `/timer` opens `timer.html`) and holds the redirects for the old addresses. The redirects point to `/timer` and `/pushup-coach` at the top of the site; if you put the site in a subfolder, change those two lines. `npm run dev` and `npm run preview` also open pages without `.html`. It also sends standard security settings with every page: other sites may not show the pages inside a frame, browsers may not guess file types, and links to other sites only share the site name. These need the Apache `mod_headers` module; without it the site still works.

## Safety notes
- This is not medical advice. Stop if you feel dizzy or have pain. Ask your doctor or physical therapist before starting new exercises.
- Each tool saves its settings and logs in your browser's local storage on your own computer. Nothing is sent to a server. To remove it, clear this site's data in your browser settings. **Reset** in Pushup Coach also clears its data.
- If Pushup Coach finds saved data it cannot read, it keeps a copy under a key that starts with `pushupCoach_v5_unreadable_` instead of erasing it.

## Troubleshooting
- **A blank page when I double-click `index.html` or `breathing.html`**: these source files must be served. Use `npm run dev`, or build the site first (see above). `public/timer.html` and `public/pushup-coach.html` open directly in a browser.
- **A card's Open link shows "not found" on my web host**: check that `.htaccess` was uploaded and that the host runs Apache with `mod_rewrite`. You can also open the page with `.html` at the end, for example `/timer.html`.
- **A new tool's card does not show**: check that its entry in `src/tools.js` has a `name` and a `path`, and that each entry ends with `},`. Then run `npm run build` again and upload the new `dist/`.
- **No sound in Pushup Coach**: browsers block sound until you click something on the page. Click a **Done Set** button once. Also check that your device is not muted, and that the speaker button is not set to off.
- **My settings came back to the defaults**: settings live only in browser storage. Clearing it returns every tool to its defaults.

## Single-file version

The `single-file` folder has `easy.html`, the original one-file version of the breathing bubble. It works on its own: open it in a browser, or upload it to any web host. It loads React, Babel, and Tailwind CSS from public CDNs, so it needs an internet connection.

## How it works
The home page and the breathing tool are built by Vite as a multi-page build (`index.html` and `breathing.html`). The home page is plain JavaScript: it reads the list in `src/tools.js` and builds one card per entry, with a single link per card stretched over the whole card so it works with the mouse and the keyboard, and CSS that follows the system light or dark setting (`prefers-color-scheme`). The breathing tool is a React 18 app that uses Tailwind CSS classes and CSS transitions timed to each breathing phase. Pushup Coach is a single HTML file that loads React 18.3.1 from cdnjs with Subresource Integrity hashes, so the browser refuses a changed file; a pure `reduce()` function moves the plan forward, the rest timer counts down from a saved end time, and the beep uses the Web Audio API. The 50 Minute Timer is plain JavaScript that stores the end time, the chosen length and the default in `localStorage`, so it keeps correct time across reloads.

## License

MIT. See [LICENSE](LICENSE).
