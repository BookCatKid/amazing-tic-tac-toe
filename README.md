# Amazing Tic-Tac-Toe

I've had this idea for a while although its very badle executed here. i wanted to have an extremely diverse selection of tic tac toe variants and combinations and especially very large meta games. Obviously I've mostly failed that here for now, but hopefully that changes in the future

**Play it online:** https://bookcatkid.github.io/amazing-tic-tac-toe/

## Run it locally

```bash
npm install
npm run dev
```

Then go to whatever port Vite tells you (usually `http://localhost:5173`).

## Modes

- **Normal**. The regular grid.
- **Ultimate**. The nested version. Each cell of the outer board is its own little 3x3 board, and where your opponent plays decides where you play next.
- **Reverse** (misère). Same rules but getting three in a row makes you lose.
- **Random**. After every move, the next player is picked at random. Strategy meets coin-flip.
- **SOS**. You place an S or an O each turn instead of an X or O. Spelling "SOS" in any direction scores a point and gives you another turn. Most points when the board fills up wins.

## Stack

- **Vite + React 19 + TypeScript** for the app shell.
- **Tailwind CSS** with a few [shadcn/ui](https://ui.shadcn.com/) components on top of Radix primitives.
- **Zustand** for game state. Idk, I'd never used it before so I figured why not?
- **Framer Motion** for the X/O draw-in animations and page transitions.
- **react-zoom-pan-pinch** so 5x5 and ultimate boards are still usable on a phone screen.
- **react-router-dom** with a hash router so it works on GitHub Pages.

## Scripts

```bash
npm run dev            # start the dev server
npm run build          # type-check and build for production
npm run preview        # preview the production build locally
npm run lint           # run eslint
npm run format         # run prettier --write
npm run format:check   # run prettier --check
npm run deps:check     # see outdated dependencies
npm run deps:update    # interactively update them
```

## Things that aren't there (yet)

- No AI opponent. Two humans on the same device for now.
- No online play.
- No undo/redo button

## License

MIT. Do whatever you want with it. (unlikely you would want to though)
