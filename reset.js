module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "docker compose down -v && echo 'Stopped and volumes removed'"
      }
    },
    {
      method: "fs.rm",
      params: {
        path: "app"
      }
    },
    {
      method: "shell.run",
      params: {
        message: "echo '✅ Postiz has been reset. Click Install to set up again.'"
      }
    }
  ]
}
