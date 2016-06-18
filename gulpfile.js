// Include gulp
var gulp = require("gulp");

// Include Our Plugins
var fs = require("fs");
var gutil = require("gulp-util");
var jshint = require("gulp-jshint");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var shell = require("gulp-shell");
var csslint = require("gulp-csslint");
var cleanCSS = require("gulp-clean-css");
var clean = require("gulp-clean");
var ngHtml2Js = require("gulp-ng-html2js");
var sass = require("gulp-sass");
var htmlmin = require("gulp-htmlmin");
var livereload = require("gulp-livereload");
var imagemin = require("gulp-imagemin");
var gulpDocs = require("gulp-ngdocs");
var autoprefixer = require("gulp-autoprefixer");



/* Utilities ----------------------------------------------------------------------------- */

// update bower dependencies.
gulp.task( "_ubd", function() {

	// define source groups.

	var js_dep = [
		"src/bower_components/velocity/velocity.js", 
		"src/bower_components/velocity/velocity.ui.js", 
		"src/bower_components/angular-velocity/angular-velocity.js", 
		"src/bower_components/satellizer/satellizer.min.js", 
		"src/bower_components/angular-ui-router/release/angular-ui-router.js", 
		"src/bower_components/angulartics/dist/angulartics.min.js", 
		"src/bower_components/angulartics-google-analytics/lib/angulartics-google-analytics.js",
		"src/bower_components/angular-local-storage/dist/angular-local-storage.js",
		"src/bower_components/jquery-slimscroll/jquery.slimscroll.min.js",
		"src/bower_components/angular-parallax/scripts/angular-parallax.js",
		"src/bower_components/fullpage.js/dist/jquery.fullpage.js",
		"src/bower_components/angular-fullpage.js/angular-fullpage.js",
		"src/bower_components/instafeed.js/instafeed.min.js",
		"src/bower_components/v-accordion/dist/v-accordion.min.js",
		"src/bower_components/stackframe/stackframe.js",
		"src/bower_components/stack-generator/stack-generator.js",
		"src/bower_components/error-stack-parser/error-stack-parser.js",
		"src/bower_components/stacktrace-gps/stacktrace-gps.js",
		"src/bower_components/stacktrace-js/stacktrace.js"
	];

	// -> Remove any previous js dependency bulk file.
	gulp.src( [ "dist/assets/js/app.dependencies.min.js" ], {read: false} )

		// -> Clean
		.pipe(clean());

  	// -> Source js dependencies.
	gulp.src( js_dep )

	  	// -> Concat
		.pipe(concat("app.dependencies.min.js"))

		// -> Output
        .pipe(gulp.dest("dist/assets/js"));

	// copy over bower font dependencies.
	var font_files = [
		"src/bower_components/components-font-awesome/fonts/*"
	];

	// -> Remove previous font files
	gulp.src( [ "dist/assets/fonts/*" ], {read: false} )

		// -> Clean
		.pipe(clean());

	// -> Source font dependencies
	gulp.src( font_files )

		.pipe(gulp.dest("dist/assets/fonts"));

});

// clear dist assets.
gulp.task("clear-dist-html", function() { return gulp.src( [ "dist/*.html","dist/partials/*" ], {read: false} ).pipe(clean()); });
gulp.task("clear-dist-js", function() { return gulp.src( [ "dist/assets/js/app.*","!dist/assets/js/app.dependencies.*" ], {read: false} ).pipe(clean()); });
gulp.task("clear-dist-css", function() { return gulp.src( [ "dist/assets/css/*" ], {read: false} ).pipe(clean()); });

// optimize photos in src, dump into dist.
gulp.task("optimize-imgs", function() {

	// -> Remove previous imgs
	gulp.src( [ "dist/assets/imgs/*" ], {read: false} )

		// -> Clean
		.pipe(clean());


	// Load images in source
	gulp.src("src/media/favicons/*")

		// -> Optimize photos
		.pipe(imagemin())

		// -> Output optimized imgs to dist.
		.pipe(gulp.dest("dist/assets/favicons"));

	return gulp.src("src/media/imgs/*")

		// -> Optimize photos
		.pipe(imagemin())

		// -> Output optimized imgs to dist.
		.pipe(gulp.dest("dist/assets/imgs"));

});



/* HTML ---------------------------------------------------------------------------------- */

gulp.task("html", [ "clear-dist-html" ], function() {

	gulp.src( "src/*.html" )

		// -> Compile
		.pipe(htmlmin({collapseWhitespace: true}))

		// -> Output
		.pipe(gulp.dest("dist"))

		// -> Auto reload changes
		.pipe(livereload());

	return gulp.src( ["src/partials/*.html","src/app/**/*.html" ] )

		// -> Compile
		.pipe(htmlmin({collapseWhitespace: true}))

		// -> Output
		.pipe(gulp.dest("dist/partials"))

		// -> Auto reload changes
		.pipe(livereload());

});




/* SASS / CSS ---------------------------------------------------------------------------- */

gulp.task("scss", function() {

	return gulp.src( "src/css/style.scss" )

		// -> Compile
		.pipe(sass().on("error", sass.logError))

		// -> Autoprefix CSS
		.pipe(autoprefixer({
			browsers: ["last 3 versions"],
			cascade: false
		}))

		// -> Output compiled
		.pipe(gulp.dest("dist/assets/css"))

		// -> Source Map
		.pipe(sourcemaps.init())

		// -> Rename w/ `.min`
		.pipe(rename({ extname: ".min.css" }))

		// -> Minify
		.pipe(cleanCSS())

		// -> Output Sourcemap
		.pipe(sourcemaps.write(""))

		// -> Output minified
		.pipe(gulp.dest("dist/assets/css"))

		// -> Auto reload changes
		.pipe(livereload());

});




/* Javascript ---------------------------------------------------------------------------- */

gulp.task("js", function() {

	var js_app_files = [
		"src/app/**/*.js", 
		"src/app/*.modules.js",
		"src/app/*.routes.js"
	];

	return gulp.src( js_app_files )

		// -> Lint JS
        .pipe(jshint())

		// -> Report Lint
        .pipe(jshint.reporter("default"))

	  	// -> Concat
		.pipe(concat("app.js"))

		// -> Output
        .pipe(gulp.dest("dist/assets/js"))

		// -> Source Map
		.pipe(sourcemaps.init())

		// -> Rename w/ `.min`
        .pipe(rename({ extname: ".min.js" }))

		// -> Minify
        // .pipe(uglify({screw-ie8: true, compress: {hoist_funs: false, hoist_vars: false}}))
        .pipe(uglify({compress: {hoist_funs: false, hoist_vars: false}}))

		// -> Output source map
    	.pipe(sourcemaps.write())

		// -> Output minified
        .pipe(gulp.dest("dist/assets/js"))

		// -> Auto reload changes
		.pipe(livereload());


});

gulp.task("js-lint", function() {

	return gulp.src( js_app_files )

		// -> Lint JS
        .pipe(jshint())

		// -> Report Lint
        .pipe(jshint.reporter("default"));

});




/* Watchers ------------------------------------------------------------------------------ */

gulp.task("js-watch", function() {

	livereload.listen();

    gulp.watch( "src/app/**/*.js", [ "clear-dist-js","js" ] );

});

gulp.task("dev-watch", function() {

	livereload.listen();

	gulp.watch( ["src/*.html","src/partials/*.html","src/app/**/*.html"], [ "html" ] );

    gulp.watch( "src/app/**/*.js", [ "clear-dist-js","js" ] );

	var scss_files = [
		"src/css/*.scss",
		"src/bower_components/bootstrap/scss/*.scss"
	];

    gulp.watch( scss_files, [ "clear-dist-css","scss" ] );

});



/* Task Groups --------------------------------------------------------------------------- */

gulp.task("development", [ "html", "scss", "js", "dev-watch" ] );

gulp.task("js-dev", [ "js", "js-watch" ] );
