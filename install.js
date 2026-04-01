module.exports = {
  run: [
    // Step 1: Check Docker
    {
      method: "shell.run",
      params: {
        message: "docker info >/dev/null 2>&1 || (echo 'ERROR: Docker is not running. Please install and start Docker first.' && exit 1)"
      }
    },

    // Step 2: Clone repo
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: "git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app"
      }
    },

    // Step 3: Create Temporal config directory
    {
      method: "fs.mkdir",
      params: {
        path: "app/dynamicconfig"
      }
    },

    // Step 4: Write Temporal config file
    {
      method: "fs.write",
      params: {
        path: "app/dynamicconfig/development-sql.yaml",
        text: "limit.maxIDLength:\n  - value: 255\n    constraints: {}\nsystem.forceSearchAttributesCacheRefreshOnRead:\n  - value: true\n    constraints: {}\n"
      }
    },

    // Step 5: Generate JWT secret
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || head -c 32 /dev/urandom | base64 | tr -d '\\n')",
          "sed -i \"s/JWT_SECRET: 'random string that is unique to every install - just type random characters here!'/JWT_SECRET: '$JWT_SECRET'/g\" docker-compose.yaml 2>/dev/null || true",
          "echo 'JWT secret configured.'"
        ]
      }
    },

    // Step 6: Pull Docker images
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "docker compose pull"
      }
    },

    // Step 7: Start containers
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "docker compose up -d"
      }
    },

    // Step 8: Show status
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "sleep 10",
          "echo ''",
          "echo '=========================================='",
          "echo 'POSTIZ INSTALLED SUCCESSFULLY!'",
          "echo '=========================================='",
          "echo ''",
          "echo 'Access Postiz at: http://localhost:4007'",
          "echo ''",
          "docker compose ps"
        ]
      }
    }
  ]
}
