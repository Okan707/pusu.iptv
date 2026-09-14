<?php get_header(); ?>

<section class="hero">
    <div class="container hero-content">
        <h1>Hayatı Kolaylaştıran <span class="highlight">Uygulamalar</span></h1>
        <p>
            <?php bloginfo('description'); ?>
        </p>
        <a href="#apps" class="btn btn-primary">Uygulamaları Keşfet</a>
    </div>
    <div class="hero-bg-accent"></div>
</section>

<main id="apps" class="container apps-container">

    <!-- Kelime Avcısı -->
    <article class="app-card" id="kelime-avcisi">
        <div class="app-icon">
            <img src="<?php echo get_template_directory_uri(); ?>/images/kelime_avcisi_icon.svg"
                alt="Kelime Avcısı İkonu">
        </div>
        <div class="app-info">
            <h2>Kelime Avcısı</h2>
            <p class="app-desc">Kelime dağarcığınızı geliştirirken eğlenin. Zorlu seviyeler ve günlük bulmacalarla
                zihninizi taze tutun.</p>
            <div class="app-features">
                <span><i class="fas fa-check"></i> Çevrimdışı Mod</span>
                <span><i class="fas fa-check"></i> 1000+ Seviye</span>
            </div>
            <a href="#" class="btn btn-download">İndir <span class="version">v1.2</span></a>
        </div>
    </article>

    <!-- Dil Hazinesi -->
    <article class="app-card" id="dil-hazinesi">
        <div class="app-icon">
            <img src="<?php echo get_template_directory_uri(); ?>/images/dil_hazinesi_icon.svg"
                alt="Dil Hazinesi İkonu">
        </div>
        <div class="app-info">
            <h2>Dil Hazinesi</h2>
            <p class="app-desc">Yeni bir dil öğrenmek hiç bu kadar keyifli olmamıştı. İnteraktif dersler ve pratik
                alıştırmalar.</p>
            <div class="app-features">
                <span><i class="fas fa-check"></i> 5 Farklı Dil</span>
                <span><i class="fas fa-check"></i> Sesli Telaffuz</span>
            </div>
            <a href="#" class="btn btn-download">İndir <span class="version">v2.0</span></a>
        </div>
    </article>

    <!-- Püsü IPTV -->
    <article class="app-card" id="pusu-iptv">
        <div class="app-icon">
            <img src="<?php echo get_template_directory_uri(); ?>/images/pusu_iptv_icon.svg" alt="Püsü IPTV İkonu">
        </div>
        <div class="app-info">
            <h2>Püsü IPTV</h2>
            <p class="app-desc">Favori kanallarınız, filmleriniz ve dizileriniz tek bir yerde. Yüksek kaliteli yayın
                deneyimi.</p>
            <div class="app-features">
                <span><i class="fas fa-check"></i> 4K Destek</span>
                <span><i class="fas fa-check"></i> Hızlı Kanal Geçişi</span>
            </div>
            <a href="#" class="btn btn-download">İndir <span class="version">v3.5</span></a>
        </div>
    </article>

</main>

<?php get_footer(); ?>