module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Stopping and removing containers...'",
          "docker compose down -v"
        ]
      }
    },
    {
      method: "fs.rm",
      params: {
        path: "app"
      }
    },
    {
      method: "shell.run",
      params: {
        message: [
          "echo ''",
          "echo 'Postiz has been completely removed.'",
          "echo 'Click Install to set it up again.'"
        ]
      }
    }
  ]
}
