module.exports = {
  version: "5.0",
  title: "Postiz",
  description: "Open-source social media scheduling tool with AI. Schedule posts to X, LinkedIn, Reddit, Discord, Threads, TikTok, YouTube, Pinterest, Dribbble, Slack, Mastodon, Facebook, GitHub, and more.",
  icon: "icon.png",
  platform: "*",

  // Prerequisite info shown in Pinokio UI
  pre: [
    {
      icon: "fa-brands fa-docker",
      title: "Docker Required",
      description: "Postiz runs in Docker containers. Docker Desktop (Windows/macOS) or Docker Engine (Linux) must be installed.",
      href: "https://www.docker.com/products/docker-desktop/"
    }
  ],

  menu: async (kernel, info) => {
    const installed = info.exists("app")
    const running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      stop: info.running("stop.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js"),
      logs: info.running("logs.js")
    }

    // Show spinner for running operations
    if (running.install) {
      return [{ default: true, icon: "fa-solid fa-spinner fa-spin", text: "Installing...", href: "install.js" }]
    }
    if (running.start) {
      return [{ default: true, icon: "fa-solid fa-spinner fa-spin", text: "Starting...", href: "start.js" }]
    }
    if (running.stop) {
      return [{ default: true, icon: "fa-solid fa-spinner fa-spin", text: "Stopping...", href: "stop.js" }]
    }
    if (running.update) {
      return [{ default: true, icon: "fa-solid fa-spinner fa-spin", text: "Updating...", href: "update.js" }]
    }
    if (running.reset) {
      return [{ default: true, icon: "fa-solid fa-spinner fa-spin", text: "Resetting...", href: "reset.js" }]
    }

    // Not installed - show install button
    if (!installed) {
      return [{ default: true, icon: "fa-solid fa-plug", text: "Install", href: "install.js" }]
    }

    // Check if Docker containers are running
    let isRunning = false
    let dockerAvailable = false
    try {
      const dockerCheck = await kernel.exec("docker info >/dev/null 2>&1 && echo 'ok' || echo 'no'")
      dockerAvailable = dockerCheck.stdout && dockerCheck.stdout.trim() === "ok"

      if (dockerAvailable) {
        const result = await kernel.exec("docker ps --filter name=postiz --filter status=running -q 2>/dev/null")
        isRunning = result.stdout && result.stdout.trim().length > 0
      }
    } catch (e) {
      // Docker not available
    }

    // Docker not available but installed - show warning
    if (!dockerAvailable) {
      return [
        { default: true, icon: "fa-solid fa-triangle-exclamation", text: "Docker Not Running", href: "install.js" },
        { icon: "fa-solid fa-trash", text: "Reset", href: "reset.js" }
      ]
    }

    // Running - show open link and controls
    if (isRunning) {
      return [
        { default: true, icon: "fa-solid fa-external-link", text: "Open Postiz", href: "http://localhost:4007" },
        { icon: "fa-solid fa-stop", text: "Stop", href: "stop.js" },
        { icon: "fa-solid fa-list", text: "Logs", href: "logs.js" },
        { icon: "fa-solid fa-sync", text: "Update", href: "update.js" }
      ]
    }

    // Installed but not running - show start button
    return [
      { default: true, icon: "fa-solid fa-play", text: "Start", href: "start.js" },
      { icon: "fa-solid fa-sync", text: "Update", href: "update.js" },
      { icon: "fa-solid fa-trash", text: "Reset", href: "reset.js" }
    ]
  }
}
