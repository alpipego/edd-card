<?php
/**
 * Plugin Name: EDD Card
 * Plugin URI: https://github.com/alpipego/edd-card
 * Description: Adaption of @jessepollak's Card for Easy Digital Downloads
 * Author: Alexander Goller
 * Author URI: https://alexandergoller.com
 * Text Domain: edd-card
 * Domain Path: /languages
 * Version: 1.0.0
 * Tested up to: 4.9
 * Requires at least: 3.1.0
 * Requires PHP: 5.4
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 */

namespace Alpipego\EddCard;

add_action( 'wp_enqueue_scripts', function () {
	$debug = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG );
	wp_register_script(
		'edd-card',
		plugin_dir_url( __FILE__ ) . 'js/edd-card.' . ( $debug ? 'js' : 'min.js' ),
		$debug ? [ 'jquery', 'jquery.card' ] : [ 'jquery' ],
		$debug ? filemtime( __DIR__ . '/js/edd-card.js' ) : '1.0.0',
		'true'
	);

	if ( $debug ) {
		wp_register_script( 'jquery.card', plugin_dir_url( __FILE__ ) . 'js/jquery.card.js', [ 'jquery' ], '2.4.0', true );
	}

	wp_localize_script( 'edd-card', 'eddcard', [
		'validDate' => __( 'valid\ndate', 'edd-card' ),
		'monthYear' => __( 'mm/yyyy', 'edd-card' ),
		'debug'     => $debug,
	] );

	if ( is_cart() ) {
		wp_enqueue_script( 'edd-card' );
	}
} );

add_action( 'wp_enqueue_scripts', function () {
	wp_dequeue_script( 'jQuery.payment' );
}, 101 );

if ( (bool) apply_filters( 'edd/card/css', true ) ) {
	add_action( 'wp_head', function () {
		$style        = file_get_contents( __DIR__ . '/css/edd-card.css' );
		$cardPosition = (string) apply_filters( 'edd/card/position', 'center' );
		if ( $cardPosition === 'left' ) {
			$style = preg_replace( '%/\*\* position \*/%', 'margin-left: 0!important', $style );
		} elseif ( $cardPosition === 'right' ) {
			$style = preg_replace( '%/\*\* position \*/%', 'margin-right: 0!important', $style );
		}
		printf( '<style>%s</style>', preg_replace( '/[\h\s]+/', ' ', $style ) );
	} );
}

function is_cart() {
	global $wp;

	if ( ! function_exists( 'edd_get_checkout_uri' ) ) {
		return false;
	}

	return edd_get_checkout_uri() === trailingslashit( home_url( $wp->request ) );
}
