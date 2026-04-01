module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: "docker info"
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
        message: "sleep 5 && echo 'POSTIZ READY: http://localhost:4007' && docker ps"
      }
    }
  ]
}
