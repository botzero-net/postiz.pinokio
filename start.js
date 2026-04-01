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
        message: "echo '' && echo 'Waiting for containers to be ready...' && sleep 15 && docker compose ps && echo '' && echo 'Postiz is starting...' && echo 'Access at: http://localhost:4007' && echo ''"
      }
    }
  ]
}
