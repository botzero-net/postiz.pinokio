module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: "docker info >/dev/null 2>&1 && echo 'Docker is ready' || echo 'Docker NOT found - please install Docker first'"
      }
    },
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: "docker info >/dev/null 2>&1 && git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app || echo 'Skipping clone - Docker not available'"
      }
    },
    {
      when: "{{exists('app')}}",
      method: "shell.run",
      params: {
        message: "mkdir -p app/dynamicconfig"
      }
    },
    {
      when: "{{exists('app')}}",
      method: "fs.write",
      params: {
        path: "app/dynamicconfig/development-sql.yaml",
        text: "limit.maxIDLength:\n  - value: 255\n    constraints: {}\nsystem.forceSearchAttributesCacheRefreshOnRead:\n  - value: true\n    constraints: {}\n"
      }
    },
    {
      when: "{{exists('app')}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "docker info >/dev/null 2>&1 && docker compose pull || echo 'Cannot pull images'"
      }
    },
    {
      when: "{{exists('app')}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "docker info >/dev/null 2>&1 && docker compose up -d || echo 'Cannot start containers'"
      }
    },
    {
      when: "{{exists('app')}}",
      method: "shell.run",
      params: {
        message: "docker info >/dev/null 2>&1 && echo 'POSTIZ READY - open http://localhost:4007' || echo 'Install Docker first, then click Install again'"
      }
    }
  ]
}
