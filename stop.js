module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "echo 'Stopping Postiz...' && docker compose down"
      }
    }
  ]
}
