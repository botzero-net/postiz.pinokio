module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "docker compose logs -f --tail=100"
        ]
      }
    }
  ]
}
