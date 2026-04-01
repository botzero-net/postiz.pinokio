module.exports = {
  run: [
    // Clone repo
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: [
          "git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app"
        ]
      }
    },
    // Generate JWT secret
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "sed -i 's/random string that is unique to every install - just type random characters here!/postiz_'$(date +%s)'_'$$'/g' docker-compose.yaml 2>/dev/null || sed -i '' 's/random string that is unique to every install - just type random characters here!/postiz_'$(date +%s)'_'$$'/g' docker-compose.yaml"
        ]
      }
    }
  ]
}
