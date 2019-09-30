module.exports = {
  server: {
    command: 'yarn ember server -lr false -path ./dist',
    port: 4200,
    launchTimeout: 60000,
    debug: true
  },
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true
  },
  exitOnPageError: false
}
