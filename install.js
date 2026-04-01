module.exports = {
  run: [
    // Install Docker if not present (single command, no if/then/fi)
    {
      method: "shell.run",
      params: {
        message: [
          "command -v docker >/dev/null 2>&1 || (curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER)"
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
    // Generate JWT
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "sed -i 's/random string that is unique to every install - just type random characters here!/postiz_'$(date +%s)'_'$$'/g' docker-compose.yaml 2>/dev/null || sed -i '' 's/random string that is unique to every install - just type random characters here!/postiz_'$(date +%s)'_'$$'/g' docker-compose.yaml"
        ]
      }
    }
  ]
}
