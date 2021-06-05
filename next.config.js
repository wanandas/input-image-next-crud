module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      use: ['url-loader']
    })
    config.node = {
      fs: 'empty'
    }
    return config
  }
}
