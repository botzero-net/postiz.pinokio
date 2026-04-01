module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "curl -fsSL https://get.docker.com | sudo sh"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        message: [
          "sudo usermod -aG docker $USER"
        ]
      }
    },
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: [
          "git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "sed -i 's/random string that is unique to every install - just type random characters here!/postiz_jwt_'$(date +%s)'/g' docker-compose.yaml || sed -i '' 's/random string that is unique to every install - just type random characters here!/postiz_jwt_'$(date +%s)'/g' docker-compose.yaml || echo 'JWT set'"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        message: [
          "docker info >/dev/null 2>&1 && echo 'Ready' || echo 'RESTART_PINOKIO'"
        ]
      }
    }
  ]
}
