# CV site

Static, no build step. Open `index.html` in a browser and it runs.

```
index.html            resume layout, defined once
about.html            personal page: bio, hobbies, goals, social links
projects.html          technical projects, diagrams, skills in practice
assets/content.js     everything all three pages say  <- edit this
assets/styles.css     palette, type, print rules
assets/app.js         renderer + language toggle, shared by all three pages
assets/photo.jpg      your photo (not yet added)
```

## Editing

All copy lives in `content.js`. Translatable values are `{ en, no }` pairs;
dates, emails and URLs are plain strings so they cannot drift between the two
language versions.

`TODO_NO` marks an untranslated field. It renders the English text and logs a
warning to the browser console listing every field still missing Norwegian.
Currently 20 fields.

## Language

Toggle in the top bar. The choice is remembered in `localStorage`, and
`?lang=no` forces Norwegian — useful when applying to a Norwegian-language
posting.

## PDF

`Print / PDF` in the top bar, or Cmd-P. The print stylesheet drops the
navigation and links and reflows to a clean page. Same source as the website,
so there is no separate document to keep in sync.

## Projects

`CONTENT.projects` in `content.js` is shared by two pages:

- **Resume** (`index.html`) hides any entry with `status: "wip"` — the section
  disappears entirely when every entry is `wip`, which is the case today.
- **Projects page** (`projects.html`) shows every entry, `wip` included, with
  a status badge, plus a small left-to-right diagram built from `diagram`
  (an ordered list of stage labels — falls back to `stack` if omitted).

Remove `status: "wip"` as each project ships so it appears on the resume too.

`CONTENT.techSkills` drives the rest of `projects.html`: `core` is a flat list
of your strongest skills (shown in the rail), `practiced` is every skill
you've used with a one-line "what I did with it".

## Deploying to Azure Static Web Apps

1. Push this folder to a public GitHub repo.
2. Azure Portal → Create resource → Static Web App → Free tier.
3. Connect the repo. Build presets: **Custom**.
   - App location: `/`
   - Api location: *(blank)*
   - Output location: *(blank)*
4. Azure writes a GitHub Actions workflow. Every push to `main` deploys;
   pull requests get their own staging URL.
5. Custom domain and managed TLS: Static Web App → Custom domains.

## About page

`about.html` shares the same header, styles and `app.js` renderer as the
resume. Its content lives under `CONTENT.about` in `content.js`:

- `paragraph` — a few sentences about you outside of work
- `hobbies` — a plain list
- `social` — `{ label, url }` entries; an entry with an empty `url` is hidden,
  same convention as `projects`

## Still to fill in

- Profile paragraph (resume) and about paragraph (about page)
- Hobbies list in `content.js`
- Photo at `assets/photo.jpg`, square, plain background
- LinkedIn, GitHub and other profile URLs in `content.js` (`person` and `about.social`)
- Real CEFR levels for Hindi and English
- AZ-900 certification date
- Norwegian translations
