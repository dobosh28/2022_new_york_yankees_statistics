const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    entry: [
        path.resolve(__dirname, 'src', 'index.js'),
        path.resolve(__dirname, 'src', 'index.scss')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                use: ['babel-loader'], 
                exclude: /node_modules/,
            },
            {
                test: /\.s?[ac]ss$/, // applies to css/scss/sass files
                use: [
                    MiniCssExtractPlugin.loader, // create bundled css file
                    {
                        loader: 'css-loader', // resolves @import statements
                        options: { url: false } // don't resolve url() statements
                    },
                    'sass-loader', // compiles sass to css
                ]
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
};

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
      config.devtool = 'source-map';
    } else {
      config.devtool = 'eval-source-map';
    }
  
    return config;
}
