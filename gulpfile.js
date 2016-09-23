var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

// --------------------
// Setting
// --------------------
var IS_DEBUG = true;
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

// --------------------
// Gulp tasks
// --------------------
var tasks = [],
	browserifyIds = [];

for (var key in BUNDLES) {
	(function(key){
		var bundle = BUNDLES[key],
		browserifyId = 'browserify_' + key,
		watchId = 'watch_' + key;

		gulp.task(browserifyId, function() {
			browserify(bundle.input, { debug: IS_DEBUG })
			.transform(babelify)
			.bundle()
			.on("error", function (err) { console.log("Error : " + err.message); })
			.pipe(source(bundle.output))
			.pipe(gulp.dest('./'))
		});

		gulp.task(watchId, function() {
			gulp.watch(bundle.watches, [browserifyId])
		});

		tasks.push(browserifyId, watchId);
	})(key);
}

gulp.task('default', tasks);
