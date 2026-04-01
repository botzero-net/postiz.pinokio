module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Resetting Postiz (this will delete all data)...'",
          "docker compose down -v",
          "echo 'Containers and volumes removed.'"
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
          "echo 'Reset complete. Click Install to set up again.'"
        ]
      }
    }
  ]
}
