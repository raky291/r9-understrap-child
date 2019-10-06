<?php

defined('ABSPATH') || exit;

class R9_Understrap
{
    public function __construct()
    {
        remove_filter('the_content', 'wpautop');
        remove_filter('the_excerpt', 'wpautop');

        add_action('wp_enqueue_scripts', array($this, 'add_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'remove_scripts'), 20);
        add_action('wp_enqueue_scripts', array($this, 'move_scripts'), 30);

        add_filter('wpcf7_autop_or_not', '__return_false');
        add_filter('wpcf7_load_css', '__return_false');
    }

    public function add_scripts()
    {
        $this->r9_enqueue_style('r9-understrap-styles', '/wwwroot/dist/css/main.css');
        $this->r9_enqueue_script('r9-understrap-scripts', '/wwwroot/dist/js/main.js', array('jquery'));
    }

    public function remove_scripts()
    {
        wp_dequeue_style('understrap-styles');
        wp_deregister_style('understrap-styles');
        wp_dequeue_script('understrap-scripts');
        wp_deregister_script('understrap-scripts');
    }

    public function move_scripts()
    {
        wp_script_add_data('jquery', 'group', 1);
        wp_script_add_data('jquery-core', 'group', 1);
        wp_script_add_data('jquery-migrate', 'group', 1);
    }

    private function r9_enqueue_style($handle, $src)
    {
        wp_enqueue_style(
            $handle,
            __R9_UNDERSTRAP_URL__ . $src,
            array(),
            filemtime(__R9_UNDERSTRAP_DIR__ . $src)
        );
    }

    private function r9_enqueue_script($handle, $src, $deps)
    {
        wp_enqueue_script(
            $handle,
            __R9_UNDERSTRAP_URL__ . $src,
            $deps,
            filemtime(__R9_UNDERSTRAP_DIR__ . $src),
            true
        );
    }
}

new R9_Understrap();
