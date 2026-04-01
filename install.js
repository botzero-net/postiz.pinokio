module.exports = {
  run: [
    // Check if Docker is installed and running
    {
      method: "shell.run",
      params: {
        message: [
          "if ! docker info >/dev/null 2>&1; then",
          "  echo 'Docker not found. Installing...'",
          "  curl -fsSL https://get.docker.com | sudo sh",
          "  sudo usermod -aG docker $USER",
          "  echo ''",
          "  echo '═══════════════════════════════════════════'",
          "  echo '  Docker has been installed!'",
          "  echo '═══════════════════════════════════════════'",
          "  echo ''",
          "  echo 'Please run this command in a terminal:'",
          "  echo '  newgrp docker'",
          "  echo ''",
          "  echo 'Then click Install again in Pinokio.'",
          "  echo ''",
          "  exit 0",
          "fi",
          "echo '✓ Docker is running'"
        ]
      }
    },
    // Clone postiz-docker-compose
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: [
          "git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app"
        ]
      }
    },
    // Generate JWT secret
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || echo \"postiz_$(date +%s)_$$\")",
          "if [[ \"$OSTYPE\" == \"darwin\"* ]]; then",
          "  sed -i '' \"s/random string that is unique to every install - just type random characters here!/$JWT_SECRET/\" docker-compose.yaml",
          "else",
          "  sed -i \"s/random string that is unique to every install - just type random characters here!/$JWT_SECRET/\" docker-compose.yaml",
          "fi",
          "echo '✓ Generated unique JWT secret'"
        ]
      }
    },
    // Pull images
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Pulling Docker images (this takes a few minutes)...'",
          "docker compose pull"
        ]
      }
    }
  ]
}
