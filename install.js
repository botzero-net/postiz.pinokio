module.exports = async (kernel) => {
  const platform = kernel.platform || process.platform

  // Check if Docker is available
  let dockerAvailable = false
  try {
    const result = await kernel.exec("docker info >/dev/null 2>&1 && echo 'yes' || echo 'no'")
    dockerAvailable = result.stdout && result.stdout.trim() === 'yes'
  } catch (e) {
    dockerAvailable = false
  }

  // Build the install steps
  const steps = []

  if (!dockerAvailable) {
    // Docker not available - show instructions and stop
    if (platform === 'linux') {
      steps.push({
        method: "shell.run",
        params: {
          message: [
            "echo ''",
            "echo '╔══════════════════════════════════════════════════════════════════╗'",
            "echo '║            DOCKER REQUIRED - INSTALLING ON LINUX                 ║'",
            "echo '╚══════════════════════════════════════════════════════════════════╝'",
            "echo ''",
            "echo 'Run these commands in your terminal:'",
            "echo ''",
            "echo '  curl -fsSL https://get.docker.com | sudo sh'",
            "echo '  sudo usermod -aG docker $USER'",
            "echo '  newgrp docker'",
            "echo ''",
            "echo 'Then restart Pinokio and click Install again.'",
            "echo ''"
          ]
        }
      })
    } else if (platform === 'darwin') {
      steps.push({
        method: "shell.run",
        params: {
          message: [
            "echo ''",
            "echo '╔══════════════════════════════════════════════════════════════════╗'",
            "echo '║         DOCKER REQUIRED - INSTALL ON MACOS                       ║'",
            "echo '╚══════════════════════════════════════════════════════════════════╝'",
            "echo ''",
            "echo '1. Download: https://www.docker.com/products/docker-desktop'",
            "echo '2. Install Docker Desktop'",
            "echo '3. Start Docker Desktop'",
            "echo '4. Restart Pinokio and click Install again.'",
            "echo ''"
          ]
        }
      })
    } else if (platform === 'win32') {
      steps.push({
        method: "shell.run",
        params: {
          message: [
            "echo ''",
            "echo '╔══════════════════════════════════════════════════════════════════╗'",
            "echo '║         DOCKER REQUIRED - INSTALL ON WINDOWS                     ║'",
            "echo '╚══════════════════════════════════════════════════════════════════╝'",
            "echo ''",
            "echo '1. Download: https://www.docker.com/products/docker-desktop'",
            "echo '2. Install Docker Desktop (requires WSL2)'",
            "echo '3. Start Docker Desktop'",
            "echo '4. Restart Pinokio and click Install again.'",
            "echo ''"
          ]
        }
      })
    } else {
      steps.push({
        method: "shell.run",
        params: {
          message: [
            "echo ''",
            "echo 'Docker is required. Install Docker, then restart Pinokio.'",
            "echo 'https://docs.docker.com/get-docker/'",
            "echo ''"
          ]
        }
      })
    }
    return { run: steps }
  }

  // Docker is available - proceed with installation
  steps.push({
    method: "shell.run",
    params: {
      message: "echo 'Docker is ready. Installing Postiz...'"
    }
  })

  steps.push({
    method: "shell.run",
    params: {
      message: "test -d app || git clone --depth 1 https://github.com/gitroomhq/postiz-docker-compose.git app"
    }
  })

  steps.push({
    method: "shell.run",
    params: {
      message: "mkdir -p app/dynamicconfig"
    }
  })

  steps.push({
    method: "fs.write",
    params: {
      path: "app/dynamicconfig/development-sql.yaml",
      text: "limit.maxIDLength:\n  - value: 255\n    constraints: {}\nsystem.forceSearchAttributesCacheRefreshOnRead:\n  - value: true\n    constraints: {}\n"
    }
  })

  steps.push({
    method: "shell.run",
    params: {
      path: "app",
      message: "docker compose pull"
    }
  })

  steps.push({
    method: "shell.run",
    params: {
      path: "app",
      message: "docker compose up -d"
    }
  })

  steps.push({
    method: "shell.run",
    params: {
      message: [
        "echo ''",
        "echo '=========================================='",
        "echo 'POSTIZ INSTALLED!'",
        "echo '=========================================='",
        "echo ''",
        "echo 'Open: http://localhost:4007'",
        "echo ''"
      ]
    }
  })

  return { run: steps }
}
