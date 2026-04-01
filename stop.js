module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "docker compose down"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        message: [
          "echo 'Postiz stopped.'"
        ]
      }
    }
  ]
}
