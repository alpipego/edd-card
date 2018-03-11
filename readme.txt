=== EDD Card ===
Contributors: alpipego
Tags: edd, credit-card, easy digital downloads
Donate Link: https://www.paypal.me/alpipego/5
Requires at least: 3.1.0
Tested up to: 4.9
Stable tag: 1.0.3
Requires PHP: 5.4
License: MIT
License URI: https://opensource.org/licenses/MIT

Adaption of @jessepollak's Card for Easy Digital Downloads.

== Description ==

This plugin adds [@jessepollak's Card library](https://github.com/jessepollak/card) to the checkout page of Easy Digital Downloads.

> Everything is created with pure CSS, HTML, and Javascript — no images required

Check out Jesse's [Demo](https://jessepollak.github.io/card/).

== Installation ==

1. Upload the plugin to your `plugins` directory
1. Activate the plugin through the 'Plugins' menu in WordPress

You have access to the following filter:

```
apply_filters( 'edd/card/position', 'center' );
```

It takes a string `center`, `left`, `right`, that determines the position of the card in its container.

== Frequently Asked Questions ==

== Screenshots ==

1. Filling in card details, live updates the card
2. There are a lot of different types of cards included

== Changelog ==

= 1.0.2 =
* Minor readme update
