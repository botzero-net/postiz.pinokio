module.exports = async (kernel) => {
  const platform = kernel.platform || process.platform

  let dockerAvailable = false
  try {
    const result = await kernel.exec("docker info >/dev/null 2>&1 && echo 'yes' || echo 'no'")
    dockerAvailable = result.stdout && result.stdout.trim() === 'yes'
  } catch (e) {}

  if (!dockerAvailable) {
    const msg = platform === 'linux' 
      ? "echo '\nDOCKER REQUIRED\n\nRun in terminal:\n  curl -fsSL https://get.docker.com | sudo sh\n  sudo usermod -aG docker $USER\n  newgrp docker\n\nThen restart Pinokio and click Install again.\n'"
      : "echo '\nDOCKER REQUIRED\n\nDownload: https://www.docker.com/products/docker-desktop\n\nInstall Docker Desktop, restart Pinokio, then click Install again.\n'"
    
    return { run: [{ method: "shell.run", params: { message: msg } }] }
  }

  return {
    run: [
      { method: "shell.run", params: { message: "echo 'Installing Postiz...'" } },
      { method: "shell.run", params: { message: "test -d app || git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app" } },
      { method: "shell.run", params: { message: "mkdir -p app/dynamicconfig" } },
      { method: "fs.write", params: { path: "app/dynamicconfig/development-sql.yaml", text: "limit.maxIDLength:\n  - value: 255\n    constraints: {}\nsystem.forceSearchAttributesCacheRefreshOnRead:\n  - value: true\n    constraints: {}\n" } },
      { method: "shell.run", params: { path: "app", message: "docker compose pull" } },
      { method: "shell.run", params: { path: "app", message: "docker compose up -d" } },
      { method: "shell.run", params: { message: "echo '\nPOSTIZ READY!\nOpen: http://localhost:4007\n'" } }
    ]
  }
}
