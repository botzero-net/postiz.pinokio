module.exports = {
  run: [
    // Clone the postiz-docker-compose repository
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: [
          "git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app"
        ]
      }
    },
    // Generate a unique JWT secret
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "JWT_SECRET=postiz_$(date +%s)_$$",
          "sed -i.bak \"s/random string that is unique to every install - just type random characters here!/$JWT_SECRET/g\" docker-compose.yaml",
          "rm -f docker-compose.yaml.bak"
        ]
      }
    },
    // Pull all Docker images
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "docker compose pull"
        ]
      }
    }
  ]
}
