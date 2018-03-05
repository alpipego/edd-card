<?php
/**
 * Plugin Name:     EDD Card
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     Adaption of @jessepolak's Card for Easy Digital Downloads
 * Author:          Alexander Goller
 * Author URI:      https://alexandergoller.com
 * Text Domain:     edd-card
 * Domain Path:     /languages
 * Version:         1.0.0
 * Tested up to:    4.9
 * Requires PHP:    5.4
 * License:         MIT
 * License URI:     https://opensource.org/licenses/MIT
 *
 * @package         EddCard
 */

namespace Alpipego\EddCard;

add_action('wp_enqueue_scripts', function () {
    $debug = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG);
    wp_enqueue_script(
        'edd-card',
        plugin_dir_url(__FILE__) . 'js/edd-card' . ($debug ? 'js' : 'min.js'),
        $debug ? ['jquery', 'jquery.card'] : ['jquery'],
        '1.0.0',
        'true'
    );

    if ($debug) {
        wp_register_script('jquery.card', plugin_dir_url(__FILE__) . 'js/jquery.card.js', ['jquery'], '2.4.0', true);
    }

    wp_localize_script('edd-card', 'eddcard', [
        'validDate' => __('valid\ndate', 'edd-card'),
        'monthYear' => __('mm/yyyy', 'edd-card'),
        'debug'     => $debug,
    ]);
});

add_action('wp_enqueue_scripts', function () {
    wp_dequeue_script('jQuery.payment');
}, 101);
