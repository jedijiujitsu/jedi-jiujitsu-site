# VS Code Setup

Everything you need to know to work on this repo efficiently in VS Code on Windows.

---

## First-time setup (five minutes)

### 1. Open the folder

`File → Open Folder` → select `C:\Users\Ibaraki\Desktop\Jedi Website`.

### 2. Install recommended extensions

VS Code will show a popup: *"This workspace has extension recommendations. Would you like to install them?"* Click **Install All**.

If you miss the popup, open the Extensions sidebar (`Ctrl+Shift+X`) and search `@recommended` — you'll see six suggestions from `.vscode/extensions.json`. The important one is **Live Server** (by Ritwick Dey).

### 3. Verify Live Server works

Open `src/homepage.html` in the editor, then either:
- Click **Go Live** in the status bar (bottom right), or
- Right-click the file → **Open with Live Server**

The site opens at `http://localhost:8000/homepage.html` and **auto-reloads on every save**.

That's it. You're set up.

---

## Daily workflow in VS Code

### Iterate on the design

1. Open `src/homepage.html`, click **Go Live** once (bottom status bar).
2. Edit any file in `src/` — `styles.css`, `data/coaches.js`, `scripts.js`, whatever.
3. Save (`Ctrl+S`). Browser reloads instantly.
4. Keep going until the change looks right.

### Push to Squarespace

Fastest path is the compound task:

1. `Ctrl+Shift+P` → type "Run Task" → **Build + copy homepage to clipboard**
2. Alt-tab to Squarespace
3. Paste into the homepage Code Block

Two clicks and a paste. Total: ~5 seconds.

For CSS-only changes:

1. `Ctrl+Shift+P` → **Run Task** → **Build (regenerate squarespace/)**
2. `Ctrl+Shift+P` → **Run Task** → **Copy custom-css.css to clipboard**
3. Paste into Squarespace's Custom CSS panel

### Explore the deploy folder

`Ctrl+Shift+P` → **Run Task** → **Open Squarespace deploy folder** opens `squarespace/` in Windows Explorer if you need to grab files directly.

---

## Keyboard shortcuts worth learning

| Shortcut | What it does |
|---|---|
| `Ctrl+Shift+P` | Command palette (start here for anything) |
| `Ctrl+P` | Quick file open by name (`Ctrl+P` → type `coach` → Enter) |
| `Ctrl+Shift+F` | Search across all files (`Ctrl+Shift+F` → "Jamie Mickle" finds every mention) |
| `Ctrl+B` | Toggle sidebar |
| `Ctrl+\`` | Toggle terminal |
| `F5` | If you set up a launch config later, runs the debugger |
| `Alt+Shift+F` | Format document (careful — off by default in this repo) |
| `Ctrl+D` | Select next occurrence of highlighted word (multi-cursor edit) |
| `Ctrl+Shift+L` | Select all occurrences of highlighted word |

---

## Common tasks

### Change a class time

1. `Ctrl+P` → type `schedule` → Enter (opens `src/data/schedule.js`)
2. Find the class, change the `time` field, save
3. Look at browser — Live Server has already reloaded it
4. `Ctrl+Shift+P` → **Run Task** → **Build + copy homepage to clipboard**
5. Paste into Squarespace

### Update a coach bio

1. `Ctrl+P` → type `coaches` → Enter
2. Find the coach's entry, edit the `bio` array or `creds` array
3. Save, verify in browser
4. Build + paste as above

### Add a new nav link

1. Open `src/homepage.html`
2. Find the `.nav-links` block near the top
3. Add a new `<a>` matching the pattern
4. Save, verify — the smooth scroll and hover underline work automatically because they're scoped to `.nav-links a`

### Debug something that "works locally but breaks in Squarespace"

Check `docs/migration-notes.md` first — it covers the three known trap doors (modal z-index, schedule animation, IG feed). If it's a new issue:

1. Open Squarespace live site, F12 → Elements
2. Find the element that's misbehaving, note any Squarespace classes wrapping it
3. In `src/styles.css`, add a more specific selector using those parent classes
4. Rebuild + repaste

---

## Working with Claude Code alongside VS Code

Two good patterns:

### Pattern A: Claude Code in the integrated terminal

`Ctrl+\`` opens the integrated PowerShell terminal. Run `claude` from there. Claude Code and VS Code share the same working directory, so file changes Claude Code makes appear instantly in the editor.

### Pattern B: Claude Code as a coding partner in a separate window

Keep VS Code open with `homepage.html` on the left half of your monitor, Claude Code in a PowerShell window on the right half. You describe the change, Claude Code makes it, you see it happen in VS Code's file explorer and immediately verify in the browser.

Either way: when Claude Code says "done", always Save All in VS Code (`Ctrl+K S`) before rebuilding to make sure no unsaved buffer overrides its changes.

---

## Turning off things you don't want

### Prettier reformatting every file

`.vscode/settings.json` has `"editor.formatOnSave": false` — this is intentional. HTML destined for Squarespace often has intentional whitespace and comment structure we don't want Prettier touching. If you want format-on-save for one file type only:

```json
"[css]": {
  "editor.formatOnSave": true
}
```

### Live Server opening a different file by default

If Live Server opens `index.html` instead of `homepage.html`, change `.vscode/settings.json`:

```json
"liveServer.settings.NoBrowser": false,
"liveServer.settings.CustomBrowser": "chrome",
"liveServer.settings.file": "homepage.html"
```

### Auto-save

VS Code has an `autoSave` setting many people love. It works fine here, but **be aware**: if Live Server auto-reloads on save AND you have auto-save on every keystroke, your browser flickers constantly. Use `"files.autoSave": "onFocusChange"` instead — saves when you tab out of the file, not every keystroke.

---

## What's in `.vscode/`

- **`settings.json`** — enforces LF line endings, UTF-8, disables autoformatting, sets up Live Server
- **`tasks.json`** — the tasks accessible via `Ctrl+Shift+P → Run Task`
- **`extensions.json`** — the recommended extension list VS Code prompts you to install

None of these are secret or user-specific — they're checked into git so Claude Code (or anyone else) picks up the same workflow.
