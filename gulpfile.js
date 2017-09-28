const gulp = require('gulp');
const del = require('del');
const fs = require('fs');
const sequence = require('run-sequence');
const browserify = require('browserify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const html2js = require('html2js-browserify');
const babelify = require('babelify');
const ngAnnotate = require('browserify-ngannotate');
const templateCache = require('gulp-angular-templatecache');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const eslint = require('gulp-eslint');
const styleLint = require('gulp-stylelint');
const cachebust = require('gulp-cache-bust');
const bump = require('gulp-bump');

/**
 * Definition of paths used by tasks.
 */
const paths = {
  entry: './src/app/app.js',
  dest: 'dist',
  app: [
    './src/app/**/*.{js,html}',
    './src/domain/**/*.js'
  ],
  sass: [
    './src/app/**/*.scss',
    './src/styles/**/*.scss'
  ],
  svg: [
    './src/assets/icons/*.svg'
  ],
  icons: 'icons.bundle.js',
  toCopy: [
    './src/index.html',
    './src/assets/**/*',
    '!./src/assets/icons/*',
    './node_modules/angular-material/angular-material.min.css'
  ]
};

// Enable passing in default app environment (local, q8, etc.)
// and print info/help text to console.
const env = process.env.NODE_ENV || 'local';
console.log('\x1b[35m', `Targetting "${env}" environment...\n\n`);

if (env === 'local') {
  const c1 = '\x1b[32m';
  const c2 = '\x1b[36m';
  console.log(c1,
`***
  Run local mock backend: ${c2}npm start${c1} from ${c2}./vcfo-mock-api${c1}.

  See ${c2}./vcfo-mock-api/readme.md${c1} for more info.
 ***\n`);
}

/**
 * Pre-build cleanup. Deletes any existing build products.
 */
gulp.task('clean', () => del(paths.dest));

/**
 * Lints app `.js` files using jshint and rules defined in `/.jshintrc`.
 */
gulp.task('lint', () => gulp
  .src([
    './src/app/**/*.js',
    './src/domain/**/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
);

gulp.task('style-lint', () =>
  gulp.src(paths.sass)
  .pipe(styleLint({
    failAfterError: false,
    reporters: [
      { formatter: 'string', console: true }
    ]
  }))
);

/**
 * Bloated build task that replaces most of original Webpack build
 * using Browserify with sequence of transforms.
 * Also bundles output, generates source maps, uglifies, and generates
 * bundle file in `dist/`.
 */
gulp.task('build-js', ['svg', 'config'], () => {
  const config = {
    entries: [
      paths.entry,
      `${paths.dest}/${paths.icons}`
    ],
    debug: true
  };
  // set NODE_ENV to suppress annoying redux warning
  process.env.NODE_ENV = 'production';
  return browserify(config)
    .transform(html2js)
    .transform(babelify)
    .transform(ngAnnotate)
    .bundle()
    .on('error', error => {
      console.log(error.stack, error.message);
      this.emit('end');
    })
    .pipe(source('app.cfi.bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('build', ['sass'], (done) =>
  sequence('build-js', 'copy', 'postbuild', done)
);

/**
 * Reads `.svg` files and builds temporary template cache `.js` file to be
 * bundled with main `.js` build output.
 */
gulp.task('svg', () => gulp.src(paths.svg)
  .pipe(templateCache(paths.icons, { module: 'icons', standalone: true }))
  .pipe(gulp.dest(paths.dest))
);

/**
 * Creates .css bundle from .scss source files and includes the wbb-ui-base
 * style sheets.
 */
gulp.task('sass', () => gulp.src([
  './wbb-ui-base/styles/index.scss',
  './wbb-ui-base/src/**/*.scss',
  './src/app/**/*.scss'
])
  .pipe(sass({
    outputStyle: 'compressed',
    includePaths: ['wbb-ui-base/styles/']
  }).on('error', sass.logError))
  .pipe(concat('app.cfi.bundle.css'))
  .pipe(gulp.dest(paths.dest))
);

/**
 * Copies static files to `dist/`.
 */
gulp.task('copy', () =>
  gulp.src(paths.toCopy)
    .pipe(gulp.dest(paths.dest))
);

/**
 * Copies app environment config based on NODE_ENV value.
 * Can deploy to other environments without rebuild by overwriting
 * `dist/env.config.js`.
 */
gulp.task('config', () =>
  gulp.src(`./src/environments/${env}.config.js`)
    .pipe(rename('env.config.js'))
    .pipe(gulp.dest('dist/'))
);

/**
 * Adds query string with timestamp to all `.css` and `.js` references
 * in `index.html`.
 */
gulp.task('cache-bust', () =>
  gulp.src('./dist/index.html')
    .pipe(cachebust({
      type: 'timestamp'
    }))
    .pipe(gulp.dest('./dist'))
);

/**
 * Increments `version` field in `package.json` if not local build.
 */
gulp.task('version', () => {
  if (env === 'local') {
    return this;
  }
  return gulp.src('./package.json')
    .pipe(bump({ key: 'version' }))
    .pipe(gulp.dest('./'));
});

/**
 * Sets app version in `env.config.js` based on `version` in package.json.
 */
gulp.task('replace', () => {
  const pkg = JSON.parse(fs.readFileSync('./package.json'));
  return gulp.src(['./dist/env.config.js'])
    .pipe(replace('__VERSION__', pkg.version))
    .pipe(gulp.dest('./dist'));
});

/**
 * Deletes temporary build files.
 */
gulp.task('delete', () =>
  del([
    `${paths.dest}/icons`,
    `${paths.dest}/${paths.icons}`
  ])
);

/**
 * Post-build cleanup. Deletes any existing build products.
 */
gulp.task('postbuild', (done) =>
  sequence('cache-bust', 'version', 'replace', 'delete', done));

/**
 * Uses browser-sync to serve up `dist/` contents on port 8080.
 */
gulp.task('serve', () => browserSync({
  port: 8080,
  host: 'localhost',
  open: false,
  ghostMode: false,
  server: {
    baseDir: paths.dest
  }
}));

/**
 * Used by watch task to rerun lint and build for .js and .scss
 */
gulp.task('rebuild-js', () => sequence('lint', 'build-js'));
gulp.task('rebuild-scss', () => sequence('style-lint', 'sass'));

/**
 * Watches `.js`, `.scss`, and `.html` files and uses browser-sync to
 * reload when changes occur. Also watches and copies static files if
 * they change.
 */
gulp.task('watch', () => {
  gulp.watch(
    [paths.app, '!./src/**/*.spec.js'],
    ['rebuild-js',
    browserSync.reload]);
  gulp.watch(paths.sass, ['rebuild-scss', browserSync.reload]);
  gulp.watch(paths.toCopy, ['copy', browserSync.reload]);
});


/**
 * Default task that cleans `dist/`, lints, builds, copies static files,
 * starts local dev server, and initiates watch on `src/` files.
 */
gulp.task('default', (done) =>
  sequence(
    'clean', 'lint', 'style-lint', 'build', 'serve', 'watch', done
  )
);
