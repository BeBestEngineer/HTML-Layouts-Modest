

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><?php bloginfo('name'); ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <?php wp_head(); ?>
</head>
<body>



  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col-sm-2">
          <div class="logo">
            <a href="<?php echo home_url(); ?>" class="logo-link"><img src="<?php bloginfo('template_url'); ?>/images/logo/logo.png" alt="modest-logo" class="logo-img"></a>
          </div>
        </div>
        <div class="col-lg-7 col-lg-offset-3 col-md-9 col-md-offset-1 col-sm-12">
          <nav class="navbar" role="navigation">
            <div class="row">
              <div class="container-fluid">
                <div class="row">
                  <!-- Brand and toggle get grouped for better mobile display -->
                  <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                  </div>
                  <!-- Collect the nav links, forms, and other content for toggling -->
                  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                    <?php
                    wp_nav_menu( array( 'menu'=>'Main nav', 'container' => '', 'menu_class'=>'nav  navbar-nav  list-unstyled', 'menu_id'=>'main-menu-list' ) );
                    ?>
                  </div><!-- /.navbar-collapse -->
                </div>
              </div><!-- /.container-fluid -->
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>