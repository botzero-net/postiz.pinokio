module.exports = {
  version: "5.0",
  title: "Postiz",
  description: "Open-source social media scheduling tool with AI. Schedule posts to X, LinkedIn, Reddit, Discord, and more.",
  menu: async (kernel, info) => {
    const installed = info.exists("app")
    const envExists = info.exists("app/.env")
    const running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      stop: info.running("stop.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js")
    }

    // Installing
    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing...",
        href: "install.js"
      }]
    }

    // Stopping
    if (running.stop) {
      return [{
        default: true,
        icon: "fa-solid fa-stop",
        text: "Stopping...",
        href: "stop.js"
      }]
    }

    // Updating
    if (running.update) {
      return [{
        default: true,
        icon: "fa-solid fa-download",
        text: "Updating...",
        href: "update.js"
      }]
    }

    // Resetting
    if (running.reset) {
      return [{
        default: true,
        icon: "fa-solid fa-trash",
        text: "Resetting...",
        href: "reset.js"
      }]
    }

    // Not installed
    if (!installed) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js"
      }]
    }

    // Starting up
    if (running.start) {
      return [{
        default: true,
        icon: "fa-solid fa-spinner fa-spin",
        text: "Starting...",
        href: "start.js"
      }, {
        icon: "fa-solid fa-file-code",
        text: "Configure",
        href: "config.js"
      }]
    }

    // Check if running (docker containers exist)
    // We'll check if the app folder exists and has .env
    const isRunning = envExists && await kernel.exec("docker ps --filter name=postiz --filter status=running -q").then(r => r.stdout.trim()).catch(() => "")
    
    if (isRunning) {
      return [{
        default: true,
        icon: "fa-solid fa-external-link",
        text: "Open Postiz",
        href: "http://localhost:4007"
      }, {
        icon: "fa-solid fa-stop",
        text: "Stop",
        href: "stop.js"
      }, {
        icon: "fa-solid fa-list",
        text: "Logs",
        href: "logs.js"
      }, {
        icon: "fa-solid fa-file-code",
        text: "Configure",
        href: "config.js"
      }, {
        icon: "fa-solid fa-download",
        text: "Update",
        href: "update.js"
      }]
    }

    // Installed but not running
    return [{
      default: true,
      icon: "fa-solid fa-play",
      text: "Start",
      href: "start.js"
    }, {
      icon: "fa-solid fa-file-code",
      text: "Configure",
      href: "config.js"
    }, {
      icon: "fa-solid fa-download",
      text: "Update",
      href: "update.js"
    }, {
      icon: "fa-solid fa-trash",
      text: "Reset",
      href: "reset.js"
    }]
  }
}
