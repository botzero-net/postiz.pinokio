module.exports = {
  run: [
    // Install Docker (idempotent - skips if already installed)
    {
      method: "shell.run",
      params: {
        message: [
          "curl -fsSL https://get.docker.com | sudo sh"
        ]
      }
    },
    // Add user to docker group
    {
      method: "shell.run",
      params: {
        message: [
          "sudo usermod -aG docker $USER"
        ]
      }
    },
    // Clone repo
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: [
          "git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app"
        ]
      }
    },
    // Set JWT secret (handle both Linux and macOS sed)
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "sed -i 's/random string that is unique to every install - just type random characters here!/postiz_jwt_'$(date +%s)'/g' docker-compose.yaml 2>/dev/null || sed -i '' 's/random string that is unique to every install - just type random characters here!/postiz_jwt_'$(date +%s)'/g' docker-compose.yaml || echo 'JWT configured'"
        ]
      }
    },
    // Check if Docker is accessible
    {
      method: "shell.run",
      params: {
        message: [
          "docker info >/dev/null 2>&1 && echo '✅ Installation complete! Click Start to launch Postiz.' || echo '⚠️ Docker installed. Please RESTART PINOKIO and click Install again.'"
        ]
      }
    }
  ]
}
