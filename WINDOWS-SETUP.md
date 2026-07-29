# Windows Setup

Follow these steps once, then day-to-day work is `.\preview.ps1` → edit → `.\build.ps1` → paste.

---

## First-time setup

### 1. Extract the repo

Extract the tarball into `C:\Users\Ibaraki\Desktop\Jedi Website\` so the structure is:

```
C:\Users\Ibaraki\Desktop\Jedi Website\
├── README.md
├── CLAUDE.md
├── build.ps1
├── preview.ps1
├── src\
├── squarespace\
└── docs\
```

### 2. Install prerequisites (pick one)

You need **either** Python **or** Node.js to run the local preview server.

- **Python (recommended, lightest):** Windows 11 has it in the Microsoft Store. Or grab it from python.org. Verify with `python --version` in PowerShell.
- **Node.js:** If you already have it for other projects, `npx` works too. Verify with `node --version`.

You do NOT need both. `preview.ps1` uses whichever is available.

### 3. Allow local PowerShell scripts

By default, Windows blocks unsigned PowerShell scripts. Open PowerShell **as Administrator** and run this **once**:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

This allows scripts you write yourself to run, while still blocking unsigned scripts downloaded from the internet.

### 4. Initialize git (optional but recommended)

```powershell
cd "C:\Users\Ibaraki\Desktop\Jedi Website"
git init
git add .
git commit -m "initial: v7 homepage extracted from prototype"
```

Push to GitHub if you want cloud backup and history.

---

## Daily workflow

### To preview locally

```powershell
cd "C:\Users\Ibaraki\Desktop\Jedi Website"
.\preview.ps1
```

Then open http://localhost:8000/homepage.html in your browser. Refresh after edits.

### To make a change

1. Edit any file in `src\` (e.g. `src\data\schedule.js` to change a class time)
2. Refresh the browser to see the change locally
3. When it looks right, regenerate the deploy files:

```powershell
.\build.ps1
```

4. Copy the changed file from `squarespace\` and paste into Squarespace per `squarespace\README.md`

### To deploy the current state

Follow `squarespace\README.md`. In short:

- `squarespace\custom-css.css` → Design → Custom CSS
- `squarespace\header-injection.html` → Settings → Advanced → Code Injection → Header
- `squarespace\homepage-code-block.html` → Homepage → Code Block

---

## Working with Claude Code on Windows

Claude Code runs natively on Windows via the CLI. Once installed:

```powershell
cd "C:\Users\Ibaraki\Desktop\Jedi Website"
claude
```

Claude Code will auto-read `CLAUDE.md` and have full project context. Ask it things like:

- "Update Nick Giles' bio in coaches.js with these new credentials..."
- "Add a filter button for Homeschool to the schedule"
- "Fix the modal z-index issue on Jamie's live Squarespace"
- "Write a section for testimonials that pulls from Google Places API"

After Claude Code makes changes, always run `.\build.ps1` to regenerate the Squarespace deploy files before pasting.

---

## Windows-specific gotchas

### Line endings

Git on Windows can auto-convert LF to CRLF on checkout, which sometimes breaks Squarespace's Code Block parser. If you see weirdness after paste, run this once:

```powershell
git config --global core.autocrlf input
```

This tells git to store LF in the repo and keep LF on checkout.

### File paths in scripts

If you edit `build.ps1` or `preview.ps1`, always use backslash paths (`src\styles.css`, not `src/styles.css`) or PowerShell's `Join-Path` helper. Mixing separators works most of the time but breaks on some edge cases.

### Encoding

PowerShell's `Set-Content` writes UTF-16 by default on older Windows. `build.ps1` uses `-NoNewline` and PowerShell 5.1+'s default UTF-8 to avoid this, but if you see mojibake in the Squarespace paste (curly quotes turning into `â€™`), open the generated file in VS Code and re-save with UTF-8 encoding.

### PowerShell vs Command Prompt

Always use **PowerShell**, not `cmd.exe`. Command Prompt won't run `.ps1` files.
