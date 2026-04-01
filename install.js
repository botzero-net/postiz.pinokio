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
        NEEDS_DOCKER: "show_docker_instructions"
      }
    },

    // Docker not found - show installation instructions
    {
      id: "show_docker_instructions",
      method: "shell.run",
      params: {
        message: [
          "echo ''",
          "echo '╔══════════════════════════════════════════════════════════════════╗'",
          "echo '║                    DOCKER INSTALLATION REQUIRED                  ║'",
          "echo '╚══════════════════════════════════════════════════════════════════╝'",
          "echo ''",
          "echo 'Postiz runs in Docker containers. Please install Docker first.'",
          "echo ''",
          "echo '════════════════════════════════════════════════════════════════════'",
          "echo 'LINUX - Run these commands in your terminal:'",
          "echo '════════════════════════════════════════════════════════════════════'",
          "echo ''",
          "echo '  1. Install Docker:'",
          "echo '     curl -fsSL https://get.docker.com | sudo sh'",
          "echo ''",
          "echo '  2. Add your user to docker group:'",
          "echo '     sudo usermod -aG docker $USER'",
          "echo ''",
          "echo '  3. Apply group changes (choose one):'",
          "echo '     newgrp docker'",
          "echo '     OR log out and back in',
          "echo ''",
          "echo '  4. Verify Docker works:'",
          "echo '     docker run hello-world'",
          "echo ''",
          "echo '════════════════════════════════════════════════════════════════════'",
          "echo 'WINDOWS / macOS - Install Docker Desktop:'",
          "echo '════════════════════════════════════════════════════════════════════'",
          "echo ''",
          "echo '  1. Download: https://www.docker.com/products/docker-desktop'",
          "echo ''",
          "echo '  2. Install and start Docker Desktop'",
          "echo ''",
          "echo '  3. Wait for Docker to be ready (whale icon in system tray/menu bar)'",
          "echo ''",
          "echo '  4. Verify in terminal:'",
          "echo '     docker run hello-world'",
          "echo ''",
          "echo '════════════════════════════════════════════════════════════════════'",
          "echo 'IMPORTANT FOR PINOKIO IN CONTAINER:',
          "echo '════════════════════════════════════════════════════════════════════'",
          "echo ''",
          "echo 'If Pinokio is running inside a container (Docker/Podman):'",
          "echo '  - Docker must be installed on the HOST system, not the container'",
          "echo '  - Run the Docker install commands on your HOST terminal'",
          "echo '  - Or use Docker socket passthrough from host to container'",
          "echo ''",
          "echo 'After installing Docker, click Install again.'",
          "echo '════════════════════════════════════════════════════════════════════'"
        ]
      }
    },

    // Step 2: Docker is ready - clone repo
    {
      id: "docker_ready",
      method: "shell.run",
      params: {
        message: [
          "echo 'Docker is available. Starting Postiz installation...'"
        ]
      }
    },
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: [
          "echo 'Cloning Postiz repository...'",
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
          "echo 'Generating secure JWT secret...'",
          "JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || head -c 32 /dev/urandom | base64 | tr -d '\\n')",
          "if command -v sed >/dev/null 2>&1; then",
          "  if [[ \"$OSTYPE\" == \"darwin\"* ]]; then",
          "    sed -i '' \"s/JWT_SECRET: 'random string that is unique to every install - just type random characters here!'/JWT_SECRET: '$JWT_SECRET'/g\" docker-compose.yaml 2>/dev/null || true",
          "  else",
          "    sed -i \"s/JWT_SECRET: 'random string that is unique to every install - just type random characters here!'/JWT_SECRET: '$JWT_SECRET'/g\" docker-compose.yaml 2>/dev/null || true",
          "  fi",
          "fi",
          "echo 'JWT secret configured.'"
        ]
      }
    },

    // Step 4: Ensure dynamicconfig folder exists (required by Temporal)
    {
      method: "shell.run",
      params: {
        message: [
          "echo 'Creating Temporal config...'"
        ]
      }
    },
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
        text: "limit.maxIDLength:\n  - value: 255\n    constraints: {}\nsystem.forceSearchAttributesCacheRefreshOnRead:\n  - value: true\n    constraints: {}\n"
      }
    },

    // Step 5: Pull images
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
          "echo 'Waiting for services to initialize...'",
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
          "echo '╔══════════════════════════════════════════════════════════════════╗'",
          "echo '║                   POSTIZ INSTALLED SUCCESSFULLY                  ║'",
          "echo '╚══════════════════════════════════════════════════════════════════╝'",
          "echo ''",
          "echo 'Access Postiz at: http://localhost:4007'",
          "echo ''",
          "echo 'First time? Open the URL above and create an account.'",
          "echo ''",
          "echo 'To configure social media integrations, edit:'",
          "echo '  app/docker-compose.yaml'",
          "echo ''",
          "echo 'Then apply changes: docker compose up -d'",
          "echo '════════════════════════════════════════════════════════════════════'"
        ]
      }
    }
  ]
}
