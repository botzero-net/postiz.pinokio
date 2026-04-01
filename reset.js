module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "docker compose down -v"
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
