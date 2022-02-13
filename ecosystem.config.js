module.exports = {
    apps: [
      {
        script: './backend/index.js',
        cwd: './backend/',
        name: 'Backend',
        watch: true
      },
      {
        script: './frontend/main.js',
        cwd: './frontend/',
        name: 'Frontend',
        watch: true
      }
    ]
  }