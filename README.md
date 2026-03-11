
# pi-control-center

A web-based control center and dashboard for Raspberry Pi, featuring real-time system stats with a modern Next.js interface.

## Features

- View Raspberry Pi system information (hostname, platform, architecture, CPU temperature)
- Monitor per-core CPU usage
- Monitor memory usage


## Getting Started

**Prerequisite:** [Node.js](https://nodejs.org/) (v18 or newer) must be installed on your system.

1. **Clone the repository:**
	```sh
	git clone https://github.com/MossDog/raspi-control-center.git
	cd raspi-control-center
	```

2. **Install dependencies:**
	```sh
	npm install
	```

3. **Run the development server:**
	```sh
	npm run dev
	```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` — Next.js app directory
- `lib/` — System info utilities
- `components/` — UI components

## Future Plans

- Image upload and e-paper display integration
- More Pi management features
