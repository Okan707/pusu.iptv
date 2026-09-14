<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

    <header class="main-header">
        <div class="container">
            <a href="<?php echo home_url(); ?>" class="logo">Uygulama<span>Vitrini</span></a>
            <nav class="main-nav">
                <?php 
                wp_nav_menu( array( 
                    'theme_location' => 'header-menu',
                    'container'      => false,
                    'menu_class'     => '',
                    'fallback_cb'    => false,
                    'items_wrap'     => '<ul>%3$s</ul>'
                ) ); 
                ?>
                <!-- Fallback if menu is empty (optional, keeping original hardcoded just in case, but usually better to leave empty) -->
                <?php if ( ! has_nav_menu( 'header-menu' ) ) : ?>
                <ul>
                    <li><a href="#kelime-avcisi">Kelime Avcısı</a></li>
                    <li><a href="#dil-hazinesi">Dil Hazinesi</a></li>
                    <li><a href="#pusu-iptv">Püsü IPTV</a></li>
                </ul>
                <?php endif; ?>
            </nav>
        </div>
    </header>
