# Postiz (Pinokio Launcher)

1-click Pinokio launcher for [Postiz](https://github.com/gitroomhq/postiz-app) - social media scheduling with AI.

## Installation

1. Click **Install** (auto-installs Docker if needed, clones repo, generates config)
2. Click **Start** (launches containers)
3. Open **http://localhost:4007**

**Note for Linux:** After first install, run `newgrp docker` or log out/back in, then click Install again.

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
