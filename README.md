# Postiz (Pinokio Launcher)

1-click launcher for [Postiz](https://postiz.com) - open-source social media scheduling with AI.

## Requirements

- **Docker** must be installed and running:
  - **Windows/macOS**: [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  - **Linux**: Auto-installed via `get.docker.com`
- **2GB RAM minimum** (4GB+ recommended)
- **Ports**: 4007 (Postiz), 8080 (Temporal UI)

## Installation

### Step 1: Install

Click **Install** in Pinokio. The installer will:

1. Check if Docker is available
2. If Docker is missing on Linux → Auto-install and prompt for restart
3. If Docker is missing on Windows/macOS → Show Docker Desktop download link
4. Clone the Postiz repository
5. Generate a unique JWT secret
6. Pull all Docker images
7. Start all containers

### Step 2: First-Time Setup

1. Open http://localhost:4007
2. Create your account
3. Start scheduling posts!

## After Docker Install (Linux Only)

If Docker was just installed on Linux, you need to refresh your session:

**Option A: Restart Pinokio**
- Close Pinokio completely
- Reopen Pinokio
- Click Install again

**Option B: Terminal command**
```bash
newgrp docker
```
Then click Install again in Pinokio.

## Features

Postiz supports scheduling to:
- X (Twitter)
- LinkedIn
- Reddit
- Discord
- Threads
- TikTok
- YouTube
- Pinterest
- Dribbble
- Slack
- Mastodon
- Facebook
- GitHub
- Beehiiv

## Configuration

To add social media API keys:

1. Edit `app/docker-compose.yaml`
2. Add your API keys in the environment section
3. Restart: `docker compose up -d`

Get API keys from:
- [X Developer Portal](https://developer.twitter.com/)
- [LinkedIn Developers](https://www.linkedin.com/developers/)
- [Discord Developer Portal](https://discord.com/developers/)
- [Reddit Apps](https://www.reddit.com/prefs/apps)
- [TikTok for Developers](https://developers.tiktok.com/)
- [YouTube Data API](https://console.cloud.google.com/)

## Services

Postiz runs multiple containers:
- **postiz** - Main application (port 4007)
- **postiz-postgres** - PostgreSQL database
- **postiz-redis** - Redis cache
- **temporal** - Workflow engine
- **temporal-ui** - Temporal dashboard (port 8080)
- **temporal-elasticsearch** - Search backend
- **temporal-postgresql** - Temporal database

## Troubleshooting

### "Docker Not Running"
- Ensure Docker Desktop is running (Windows/macOS)
- Run `docker info` in terminal to verify Docker works

### Port Conflicts
If port 4007 is in use:
1. Edit `app/docker-compose.yaml`
2. Change `"4007:5000"` to another port like `"4008:5000"`
3. Run `docker compose up -d`

### Container Issues
```bash
# Check container status
docker compose ps

# View logs
docker compose logs -f

# Full restart
docker compose down && docker compose up -d
```

## Links

- [Postiz Website](https://postiz.com)
- [Postiz Documentation](https://docs.postiz.com)
- [Postiz GitHub](https://github.com/gitroomhq/postiz-app)
- [Docker Hub](https://hub.docker.com)

## License

This launcher is MIT licensed. Postiz has its own license - see [postiz-app](https://github.com/gitroomhq/postiz-app).
