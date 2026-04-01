# Postiz (Pinokio Launcher)

1-click Pinokio launcher for [Postiz](https://github.com/gitroomhq/postiz-app).

## ⚠️ REQUIREMENT: Docker must be installed

**Postiz runs in Docker containers. You MUST have Docker installed before using this launcher.**

### Install Docker

**Linux:**
```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker
```

**Mac/Windows:** Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)

**Verify Docker works:**
```bash
docker info
```

If you see "permission denied", run `newgrp docker` or log out and back in.

---

## Installation

1. **Install Docker** (see above)
2. Click **Install** in Pinokio (clones repo, generates JWT secret)
3. Click **Start** (launches 8 Docker containers)
4. Open **http://localhost:4007**

---

## What is Postiz?

Open-source social media scheduling tool with AI:
- Schedule posts to X, LinkedIn, Reddit, Discord, Threads, TikTok, YouTube, Pinterest, Dribbble, Slack, Mastodon, Facebook, GitHub
- AI-powered content generation
- Analytics and team collaboration

---

## Ports

| Service | Port |
|---------|------|
| Postiz | 4007 |
| Temporal UI | 8080 |

---

## Configure Social Media

Edit `app/docker-compose.yaml` to add your API keys:

```yaml
X_API_KEY: 'your-twitter-api-key'
X_API_SECRET: 'your-twitter-api-secret'
OPENAI_API_KEY: 'sk-your-openai-key'
```

Get API keys from:
- [X Developer Portal](https://developer.twitter.com/)
- [LinkedIn Developers](https://www.linkedin.com/developers/)
- [OpenAI](https://platform.openai.com/)

---

## Troubleshooting

### "docker: command not found"

Install Docker first (see above).

### "permission denied"

```bash
newgrp docker
```

Or log out and log back in.

### "port 4007 already in use"

```bash
lsof -i :4007  # Find what's using it
```

---

## Credits

- [Postiz](https://github.com/gitroomhq/postiz-app)
- [Postiz Docker Compose](https://github.com/gitroomhq/postiz-docker-compose)
