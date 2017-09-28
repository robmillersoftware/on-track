module.exports = function derp(config) {
  config.set({
    frameworks: ['jasmine', 'browserify'],
    files: [
      './spec.bundle.js',
      './src/app/**/*.spec.js',
      './src/domain/**/*.spec.js'
    ],
    plugins: [
      require('karma-browserify'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      // require('karma-ie-launcher'),
      require('karma-sourcemap-loader')
    ],
    browsers: ['Chrome'],
    // browsers: ['IE'],
    preprocessors: {
      './spec.bundle.js': ['browserify'],
      './src/app/**/*.spec.js': ['browserify'],
      './src/domain/**/*.spec.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: [
        'html2js-browserify',
        'babelify'
      ]
    },
    colors: true,
    autoWatch: false,
    singleRun: true
  });
};
