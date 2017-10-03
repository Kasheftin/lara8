const path = require('path');
const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
   .sass('resources/assets/sass/app.scss', 'public/css')
	.webpackConfig({
		resolve: {
			alias: {
				'~': path.resolve(__dirname,'resources/assets/js'),
				'#': path.resolve(__dirname,'resources/assets/js/components')
			}
		}
	})
	.autoload({
		jquery: ['$','window.$','jquery','jQuery','window.jquery','window.jQuery'],
		underscore: ['_','window._'],
		axios: ['axios','window.axios'],
		'popper.js/dist/umd/popper.js': ['Popper']
	})
	.js('resources/assets/js/main.js', 'public/js');