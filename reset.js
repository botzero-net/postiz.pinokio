module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        env: {
          PATH: "/usr/local/bin:/usr/bin:/bin:{{env.PATH || ''}}"
        },
        message: [
          "docker compose down -v 2>/dev/null || /usr/bin/docker compose down -v 2>/dev/null || /usr/local/bin/docker compose down -v"
        ]
      }
    },
    {
      method: "fs.rm",
      params: {
        path: "app"
      }
    }
  ]
}
