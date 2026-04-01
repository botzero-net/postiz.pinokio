module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Updating Postiz...'",
          "git pull"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "docker compose pull"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "docker compose up -d",
          "echo 'Update complete!'"
        ]
      }
    }
  ]
}
