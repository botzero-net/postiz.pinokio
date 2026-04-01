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
        env: {
          PATH: "/usr/local/bin:/usr/bin:/bin:{{env.PATH || ''}}"
        },
        message: [
          "docker compose pull 2>/dev/null || /usr/bin/docker compose pull 2>/dev/null || /usr/local/bin/docker compose pull"
        ]
      }
    },
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
    }
  ]
}
