module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "echo 'Starting Postiz...' && docker compose up -d"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "sleep 15 && echo 'Containers starting...' && docker compose ps"
      }
    }
  ]
}
