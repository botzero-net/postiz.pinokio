module.exports = {
  run: [
    // Step 1: Check if Docker is running
    {
      method: "shell.run",
      params: {
        message: "docker info >/dev/null 2>&1 && echo 'Docker OK' || (echo 'ERROR: Docker is not running' && echo 'Please start Docker and try again' && exit 1)"
      }
    },
    // Step 2: Clone the postiz-docker-compose repository
    {
      method: "shell.run",
      params: {
        message: "test -d app && echo 'Already cloned' || git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app"
      }
    },
    // Step 3: Generate unique JWT secret
    {
      method: "shell.run",
      params: {
        path: "app",
        message: `#!/bin/bash
if grep -q "random string that is unique to every install" docker-compose.yaml 2>/dev/null; then
  JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || head -c 64 /dev/urandom | xxd -p -c 64 2>/dev/null || echo "postiz_$(date +%s)_$$")
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/random string that is unique to every install - just type random characters here!/$JWT_SECRET/" docker-compose.yaml
  else
    sed -i "s/random string that is unique to every install - just type random characters here!/$JWT_SECRET/" docker-compose.yaml
  fi
  echo "Generated unique JWT secret"
else
  echo "JWT secret already configured"
fi
`
      }
    },
    // Step 4: Pull all Docker images
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "echo 'Pulling Docker images...' && docker compose pull"
      }
    },
    // Step 5: Success message
    {
      method: "shell.run",
      params: {
        message: "echo '' && echo '✅ Installation Complete!' && echo '' && echo 'Click Start to launch Postiz' && echo 'Access at: http://localhost:4007' && echo ''"
      }
    }
  ]
}
