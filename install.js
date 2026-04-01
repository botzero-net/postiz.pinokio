module.exports = {
  run: [
    // Step 1: Check if Docker is available
    {
      method: "shell.run",
      params: {
        message: [
          "docker info >/dev/null 2>&1 && echo 'DOCKER_OK' || echo 'NEEDS_DOCKER'"
        ]
      },
      next: {
        DOCKER_OK: "docker_ready",
        NEEDS_DOCKER: "install_docker"
      }
    },

    // Docker Installation (Linux only via get.docker.com)
    // For Windows/macOS, we rely on Docker Desktop being installed
    {
      when: "{{output === 'NEEDS_DOCKER' && platform === 'linux'}}",
      id: "install_docker",
      method: "shell.run",
      params: {
        message: [
          "echo 'Installing Docker...'",
          "curl -fsSL https://get.docker.com | sudo sh"
        ]
      }
    },
    {
      when: "{{output === 'NEEDS_DOCKER' && platform === 'linux'}}",
      method: "shell.run",
      params: {
        message: [
          "echo 'Adding user to docker group...'",
          "sudo usermod -aG docker $USER"
        ]
      }
    },
    // After installing Docker on Linux, we need to inform user to restart
    {
      when: "{{output === 'NEEDS_DOCKER' && platform === 'linux'}}",
      method: "shell.run",
      params: {
        message: [
          "echo ''",
          "echo '=========================================='",
          "echo 'DOCKER INSTALLED SUCCESSFULLY!'",
          "echo '=========================================='",
          "echo ''",
          "echo 'IMPORTANT: Docker requires a session refresh.'",
          "echo ''",
          "echo 'Please do ONE of the following:'",
          "echo '  1. Restart Pinokio completely, OR'",
          "echo '  2. Run this command in terminal: newgrp docker'",
          "echo ''",
          "echo 'Then click Install again to continue.'",
          "echo '=========================================='"
        ]
      },
      next: "abort"
    },

    // Windows/macOS without Docker - show instructions
    {
      when: "{{output === 'NEEDS_DOCKER' && platform !== 'linux'}}",
      method: "shell.run",
      params: {
        message: [
          "echo ''",
          "echo '=========================================='",
          "echo 'DOCKER REQUIRED'",
          "echo '=========================================='",
          "echo ''",
          "echo 'Please install Docker Desktop:'",
          "echo '  https://www.docker.com/products/docker-desktop'",
          "echo ''",
          "echo 'After installing Docker Desktop:'",
          "echo '  1. Start Docker Desktop',
          "echo '  2. Wait for Docker to be ready (whale icon steady)'",
          "echo '  3. Click Install again in Pinokio'",
          "echo '=========================================='"
        ]
      },
      next: "abort"
    },

    // Step 2: Docker is ready - clone repo
    {
      id: "docker_ready",
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: [
          "echo 'Cloning Postiz...'",
          "git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app"
        ]
      }
    },

    // Step 3: Generate unique JWT secret
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Generating JWT secret...'",
          "JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || head -c 32 /dev/urandom | base64)",
          "if command -v sed >/dev/null 2>&1; then",
          "  if [[ \"$OSTYPE\" == \"darwin\"* ]]; then",
          "    sed -i '' \"s/JWT_SECRET: 'random string that is unique to every install - just type random characters here!'/JWT_SECRET: '$JWT_SECRET'/g\" docker-compose.yaml",
          "  else",
          "    sed -i \"s/JWT_SECRET: 'random string that is unique to every install - just type random characters here!'/JWT_SECRET: '$JWT_SECRET'/g\" docker-compose.yaml",
          "  fi",
          "fi",
          "echo 'JWT secret configured.'"
        ]
      }
    },

    // Step 4: Ensure dynamicconfig folder exists (required by Temporal)
    {
      method: "fs.mkdir",
      params: {
        path: "app/dynamicconfig"
      }
    },
    {
      method: "fs.write",
      params: {
        path: "app/dynamicconfig/development-sql.yaml",
        text: `limit.maxIDLength:
  - value: 255
    constraints: {}
system.forceSearchAttributesCacheRefreshOnRead:
  - value: true
    constraints: {}
`
      }
    },

    // Step 5: Pull images (optional but speeds up first start)
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Pulling Docker images (this may take a few minutes)...'",
          "docker compose pull"
        ]
      }
    },

    // Step 6: Start containers
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Starting Postiz containers...'",
          "docker compose up -d"
        ]
      }
    },

    // Step 7: Wait and check status
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Waiting for services to start...'",
          "sleep 10",
          "docker compose ps"
        ]
      }
    },

    // Final message
    {
      method: "shell.run",
      params: {
        message: [
          "echo ''",
          "echo '=========================================='",
          "echo 'POSTIZ INSTALLED SUCCESSFULLY!'",
          "echo '=========================================='",
          "echo ''",
          "echo 'Access Postiz at: http://localhost:4007'",
          "echo ''",
          "echo 'First time? Create an account in the web UI.'",
          "echo ''",
          "echo 'To configure social media integrations, edit:'",
          "echo '  app/docker-compose.yaml'",
          "echo 'Then restart with: docker compose up -d'",
          "echo '=========================================='"
        ]
      }
    }
  ]
}
