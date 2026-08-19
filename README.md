# Ibrahim Abdulrahman Sardauna — Portfolio

Personal portfolio site for Ibrahim Abdulrahman Sardauna, a Frontend Developer & IT Professional. Built as a fast, animated, single-page site showcasing selected projects, skills, and experience.

**Live app:** _add your production URL here_

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [TanStack Start](https://tanstack.com/start) (SSR) + [TanStack Router](https://tanstack.com/router)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [TanStack Query](https://tanstack.com/query) for data fetching

## Sections

- **Hero** — introduction and primary calls to action
- **About** — background and focus areas
- **Skills** — frontend, backend & database, tools, and currently-learning groups
- **Projects** — House of Faham, Spamassage, Campus Connect, RideWise NG, DConnect, and Peng Collection, each with a detail modal (overview, stack, features, case study)
- **Experience** — career timeline
- **Resume** — view/download resume
- **Contact** — email and social links

## Getting Started

This project uses [Bun](https://bun.sh/) as the package manager, but `npm`/`pnpm`/`yarn` will also work since all dependencies are published on the public npm registry.

```sh
git clone <this-repository-url>
cd <repository-name>
bun install
bun run dev
```

Other available scripts:

```sh
bun run build       # production build
bun run build:dev   # development-mode build
bun run preview     # preview the production build locally
bun run lint        # run eslint
bun run format      # run prettier
```

## Project Structure

```
src/
├── assets/         # static asset metadata
├── components/     # page sections and shadcn/ui primitives
│   ├── motion/     # small reusable animation wrappers
│   └── ui/         # shadcn/ui components
├── data/           # portfolio content (projects, etc.)
├── hooks/          # custom React hooks
├── lib/            # utilities, error handling, asset helpers
├── routes/         # TanStack Router file-based routes
├── router.tsx       # router setup
├── server.ts        # SSR server entry
├── start.ts          # TanStack Start instance & middleware
└── styles.css        # global styles & design tokens
```

See `src/routes/README.md` for routing conventions.

## Deployment

The build output is compatible with [Vercel](https://vercel.com/). Connect the repository and deploy — no additional configuration is required beyond standard environment variables, if any are introduced later.

## License

This project is private and not licensed for reuse.
