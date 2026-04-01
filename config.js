module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "echo 'Opening configuration file...'",
          "echo 'Edit app/.env to configure social media integrations.'",
          "echo 'After saving, click Stop then Start to apply changes.'"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        // This will open the env file in the user's editor
        message: [
          "cat .env"
        ]
      }
    }
  ]
}
