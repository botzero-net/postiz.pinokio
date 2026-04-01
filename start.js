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
    // Wait for containers to be healthy
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Waiting for Postiz to start (this may take 1-2 minutes)...'",
          "sleep 10",
          "docker compose ps"
        ]
      }
    }
  ]
}
