<?php

function uygulama_vitrini_scripts()
{
    // Styles
    wp_enqueue_style('uygulama-vitrini-style', get_stylesheet_uri());
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0');

    // Scripts
    wp_enqueue_script('uygulama-vitrini-main', get_template_directory_uri() . '/js/main.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'uygulama_vitrini_scripts');

function uygulama_vitrini_setup()
{
    // Register Menu
    register_nav_menus(array(
        'header-menu' => __('Header Menu', 'uygulama-vitrini'),
    ));

    // Add Title Tag Support
    add_theme_support('title-tag');
}
add_action('after_setup_theme', 'uygulama_vitrini_setup');
