const path = require('path');

module.exports = {
    entry: './dist/script.js',
    mode: 'production',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist'),
    },
};