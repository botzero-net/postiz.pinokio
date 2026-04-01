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
- **RAM:** 2GB minimum, 4GB recommended
- **Disk:** ~2GB for images + data

## Installation

### 1. Install

Click **Install** to:
- Clone the Postiz Docker Compose repository
- Generate a secure configuration with random JWT secret
- Pull all required Docker images

### 2. Start

Click **Start** to launch all services:
- Postiz app (port 4007)
- PostgreSQL database
- Redis cache
- Temporal workflow engine
- Elasticsearch

First startup takes 1-2 minutes. Wait for "healthy" status before accessing the app.

### 3. Access

Open your browser to: **http://localhost:4007**

Create your account and start scheduling posts!

## Configuration

### Quick Config

1. Click **Configure** to open the `.env` file
2. Add your social media API keys (see below)
3. Save the file
4. Click **Stop** then **Start** to apply changes

### Social Media Setup

Postiz requires API credentials from each platform you want to use:

| Platform | How to Get Credentials |
|----------|----------------------|
| X (Twitter) | [Developer Portal](https://developer.twitter.com/) |
| LinkedIn | [Developer Portal](https://www.linkedin.com/developers/) |
| Reddit | [App Preferences](https://www.reddit.com/prefs/apps) |
| Discord | [Developer Portal](https://discord.com/developers/) |
| Threads | [Meta for Developers](https://developers.facebook.com/) |
| TikTok | [Developer Portal](https://developers.tiktok.com/) |
| YouTube | [Google Cloud Console](https://console.cloud.google.com/) |

Add the credentials to your `.env` file:
```env
X_API_KEY=your-api-key
X_API_SECRET=your-api-secret
```

### AI Features

To enable AI content generation:
```env
OPENAI_API_KEY=sk-your-openai-key
```

### Storage

**Default:** Local file storage in Docker volume

**Cloudflare R2 (recommended for production):**
```env
STORAGE_PROVIDER=cloudflare
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ACCESS_KEY=your-access-key
CLOUDFLARE_SECRET_ACCESS_KEY=your-secret-key
CLOUDFLARE_BUCKETNAME=your-bucket
CLOUDFLARE_BUCKET_URL=https://your-bucket.r2.cloudflarestorage.com/
```

## Ports

| Service | Port | Purpose |
|---------|------|---------|
| Postiz | 4007 | Main web interface |
| Temporal UI | 8080 | Workflow monitoring |

## Troubleshooting

### "Containers not starting"

Check logs with the **Logs** button. Common issues:
- Not enough RAM (needs 2GB+)
- Docker not running
- Port 4007 already in use

### "Can't connect to Postiz"

Wait 1-2 minutes after clicking Start. Check that all containers show "healthy" status.

### "Changes not taking effect"

After editing configuration:
1. Click **Stop**
2. Wait for containers to stop
3. Click **Start**

### "Reset everything"

Click **Reset** to:
- Stop and remove all containers
- Delete all data (database, uploads, etc.)
- Remove configuration files

You'll need to reinstall after a reset.

## Architecture

Postiz runs 8 Docker containers:

1. **postiz** - Main application (Next.js frontend + NestJS backend)
2. **postiz-postgres** - PostgreSQL database
3. **postiz-redis** - Redis cache
4. **temporal** - Workflow engine for scheduled posts
5. **temporal-postgresql** - Temporal's database
6. **temporal-elasticsearch** - Temporal's search index
7. **temporal-ui** - Temporal monitoring interface
8. **spotlight** - Sentry debugging (optional)

## Credits

- [Postiz](https://github.com/gitroomhq/postiz-app) by GitRoom
- [Postiz Docker Compose](https://github.com/gitroomhq/postiz-docker-compose)
- [Documentation](https://docs.postiz.com)
