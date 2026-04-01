module.exports = {
  version: "5.0",
  title: "Postiz",
  description: "Open-source social media scheduling tool with AI. Schedule posts to X, LinkedIn, Reddit, Discord, Threads, TikTok, YouTube, Pinterest, Dribbble, Slack, Mastodon, Facebook, GitHub, and more.",
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

    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-spinner fa-spin",
        text: "Installing...",
        href: "install.js"
      }]
    }

    if (installed) {
      if (running.start) {
        return [{
          default: true,
          icon: "fa-solid fa-spinner fa-spin",
          text: "Starting...",
          href: "start.js"
        }, {
          icon: "fa-solid fa-list",
          text: "Logs",
          href: "logs.js"
        }]
      }

      if (running.stop) {
        return [{
        default: true,
        icon: "fa-solid fa-spinner fa-spin",
        text: "Stopping...",
        href: "stop.js"
        }]
      }

      if (running.update) {
        return [{
        default: true,
        icon: "fa-solid fa-spinner fa-spin",
        text: "Updating...",
        href: "update.js"
        }]
      }

      if (running.reset) {
        return [{
        default: true,
        icon: "fa-solid fa-spinner fa-spin",
        text: "Resetting...",
        href: "reset.js"
        }]
      }

      // Check if running
      const isRunning = await kernel.exec("docker ps --filter name=postiz --filter status=running -q").then(r => r.stdout.trim()).catch(() => "")

      
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
          icon: "fa-solid fa-sync",
          text: "Update",
          href: "update.js"
        }, {
          icon: "fa-solid fa-trash",
          text: "Reset",
          href: "reset.js"
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
        text: "View Config",
        href: "config.js"
      }, {
        icon: "fa-solid fa-sync",
        text: "Update",
        href: "update.js"
      }, {
        icon: "fa-solid fa-trash",
        text: "Reset",
        href: "reset.js"
      }]
    }

    // Not installed
    return [{
      default: true,
      icon: "fa-solid fa-plug",
      text: "Install",
      href: "install.js"
    }]
  }
}
