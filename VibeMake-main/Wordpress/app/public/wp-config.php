<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'xc?5r]8,/O,|[4+6i8wq[onX vWI];50$0ysK-ov}{#S_AT0 s7LEcGa]?Lq6I+k' );
define( 'SECURE_AUTH_KEY',   'gpIFI?SCCPOv-x&3C&U[/}O0hkl- t]+T.n .($vIl8U=s x~/dtohmdeB3[cj[G' );
define( 'LOGGED_IN_KEY',     'cNev#r,Fe46+bAn%M 5xvXvPQ1IO2=^k6HFv{MzN&nylTl4b,2e7IZ.wygC.~Hb&' );
define( 'NONCE_KEY',         'DG|KvWte[r+ m[TrHZ4I)2m2.D#Ia {m%$,l^l&@Zm,]My0La,y>;0(VQ.aQ!{ms' );
define( 'AUTH_SALT',         '9vN!ni_GzbllG7}+*IOGR8Fd2u{_rIs,(H={%]5yC<*-jZ.rpp#]{t)jzz?fV=FP' );
define( 'SECURE_AUTH_SALT',  '/0^8f-G9=pOh9) 48QVUH$Gi^PXf-z/K_|B!*hj@5^9Gz&>?SCQIy_|2vNyhLf$[' );
define( 'LOGGED_IN_SALT',    '3{Ed4:*w(7:Hk8lSv_TOma2LXkQJQ3dtS-l2H.KhRuw.?SAvf)klFdUzyKtnL96L' );
define( 'NONCE_SALT',        'HkY-DG$T/Gq27O4U^*V%eiQ|gHh(dz}1P0hdL/>tU;Bow 9r#e5c[cS&#L> b RJ' );
define( 'WP_CACHE_KEY_SALT', 'VwfWzgXR}<BrhHC)X}sw=e=`_rO~!QI{/mLm]7r;h6-p;x)lGz@g3}3oiT5$p%6H' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
