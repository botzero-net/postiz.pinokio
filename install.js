module.exports = {
  run: [
    // Step 1: Check Docker and show instructions if not available
    {
      method: "shell.run",
      params: {
        message: [
          "echo 'Checking Docker...'",
          "if docker info >/dev/null 2>&1; then",
          "  echo ''",
          "  echo 'Docker is available. Proceeding with installation...'",
          "else",
          "  echo ''",
          "  echo '╔══════════════════════════════════════════════════════════════════╗'",
          "  echo '║            DOCKER REQUIRED - INSTALLATION INSTRUCTIONS            ║'",
          "  echo '╚══════════════════════════════════════════════════════════════════╝'",
          "  echo ''",
          "  echo 'Postiz requires Docker to run.'",
          "  echo ''",
          "  echo '════════════════════════════════════════════════════════════════════'",
          "  echo 'LINUX - Run in terminal:'",
          "  echo '════════════════════════════════════════════════════════════════════'",
          "  echo '  curl -fsSL https://get.docker.com | sudo sh'",
          "  echo '  sudo usermod -aG docker $USER'",
          "  echo '  newgrp docker'",
          "  echo ''",
          "  echo '════════════════════════════════════════════════════════════════════'",
          "  echo 'WINDOWS / macOS:'",
          "  echo '════════════════════════════════════════════════════════════════════'",
          "  echo '  Download: https://www.docker.com/products/docker-desktop'",
          "  echo ''",
          "  echo '════════════════════════════════════════════════════════════════════'",
          "  echo 'After installing Docker, click Install again.'",
          "  echo '════════════════════════════════════════════════════════════════════'",
          "fi"
        ]
      }
    },

    // Step 2: Only proceed if Docker exists
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: "docker info >/dev/null 2>&1 && git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app || echo 'Skipping clone - Docker not available'"
      }
    },

    // Step 3: Create Temporal config (only if app exists)
    {
      when: "{{exists('app')}}",
      method: "fs.mkdir",
      params: {
        path: "app/dynamicconfig"
      }
    },
    {
      when: "{{exists('app')}}",
      method: "fs.write",
      params: {
        path: "app/dynamicconfig/development-sql.yaml",
        text: "limit.maxIDLength:\n  - value: 255\n    constraints: {}\nsystem.forceSearchAttributesCacheRefreshOnRead:\n  - value: true\n    constraints: {}\n"
      }
    },

    // Step 4: Pull and start (only if app exists)
    {
      when: "{{exists('app')}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "docker compose pull"
      }
    },
    {
      when: "{{exists('app')}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "docker compose up -d"
      }
    },
    {
      when: "{{exists('app')}}",
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "sleep 10",
          "echo ''",
          "echo '=========================================='",
          "echo 'POSTIZ INSTALLED!'",
          "echo '=========================================='",
          "echo ''",
          "echo 'Access at: http://localhost:4007'",
          "docker compose ps"
        ]
      }
    }
  ]
}
