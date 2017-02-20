<?php
add_theme_support('post-thumbnails');




function styles_loader() {
  wp_enqueue_style( 'moddest-vendor-styles', get_template_directory_uri() . '/css/vendor.css' );
  wp_enqueue_style( 'moddest-layout-styles', get_template_directory_uri() . '/css/layout.css' );
}
add_action( 'wp_enqueue_scripts', 'styles_loader' );




function scripts_loader() {
  wp_enqueue_script( 'moddest-vendor-scripts', get_template_directory_uri() . '/js/vendor.js' );
  wp_enqueue_script( 'moddest-layout-scripts', get_template_directory_uri() . '/js/layout.js' );
}
add_action( 'wp_enqueue_scripts', 'scripts_loader' );




register_nav_menu('main_nav', 'Main nav');