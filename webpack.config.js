module.exports = {
  rules: [{
    test: /\.less$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader',
    }, {
      loader: 'less-loader',
      options: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#d50000',
            'link-color': '#d50000',
            'border-radius-base': '10px',
          },
          javascriptEnabled: true,
        },
      },
    }],
  }],
}