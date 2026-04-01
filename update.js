module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Pulling latest changes...'",
          "git pull"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Pulling latest Docker images...'",
          "docker compose pull"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Restarting containers...'",
          "docker compose up -d"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        message: [
          "echo ''",
          "echo 'Postiz updated and restarted!'"
        ]
      }
    }
  ]
}
