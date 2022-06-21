module.exports = {
    "transpileDependencies": [
      "vuetify"
    ],
    publicPath: process.env.NODE_ENV === 'production'
    ? '/apps/app_sirenas/'
    : '/',
    devServer: {
      host: 'localhost',
    }
  }