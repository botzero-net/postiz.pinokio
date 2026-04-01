module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "docker compose up -d"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "sleep 5",
          "echo 'Postiz started at: http://localhost:4007'",
          "docker compose ps"
        ]
      }
    }
  ]
}
