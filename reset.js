module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "echo 'Resetting Postiz (deleting all data)...' && docker compose down -v"
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
        message: "echo '✅ Reset complete. Click Install to set up again.'"
      }
    }
  ]
}
