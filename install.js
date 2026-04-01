module.exports = {
  run: [
    // Install Docker (idempotent)
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
    // Set JWT secret
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "sed -i 's/random string that is unique to every install - just type random characters here!/postiz_'$(date +%s)'/g' docker-compose.yaml 2>/dev/null || sed -i '' 's/random string that is unique to every install - just type random characters here!/postiz_'$(date +%s)'/g' docker-compose.yaml"
        ]
      }
    },
    // Check if ready
    {
      method: "shell.run",
      params: {
        message: [
          "docker info >/dev/null 2>&1 && echo 'Ready! Click Start to launch Postiz.' || echo 'RESTART PINOKIO then click Install again.'"
        ]
      }
    }
  ]
}
