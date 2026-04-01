module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull && echo 'Updated repository'"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "docker compose pull && echo 'Updated images'"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "docker compose up -d && echo 'Postiz restarted'"
      }
    }
  ]
}
