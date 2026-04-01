module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Starting Postiz...'",
          "docker compose up -d"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo ''",
          "echo 'Waiting for containers to initialize (1-2 minutes)...'",
          "echo 'Container status:'",
          "docker compose ps",
          "echo ''",
          "echo 'Access Postiz at: http://localhost:4007'",
          "echo ''"
        ]
      }
    }
  ]
}
