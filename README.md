# Postiz (Pinokio Launcher)

1-click launcher for [Postiz](https://github.com/gitroomhq/postiz-app) - social media scheduling with AI.

## Installation

1. Click **Install**
   - Auto-installs Docker if needed
   - Clones the Postiz repo
   - Generates unique JWT secret
   - Tells you if ready or if to restart

2. If prompted to **RESTART PINOKIO** (close Pinokio app, reopen it click Install again)
   - Setup completes
   - Click **Start**

3. Click **Start** to launch Postiz at http://localhost:4007

## Requirements

- 2GB RAM minimum
- Docker will be auto-installed if missing

## Configure Social Media

Edit `app/docker-compose.yaml` to add your API keys for X, LinkedIn, Reddit, Discord, Threads, TikTok, YouTube, Pinterest:

Get keys from:
- [X Developer Portal](https://developer.twitter.com/)
- [LinkedIn Developers](https://www.linkedin.com/developers/)
- [Discord Developer Portal](https://discord.com/developers/)
