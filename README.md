# Package Analyzer

A web app that lets you upload or paste a `package.json` and get a visual, actionable breakdown of your project's dependencies.

---

## ✨ Features

* **Upload or paste `package.json`** — instant validation and analysis.
* **Dependency breakdown** — compare `dependencies` vs `devDependencies`, optional `peerDependencies` surface.
* **Size impact** — estimate per‑package install size (gzip/minified); see heaviest offenders.
* **Outdated & deprecated** — flag packages behind latest, show semver diff and deprecation notices.
* **License info** — collect and display package license fields and links.
* **Visualizations** — charts and tables (Recharts/Chart.js) for weight, category, and version skew.
* **Export report** — export results as **JSON** (and optionally **PDF**).

> **Package Size Estimation**
> By default, the app queries the **Bundlephobia** API to estimate sizes. Because Bundlephobia has rate limits, gaps in coverage, and occasional timeouts, a **custom size analyzer** implementation (local/minimal build) is being considered as a potential fallback. See *“Package Size Estimation: How It Works”* for details.

---

## 🛠️ Tech Stack

* **Frontend:** React + TypeScript + (Recharts or Chart.js)
* **Backend:** Node.js + Express + TypeScript
* **APIs:** npm Registry, Bundlephobia (custom analyzer under consideration)

---

## 🚀 Getting Started

### Prerequisites

* Node.js **v18+**
* pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**

```sh
git clone <repo-url>
cd package-analyzer
```

2. **Install dependencies**

```sh
cd server && pnpm install
cd ../client && pnpm install
```

3. **Run the backend**

```sh
cd ../server
pnpm run dev
```

4. **Run the frontend**

```sh
cd ../client
pnpm run dev
```

> Tip: If you later add a pnpm workspace at the repo root, you can streamline to `pnpm -r install` and `pnpm -r dev`.

---

## 📁 Project Structure

```
package-analyzer/
├─ client/                 # React frontend
│  └─ src/
│     ├─ components/
│     ├─ pages/
│     ├─ utils/
│     └─ charts/
├─ server/                 # Node + Express backend
│  └─ src/
│     ├─ routes/
│     ├─ services/
│     ├─ utils/
│     └─ index.ts
├─ README.md
└─ project details.md
```

---

## 📦 Package Size Estimation: How It Works

**Default: Bundlephobia**

* Quick, remote size estimates for many packages.
* Fields typically include `size` (minified) and `gzip` (gzipped bundle).

**Potential fallback: Custom Analyzer (under consideration)**

* If implemented, when Bundlephobia is rate‑limited, times out, or lacks data, the backend could:

  1. Fetch the package tarball from the npm Registry.
  2. Build a minimal bundle (e.g., with esbuild/rollup) targeting ESM/CJS entry.
  3. Compute minified and gzipped sizes.
* Potential pros: fewer external limits; works for private/edge packages.
* Potential cons: slower; requires build tooling and sandboxing.

**Why consider a fallback?**

* **API limitations & rate limits**
* **Coverage gaps** for some versions or scoped/private packages
* **Stability** during large analyses

**Proposed configuration** (if implemented):

* `BUNDLEPHOBIA_BASE_URL` — override the API endpoint
* `SIZE_ANALYZER_MODE` — `bundlephobia` | `custom` | `auto` (use custom only on failure)
* `SIZE_ANALYZER_TIMEOUT_MS` — max per‑package analysis time

> *Note:* When using the custom analyzer, the app never sends your code to third‑party services; it only downloads public packages from npm.

---

## 🌐 API Endpoints

### POST `/api/packages/analyze`

Analyze a raw `package.json`.

**Request**

```json
{
  "packageJson": {
    "name": "my-app",
    "dependencies": {
      "react": "^18.3.0",
      "lodash": "^4.17.21"
    },
    "devDependencies": {
      "typescript": "^5.5.0"
    }
  }
}
```

**Response (shape example)**

```json
{
  "summary": {
    "total": 3,
    "dependencies": 2,
    "devDependencies": 1,
    "outdated": 1,
    "deprecated": 0,
    "estimatedTotalGzip": 42000
  },
  "packages": [
    {
      "name": "react",
      "requested": "^18.3.0",
      "resolved": "18.3.1",
      "latest": "18.3.1",
      "outdated": false,
      "deprecated": false,
      "license": "MIT",
      "links": {
        "npm": "https://www.npmjs.com/package/react",
        "repo": "https://github.com/facebook/react"
      },
      "size": { "minified": 123456, "gzip": 42000 }
    },
    {
      "name": "lodash",
      "requested": "^4.17.21",
      "resolved": "4.17.21",
      "latest": "4.17.21",
      "outdated": false,
      "deprecated": false,
      "license": "MIT",
      "links": {
        "npm": "https://www.npmjs.com/package/lodash",
        "repo": "https://github.com/lodash/lodash"
      },
      "size": { "minified": 70000, "gzip": 24000 }
    }
  ]
}
```

### GET `/api/packages/info/:name`

Fetch npm metadata for a package name (optionally consider version via query param).

**Response (shape)**

```json
{
  "name": "react",
  "latest": "18.3.1",
  "deprecated": false,
  "license": "MIT",
  "description": "React is a JavaScript library for building user interfaces.",
  "repository": "https://github.com/facebook/react",
  "homepage": "https://react.dev/"
}
```

### GET `/api/packages/size/:name/:version`

Return the size estimate for a package.

**Response (shape)**

```json
{ "name": "react", "version": "18.3.1", "minified": 123456, "gzip": 42000 }
```

---

## 🧭 Development Plan

* **Week 1:** scaffolding, UI, file upload/paste, JSON validation
* **Week 2:** backend analyzer, npm/Bundlephobia integration; evaluate custom analyzer approach
* **Week 3:** charts/tables, filters, UX polish
* **Week 4:** errors, export, mobile tweaks, deployment, docs

**Stretch goals**

* Caching layer (npm & size results)
* CI pipeline, linting, type‑safe API
* `peerDependencies` & `optionalDependencies` surfacing
* Vulnerability surface (npm advisories)

---

## 🧪 Scripts (suggested)

**server**

* `dev` — ts‑node/tsx watch server
* `build` — tsc compile output to `dist/`
* `start` — run compiled server

**client**

* `dev` — Vite/Next/CRA dev server
* `build` — production build
* `preview` — preview build locally

---

## 📄 License

ISC

---

## 🤝 Contributing

Issues and PRs are welcome! If you implement a new analyzer or chart, please include a short note in the PR describing the approach and any trade‑offs.
