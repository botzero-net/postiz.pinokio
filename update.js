module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
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
          "docker compose up -d"
        ]
      }
    }
  ]
}
