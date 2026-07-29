# jedi-jiujitsu-site

Source code for the Jedi Jiu-Jitsu (Tulsa, OK) homepage redesign. Deploy target is Squarespace 7.0 (Bedford template family) via copy-paste.

## Quick start

- **VS Code setup:** see `VSCODE-SETUP.md` (recommended workflow)
- **General Windows setup:** see `WINDOWS-SETUP.md`
- **Preview locally:** click **Go Live** in VS Code, or run `.\preview.ps1`
- **Regenerate deploy files:** `Ctrl+Shift+P` → `Run Task` → `Build`, or run `.\build.ps1`
- **Deploy to Squarespace:** see `squarespace/README.md`
- **Make changes:** see `docs/update-workflow.md`
- **Full project context (for Claude Code):** see `CLAUDE.md`

## Repo layout

```
src/                       source of truth
├── homepage.html            structural markup
├── styles.css               all CSS
├── scripts.js               interaction logic
└── data/
    ├── coaches.js           COACHES array
    ├── schedule.js          SCHEDULE_DATA array
    └── programs.js          PROGRAMS array

squarespace/               deploy targets (regenerated from src/)
├── custom-css.css           → Design → Custom CSS
├── header-injection.html    → Settings → Code Injection → Header
├── homepage-code-block.html → Homepage Code Block
└── README.md                deploy cheat sheet

docs/
├── update-workflow.md       how to change and re-deploy
└── migration-notes.md       Squarespace injection quirks (modals, schedule, IG)

.vscode/                   VS Code workspace config
.editorconfig              cross-editor consistency
build.ps1 / build.sh       regenerate squarespace/ from src/
preview.ps1                Windows local dev server
CLAUDE.md                  project primer for Claude Code
WINDOWS-SETUP.md           Windows-specific setup and workflow
VSCODE-SETUP.md            VS Code specific workflow guide
```

## What Jamie still owes

- Real photography (hero + 8 coach portraits + IG feed content)
- Copy for Muay Thai / Private Sessions / Kids Competition Training program modals
- Confirmation of per-class coach assignments in `schedule.js`
- Google Reviews widget install (Elfsight recommended)
- Instagram feed widget install (Behold recommended)
