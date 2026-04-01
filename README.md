# Postiz (Pinokio Launcher)

1-click Pinokio launcher for [Postiz](https://github.com/gitroomhq/postiz-app) - the open-source social media scheduling tool with AI.

## What is Postiz?

Postiz is a modern alternative to Buffer, Hypefury, and other social media scheduling tools. Features:

- **Multi-platform posting** - Schedule to X, LinkedIn, Reddit, Discord, Threads, TikTok, YouTube, Pinterest, Dribbble, Slack, Mastodon, Facebook, GitHub, and more
- **AI-powered content** - Generate captions, hashtags, and post variations
- **Analytics** - Track engagement across platforms
- **Team collaboration** - Invite team members to collaborate
- **Self-hosted** - Full control over your data

## Requirements

- **Docker** - Must be installed and running
  - Install Docker Desktop (Mac/Windows) or Docker Engine (Linux)
- **RAM:** 2GB minimum, 4GB recommended
- **Disk:** ~2GB for images + data

### Docker Installation

If you don't have Docker installed:

**Mac/Windows:** Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)

**Linux:**
```bash
curl -fsSL https://get.docker.com | sh
# Add your user to docker group
sudo usermod -aG docker $USER
# Log out and log back in, OR run: newgrp docker
```

## Installation

### 1. Install

Click **Install** to:
- Verify Docker is running
- Clone the postiz-docker-compose repository
- Generate a unique JWT secret
- Pull all Docker images

First run takes 1-2 minutes depending on your internet speed.

### 2. Start

Click **Start** to launch all containers. First startup takes 1-2 minutes.

Access Postiz at: **http://localhost:4007**

### 3. Configure Social Media

Edit `app/docker-compose.yaml` to add your social media API keys.

#### Example for X (Twitter)
```yaml
X_API_KEY: 'your-api-key'
X_API_SECRET: 'your-api-secret'
```

Get your API keys from:
- [X Developer Portal](https://developer.twitter.com/)
- [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
- [Reddit App Preferences](https://www.reddit.com/prefs/apps)
- [Discord Developer Portal](https://discord.com/developers/)

### 4. Stop

Click **Stop** to gracefully shut down all containers. Your data persists.

### 5. Reset

Click **Reset** to remove all containers and delete all data. You'll need to reinstall.

## Ports

| Service | Port | Purpose |
|---------|------|---------|
| Postiz | 4007 | Main web interface |
| Temporal UI | 8080 | Workflow monitoring |

## Troubleshooting

### "Docker not found"

Make sure Docker is installed and running. On Linux:
```bash
# Start Docker
sudo systemctl start docker

# Check status
sudo systemctl status docker
```

### "Port 4007 in use"

Stop any other service using port 4007:
```bash
# Find what's using port 4007
sudo lsof -i :4007
```

### "Can't connect to Postiz"

Wait 1-2 minutes after starting. All containers need time to initialize.

Check container status:
```bash
cd app
docker compose ps
```

### "View Logs"

Click **Logs** to see container output.

## Credits

- [Postiz](https://github.com/gitroomhq/postiz-app) by GitRoom
- [Postiz Docker Compose](https://github.com/gitroomhq/postiz-docker-compose)
- [Documentation](https://docs.postiz.com)
