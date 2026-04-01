module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "docker compose up -d"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Waiting for containers to start...'",
          "sleep 5",
          "docker compose ps"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        message: [
          "echo ''",
          "echo 'Postiz started!'",
          "echo 'Access at: http://localhost:4007'"
        ]
      }
    }
  ]
}
