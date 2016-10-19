var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglifyjs');
var args        = require('yargs').argv;

// --------------------
// Setting
// --------------------
var IS_PRODUCTION = args.env === 'production';
var BUNDLES = [
	{
		input: [
			'./react/App.jsx'
		],
		output: './js/bundle.js',
		watches: [
			'./react/*.jsx',
			'./react/component/*.jsx'
		]
	}
];

console.log(IS_PRODUCTION
	? 'Production mode: minified, without source map'
	: 'Debug mode: uncompressed, with source map'
);

// --------------------
// Gulp tasks
// --------------------
var tasks = [],
	browserifyIds = [];

if (IS_PRODUCTION) {
	gulp.task('apply-prod-environment', function() {
		process.env.NODE_ENV = 'production';
	});
	tasks.push('apply-prod-environment');
}

for (var key in BUNDLES) {
	(function(key){
		var bundle = BUNDLES[key],
		browserifyId = 'browserify_' + key,
		watchId = 'watch_' + key;

		if (IS_PRODUCTION) {
			gulp.task(browserifyId, function() {
				browserify(bundle.input, { debug: false })
				.transform(babelify)
				.bundle()
				.on("error", function (err) { console.log("Error : " + err.message); })
				.pipe(source(bundle.output))
				.pipe(buffer())
				.pipe(uglify())
				.pipe(gulp.dest('./'))
			});
		} else {
			gulp.task(browserifyId, function() {
				browserify(bundle.input, { debug: true })
				.transform(babelify)
				.bundle()
				.on("error", function (err) { console.log("Error : " + err.message); })
				.pipe(source(bundle.output))
				.pipe(buffer())
				.pipe(gulp.dest('./'))
			});
		}

		gulp.task(watchId, function() {
			gulp.watch(bundle.watches, [browserifyId])
		});

		tasks.push(browserifyId, watchId);
	})(key);
}

gulp.task('default', tasks);
