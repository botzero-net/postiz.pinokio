# Postiz (Pinokio Launcher)

1-click launcher for [Postiz](https://postiz.com) - open-source social media scheduling with AI.

## Requirements

- **Docker** must be installed and running
- **2GB RAM minimum** (4GB+ recommended)
- **Ports**: 4007 (Postiz), 8080 (Temporal UI)

---

## Installing Docker

Postiz runs in Docker containers. Docker must be installed **before** clicking Install.

### Linux

Run these commands in your terminal:

```bash
# 1. Install Docker
curl -fsSL https://get.docker.com | sudo sh

# 2. Add your user to the docker group
sudo usermod -aG docker $USER

# 3. Apply group changes (choose ONE option)
newgrp docker          # Option A: Start new shell with group
# OR log out and back in   # Option B: Full session refresh

# 4. Verify Docker works
docker run hello-world
```

After completing these steps, click **Install** in Pinokio.

### Windows

1. Download [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
2. Run the installer (requires WSL 2 - installer will prompt if needed)
3. Start Docker Desktop from Start Menu
4. Wait for Docker to be ready (whale icon in system tray stops animating)
5. Open PowerShell and verify:
   ```powershell
   docker run hello-world
   ```
6. Click **Install** in Pinokio

### macOS

1. Download [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
2. Install by dragging to Applications
3. Start Docker Desktop from Applications
4. Wait for Docker to be ready (whale icon in menu bar stops animating)
5. Open Terminal and verify:
   ```bash
   docker run hello-world
   ```
6. Click **Install** in Pinokio

---

## If Pinokio is Running in a Container

If your Pinokio instance is running inside Docker/Podman:

1. **Docker must be installed on the HOST system**, not inside the container
2. Run the Docker installation commands on your **host terminal**, not in Pinokio
3. Alternatively, configure Docker socket passthrough:
   ```bash
   # When running Pinokio container, mount the Docker socket
   docker run -v /var/run/docker.sock:/var/run/docker.sock ...
   ```

---

## Installation

1. Ensure Docker is installed and running (see above)
2. Click **Install** in Pinokio
3. Wait for containers to start (~2-5 minutes first time)
4. Open http://localhost:4007
5. Create your account

---

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

---

## Configuration

To add social media API keys:

1. Edit `app/docker-compose.yaml`
2. Add your API keys in the `environment:` section
3. Restart: `docker compose up -d`

### Where to get API keys

| Platform | Where to get keys |
|----------|-------------------|
| X (Twitter) | [developer.twitter.com](https://developer.twitter.com/) |
| LinkedIn | [linkedin.com/developers](https://www.linkedin.com/developers/) |
| Discord | [discord.com/developers](https://discord.com/developers/) |
| Reddit | [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps) |
| TikTok | [developers.tiktok.com](https://developers.tiktok.com/) |
| YouTube | [console.cloud.google.com](https://console.cloud.google.com/) |
| GitHub | [github.com/settings/developers](https://github.com/settings/developers) |
| Facebook | [developers.facebook.com](https://developers.facebook.com/) |
| Threads | Via [Meta for Developers](https://developers.facebook.com/) |
| Pinterest | [developers.pinterest.com](https://developers.pinterest.com/) |
| Mastodon | Your instance's settings page |

---

## Services

Postiz runs these containers:

| Service | Port | Description |
|---------|------|-------------|
| postiz | 4007 | Main application |
| postiz-postgres | - | PostgreSQL database |
| postiz-redis | - | Redis cache |
| temporal | 7233 | Workflow engine |
| temporal-ui | 8080 | Temporal dashboard |
| temporal-elasticsearch | - | Search backend |
| temporal-postgresql | - | Temporal's database |
| spotlight | 8969 | Sentry debug (optional) |

---

## Troubleshooting

### "Docker Not Running"

- **Linux**: Run `docker info` to check Docker daemon status
- **Windows/macOS**: Ensure Docker Desktop is open and running
- Check the whale/Docker icon in your system tray/menu bar

### Permission Denied (Linux)

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Apply changes
newgrp docker
```

### Port Already in Use

If port 4007 is taken:

1. Edit `app/docker-compose.yaml`
2. Change `"4007:5000"` to another port like `"4008:5000"`
3. Run `docker compose up -d`

### Container Issues

```bash
cd ~/pinokio/api/postiz/app

# Check status
docker compose ps

# View logs
docker compose logs -f postiz

# Full restart
docker compose down && docker compose up -d

# Nuclear option (resets everything)
docker compose down -v && docker compose up -d
```

### First Start is Slow

The initial pull of Docker images takes 2-5 minutes depending on your internet connection. Subsequent starts are much faster.

---

## Links

- [Postiz Website](https://postiz.com)
- [Postiz Documentation](https://docs.postiz.com)
- [Postiz GitHub](https://github.com/gitroomhq/postiz-app)
- [Docker Website](https://www.docker.com)

---

## License

This launcher is MIT licensed. Postiz has its own license - see [postiz-app](https://github.com/gitroomhq/postiz-app).
