module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: "docker info >/dev/null 2>&1 || (echo '\\nDOCKER REQUIRED!\\n\\nLinux:\\n  curl -fsSL https://get.docker.com | sudo sh\\n  sudo usermod -aG docker $USER\\n  newgrp docker\\n\\nMac/Windows:\\n  https://www.docker.com/products/docker-desktop\\n\\nAfter installing Docker, restart Pinokio and click Install again.\\n' && exit 1)"
      }
    },
    {
      method: "shell.run",
      params: {
        message: "test -d app || git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app"
      }
    },
    {
      method: "shell.run",
      params: {
        message: "mkdir -p app/dynamicconfig"
      }
    },
    {
      method: "fs.write",
      params: {
        path: "app/dynamicconfig/development-sql.yaml",
        text: "limit.maxIDLength:\n  - value: 255\n    constraints: {}\nsystem.forceSearchAttributesCacheRefreshOnRead:\n  - value: true\n    constraints: {}\n"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "docker compose pull"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "docker compose up -d"
      }
    },
    {
      method: "shell.run",
      params: {
        message: "echo '\\n========================================\\nPOSTIZ INSTALLED!\\n========================================\\n\\nOpen: http://localhost:4007\\n'"
      }
    }
  ]
}
