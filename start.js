module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        env: {
          PATH: "/usr/local/bin:/usr/bin:/bin:{{env.PATH || ''}}"
        },
        message: [
          "docker compose up -d 2>/dev/null || /usr/bin/docker compose up -d 2>/dev/null || /usr/local/bin/docker compose up -d"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "echo 'Waiting for containers to start (1-2 minutes)...'",
          "sleep 10"
        ]
      }
    }
  ]
}
