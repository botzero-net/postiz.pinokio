module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        message: "docker info >/dev/null 2>&1 && echo '✓ Docker is running' || (echo '✗ Docker is not running' && echo 'Please start Docker Desktop or run: sudo systemctl start docker' && echo 'Then try again.' && exit 1)"
      }
    },
    {
      method: "shell.run",
      params: {
        message: "test -d app && echo '✓ Repository cloned' || git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: `
if grep -q "random string that is unique to every install" docker-compose.yaml 2>/dev/null; then
  JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || head -c 64 /dev/urandom | xxd -p -c 64 2>/dev/null || echo "postiz_$$(date +%s)_$$")
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/random string that is unique to every install - just type random characters here!/$JWT_SECRET/" docker-compose.yaml
  else
    sed -i "s/random string that is unique to every install - just type random characters here!/$JWT_SECRET/" docker-compose.yaml
  fi
  echo "✓ Generated unique JWT secret"
else
  echo "✓ JWT secret already configured"
fi
`
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "echo 'Pulling Docker images...' && docker compose pull"
      }
    },
    {
      method: "shell.run",
      params: {
        message: "echo '' && echo '═════════════════════════════════════' && echo '  ✅ Installation Complete!' && echo '═══════════════════════════════════' && echo '' && echo 'Click Start to launch Postiz' && echo 'First startup takes 1-2 minutes.' && echo '' && echo 'Access Postiz at: http://localhost:4007' && echo '' && echo 'To configure social media integrations,' && echo 'edit: app/docker-compose.yaml' && echo ''"
      }
    }
  ]
}
