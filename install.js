module.exports = {
  run: [
    // Step 1: Check Docker status
    {
      method: "shell.run",
      params: {
        message: "echo 'Checking Docker...'; docker info >/dev/null 2>&1 && echo 'Docker OK' || echo 'Docker NOT found - install Docker first'"
      }
    },

    // Step 2: Clone repo (only if Docker available and not already cloned)
    {
      method: "shell.run",
      params: {
        message: "docker info >/dev/null 2>&1 && test ! -d app && git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app || echo 'Skipping clone'"
      }
    },

    // Step 3: Create config directory
    {
      method: "shell.run",
      params: {
        message: "mkdir -p app/dynamicconfig"
      }
    },

    // Step 4: Write Temporal config
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
        message: "docker compose pull"
      }
    },

    // Step 6: Start containers
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "docker compose up -d"
      }
    },

    // Step 7: Done
    {
      method: "shell.run",
      params: {
        message: "echo 'Postiz installed! Open http://localhost:4007'"
      }
    }
  ]
}
