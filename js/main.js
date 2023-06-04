"use strict";
//Wrapping all JavaScript code into a IIFE function for prevent global variables creation
(function(){

var $body = jQuery('body');
var $window = jQuery(window);

//hidding menu elements that do not fit in menu width
//processing center logo
function menuHideExtraElements() {

	//cleaneng changed elements
	jQuery('.sf-more-li, .sf-logo-li').remove();
	var windowWidth = jQuery('body').innerWidth();

	jQuery('.sf-menu').each(function(){
		var $thisMenu = jQuery(this);
		var $menuWraper = $thisMenu.closest('.mainmenu_wrapper');
		$menuWraper.attr('style', '');
		if (windowWidth > 1199) {
			//grab all main menu first level items
			var $menuLis = $menuWraper.find('.sf-menu > li');
			$menuLis.removeClass('sf-md-hidden');

			var $headerLogoCenter = $thisMenu.closest('.header_logo_center');
			var logoWidth = 0;
			var summaryLiWidth = 0;

			if ( $headerLogoCenter.length ) {
				var $logo = $headerLogoCenter.find('.logo');
				// 30/2 - left and right margins
				logoWidth = $logo.outerWidth(true) + 70;
			}

			// var wrapperWidth = jQuery('.sf-menu').width();
			var wrapperWidth = $menuWraper.outerWidth(true);
			$menuLis.each(function(index) {
				var elementWidth = jQuery(this).outerWidth();
				summaryLiWidth += elementWidth;
				if(summaryLiWidth >= (wrapperWidth-logoWidth)) {
					var $newLi = jQuery('<li class="sf-more-li"><a>...</a><ul></ul></li>');
					jQuery($menuLis[index - 1 ]).before($newLi);
					var newLiWidth = jQuery($newLi).outerWidth(true);
					var $extraLiElements = $menuLis.filter(':gt('+ ( index - 2 ) +')');
					$extraLiElements.clone().appendTo($newLi.find('ul'));
					$extraLiElements.addClass('sf-md-hidden');
					return false;
				}
			});

			if ( $headerLogoCenter.length ) {
				var $menuLisVisible = $headerLogoCenter.find('.sf-menu > li:not(.sf-md-hidden)');
				var menuLength = $menuLisVisible.length;
				var summaryLiVisibleWidth = 0;
				$menuLisVisible.each(function(){
					summaryLiVisibleWidth += jQuery(this).outerWidth();
				});

				var centerLi = Math.floor( menuLength / 2 );
				if ( (menuLength % 2 === 0) ) {
					centerLi--;
				}
				var $liLeftFromLogo = $menuLisVisible.eq(centerLi);
				$liLeftFromLogo.after('<li class="sf-logo-li"></li>');
				$headerLogoCenter.find('.sf-logo-li').width(logoWidth);
				var liLeftRightDotX = $liLeftFromLogo.offset().left + $liLeftFromLogo.outerWidth();
				var logoLeftDotX = windowWidth/2 - logoWidth/2;
				var menuLeftOffset = liLeftRightDotX - logoLeftDotX;
				$menuWraper.css({'left': -menuLeftOffset})
			}

		}// > 1199
	}); //sf-menu each
} //menuHideExtraElements

function initMegaMenu() {
	var $megaMenu = jQuery('.mainmenu_wrapper .mega-menu');
	if($megaMenu.length) {
		var windowWidth = jQuery('body').innerWidth();
		if (windowWidth > 1199) {
			$megaMenu.each(function(){
				var $thisMegaMenu = jQuery(this);
				//temporary showing mega menu to propper size calc
				$thisMegaMenu.css({'display': 'block', 'left': 'auto'});
				var thisWidth = $thisMegaMenu.outerWidth();
				var thisOffset = $thisMegaMenu.offset().left;
				var thisLeft = (thisOffset + (thisWidth/2)) - windowWidth/2;
				$thisMegaMenu.css({'left' : -thisLeft, 'display': 'none'});
				if(!$thisMegaMenu.closest('ul').hasClass('nav')) {
					$thisMegaMenu.css('left', '');
				}
			});
		}
	}
}

function affixSidebarInit() {
	var $affixAside = jQuery('.affix-aside');
	if ($affixAside.length) {

			//on stick and unstick event
			$affixAside.on('affix.bs.affix', function(e) {
				var affixWidth = $affixAside.width() - 1;
				var affixLeft = $affixAside.offset().left;
				$affixAside
					.width(affixWidth)
					.css("left", affixLeft);
			}).on('affix-top.bs.affix affix-bottom.bs.affix', function(e) {
				$affixAside.css({"width": "", "left": ""});
			});

			//counting offset
			var offsetTop = $affixAside.offset().top - jQuery('.page_header').height();
			var offsetBottom = jQuery('.page_footer').outerHeight(true) + jQuery('.page_copyright').outerHeight(true);

			$affixAside.affix({
				offset: {
					top: offsetTop,
					bottom: offsetBottom
				},
			});

			jQuery(window).on('resize', function() {
				$affixAside.css({"width": "", "left": ""});

				if( $affixAside.hasClass('affix')) {
					//returning sidebar in top position if it is sticked because of unexpacted behavior
					$affixAside.removeClass("affix").css("left", "").addClass("affix-top");
				}

				var offsetTop = jQuery('.page_topline').outerHeight(true)
								+ jQuery('.page_toplogo').outerHeight(true)
								+ jQuery('.page_header').outerHeight(true)
								+ jQuery('.page_breadcrumbs').outerHeight(true)
								+ jQuery('.blog_slider').outerHeight(true);
				var offsetBottom = jQuery('.page_footer').outerHeight(true)
								+ jQuery('.page_copyright').outerHeight(true);

				$affixAside.data('bs.affix').options.offset.top = offsetTop;
				$affixAside.data('bs.affix').options.offset.bottom = offsetBottom;

				$affixAside.affix('checkPosition');

			});

	}//eof checking of affix sidebar existing
}

//helper functions to init elements only when they appears in viewport (jQUery.appear plugin)
function initAnimateElement(self, index) {
	var animationClass = !self.data('animation') ? 'fadeInUp' : self.data('animation');
	var animationDelay = !self.data('delay') ? index * 150 : self.data('delay');
	setTimeout(function(){
		self.addClass("animated " + animationClass);
	}, animationDelay);
}
function initCounter(self) {
	if (self.hasClass('counted')) {
		return;
	} else {
		self.countTo().addClass('counted');
	}
}
function initProgressbar(el) {
	el.progressbar({
		transition_delay: 300
	});
}
function initChart(el) {
	var data = el.data();
	var size = data.size ? data.size : 270;
	var line = data.line ? data.line : 20;
	var bgcolor = data.bgcolor ? data.bgcolor : '#ffffff';
	var trackcolor = data.trackcolor ? data.trackcolor : '#c14240';
	var speed = data.speed ? data.speed : 3000;

	el.easyPieChart({
		barColor: trackcolor,
		trackColor: bgcolor,
		scaleColor: false,
		scaleLength: false,
		lineCap: 'butt',
		lineWidth: line,
		size: size,
		rotate: 0,
		animate: speed,
		onStep: function(from, to, percent) {
			jQuery(this.el).find('.percent').text(Math.round(percent));
		}
	});
}

//related posts thumbnail max-width calculate
function relatedPostsThumbnail() {
    jQuery('.post-related .item-media-wrap, .post-related .item-media .owl-item').each(function(i, el){
        var $mediaWrap = jQuery( el );
        var $media = $mediaWrap.children('.item-media, .item');
        var $mediaImage = $media.children('img');
        var requiredImageWidth = $mediaWrap.height() * $mediaImage.width() / $mediaImage.height();
        if (requiredImageWidth > $media.width()) {
            $mediaImage.css('width', requiredImageWidth);
        } else {
            $mediaImage.css('max-width', '100%');
        }
    });
}

//equalize header side columns width
function headerColumnsEqualize() {
	var $header = jQuery('.page_header').first();
	var $leftLogo = $header.find('.header_left_logo');
	var $rightButtons = $header.find('.header_right_buttons');

	$leftLogo.css( 'min-width', '0' );
	$rightButtons.css( 'min-width', '0' );

	if ( parseInt( $leftLogo.css( 'width' ) ) > parseInt( $rightButtons.css( 'width' ) ) ) {
		$rightButtons.css( 'min-width', $leftLogo.css( 'width' ) );
	} else {
		$leftLogo.css( 'min-width', $rightButtons.css( 'width' ) );
	}
}

//function that initiating template plugins on window.load event
function windowLoadInit() {

	////////////
	//mainmenu//
	////////////
	if (jQuery().scrollbar) {
		jQuery('[class*="scrollbar-"]').scrollbar();
	}
	if (jQuery().superfish) {
		jQuery('ul.sf-menu').superfish({
			popUpSelector: 'ul:not(.mega-menu ul), .mega-menu ',
			delay:       700,
			animation:   {opacity:'show', marginTop: 0},
			animationOut: {opacity: 'hide',  marginTop: 10},
			speed:       200,
			speedOut:    200,
			disableHI:   false,
			cssArrows:   true,
			autoArrows:  true,
            onInit: function () {
                var $thisMenu = jQuery(this);
                $thisMenu.find('.sf-with-ul').after('<span class="sf-menu-item-mobile-toggler"/>');
                $thisMenu.find('.sf-menu-item-mobile-toggler').on('click', function (e) {
                    var $parentLi = jQuery(this).parent();
                    if($parentLi.hasClass('sfHover')) {
                        $parentLi.superfish('hide');
                    } else {
                        $parentLi.superfish('show');
                    }
                });
            }

		});
		jQuery('ul.sf-menu-side').superfish({
			popUpSelector: 'ul:not(.mega-menu ul), .mega-menu ',
			delay:       500,
			animation:   {opacity:'show', height: 100 +'%'},
			animationOut: {opacity: 'hide',  height: 0},
			speed:       400,
			speedOut:    300,
			disableHI:   false,
			cssArrows:   true,
			autoArrows:  true
		});
	}


	//toggle mobile menu
	jQuery('.toggle_menu').on('click', function(){
		jQuery(this).toggleClass('mobile-active');
				// .closest('.page_header')
				// .toggleClass('mobile-active')
				// .end()
				// .closest('.transparent_wrapper')
				// .next()
				// .find('.page_header')
				// .toggleClass('mobile-active')
				// .end()
				// .closest('.page_toplogo')
				// .next()
				// .find('.page_header')
				// .toggleClass('mobile-active');
		jQuery('.page_header').first().toggleClass('mobile-active');
	});

	jQuery('.mainmenu a').on('click', function(){
		var $this = jQuery(this);
		//If this is a local link or item with sumbenu - not toggling menu
		if (($this.hasClass('sf-with-ul')) || !($this.attr('href').charAt(0) === '#')) {
			return;
		}
		$this
		.closest('.page_header')
		.toggleClass('mobile-active')
		.find('.toggle_menu')
		.toggleClass('mobile-active');
	});

	//side header processing
	var $sideHeader = jQuery('.page_header_side');
	// toggle sub-menus visibility on menu-click
	jQuery('ul.menu-side-click').find('li').each(function(){
		var $thisLi = jQuery(this);
		//toggle submenu only for menu items with submenu
		if ($thisLi.find('ul').length)  {
			$thisLi
				.append('<span class="activate_submenu"></span>')
				//adding anchor
				.find('.activate_submenu, > a')
				.on('click', function(e) {
					var $thisSpanOrA = jQuery(this);
					//if this is a link and it is already opened - going to link
					if (($thisSpanOrA.attr('href') === '#') || !($thisSpanOrA.parent().hasClass('active-submenu'))) {
						e.preventDefault();
					}
					if ($thisSpanOrA.parent().hasClass('active-submenu')) {
						e.preventDefault();
						$thisSpanOrA.parent().removeClass('active-submenu');
						return;
					}
					$thisLi.addClass('active-submenu').siblings().removeClass('active-submenu');
				});
		} //eof sumbenu check
	});
	// toggle side header for single page navigation
	jQuery('.vertical_menu_header').find('ul.menu-side-click').find('a').each(function(){
		var $thisA = jQuery(this);
		var link = $thisA.attr('href');
		if ( (link[0] === '#') && (link.length > 1) ) {
			$thisA.on('click', function() {
				$sideHeader.removeClass('active-slide-side-header');
			});
		}
	});

	if ($sideHeader.length) {
		jQuery('.toggle_menu_side').on('click', function(){
			var $thisToggler = jQuery(this);
			if ($thisToggler.hasClass('header-slide')) {
				$sideHeader.toggleClass('active-slide-side-header');
			} else {
				if($thisToggler.parent().hasClass('header_side_right')) {
					$body.toggleClass('active-side-header slide-right');
				} else {
					$body.toggleClass('active-side-header');
				}
			}
		});
		//hidding side header on click outside header
		$body.on('click', function( e ) {
			if ( !(jQuery(e.target).closest('.page_header_side').length) && !($sideHeader.hasClass('page_header_side_sticked') ) && !($sideHeader.hasClass('vertical_menu_header') ) ) {
				$sideHeader.removeClass('active-slide-side-header');
				$body.removeClass('active-side-header slide-right');
			}
		});
	} //sideHeader check

	//1 and 2/3/4th level mainmenu offscreen fix
	var MainWindowWidth = jQuery(window).width();
	var boxWrapperWidth = jQuery('#box_wrapper').width();
	jQuery(window).on('resize', function(){
		MainWindowWidth = jQuery(window).width();
		boxWrapperWidth = jQuery('#box_wrapper').width();
	});
	//2/3/4 levels
	jQuery('.mainmenu_wrapper .sf-menu').on('mouseover', 'ul li', function(){
	// jQuery('.mainmenu').on('mouseover', 'ul li', function(){
		if(MainWindowWidth > 1199) {
			var $this = jQuery(this);
			// checks if third level menu exist
			var subMenuExist = $this.find('ul').length;
			if( subMenuExist > 0){
				var subMenuWidth = $this.find('ul, div').first().width();
				var subMenuOffset = $this.find('ul, div').first().parent().offset().left + subMenuWidth;
				// if sub menu is off screen, give new position
				if((subMenuOffset + subMenuWidth) > boxWrapperWidth){
					var newSubMenuPosition = subMenuWidth + 0;
					$this.addClass('left').find('ul, div').first().css({
						left: -newSubMenuPosition,
					});
				} else {
					$this.find('ul, div').first().css({
						left: '100%',
					});
				}
			}
		}
	//1st level
	}).on('mouseover', '> li', function(){
		if(MainWindowWidth > 1199) {
			var $this = jQuery(this);
			var subMenuExist = $this.find('ul').length;
			if( subMenuExist > 0){
				var subMenuWidth = $this.find('ul').width();
				var subMenuOffset = $this.find('ul').parent().offset().left - (jQuery(window).width() / 2 - boxWrapperWidth / 2);
				// if sub menu is off screen, give new position
				if((subMenuOffset + subMenuWidth) > boxWrapperWidth){
					var newSubMenuPosition = boxWrapperWidth - (subMenuOffset + subMenuWidth);
					$this.find('ul').first().css({
						left: newSubMenuPosition,
					});
				}
			}
		}
	});

	/////////////////////////////////////////
	//single page localscroll and scrollspy//
	/////////////////////////////////////////
	var navHeight = jQuery('.page_header').outerHeight(true);
	//if sidebar nav exists - binding to it. Else - to main horizontal nav
	if (jQuery('.mainmenu_side_wrapper').length) {
		$body.scrollspy({
			target: '.mainmenu_side_wrapper',
			offset: navHeight + 10
		});
	} else if (jQuery('.mainmenu_wrapper').length) {
		$body.scrollspy({
			target: '.mainmenu_wrapper',
			offset: navHeight + 10
		})
	}
	if (jQuery().localScroll) {
		jQuery('.mainmenu_wrapper > ul, .mainmenu_side_wrapper > ul, #land, .scroll_button_wrap, .intro-layer').localScroll({
			duration:900,
			easing:'easeInOutQuart',
			offset: -navHeight
		});
	}

	//background image teaser and secitons with half image bg
	//put this before prettyPhoto init because image may be wrapped in prettyPhoto link
	jQuery(".bg_teaser, .image_cover, .slide-image-wrap").each(function(){
		var $teaser = jQuery(this);
		var $image = $teaser.find("img").first();
		// if (!$image.length) {
		// 	$image = $teaser.parent().find("img").first();
		// }
		if (!$image.length) {
			return;
		}
		var imagePath = $image.attr("src");
		$teaser.css("background-image", "url(" + imagePath + ")");
	});

	// toTop
	if (jQuery().UItoTop) {
		jQuery().UItoTop({ easingType: 'easeInOutQuart' });
	}

	//parallax
	if (jQuery().parallax) {
		jQuery('.parallax').parallax("50%", 0.01);
	}

	//prettyPhoto
if (jQuery().prettyPhoto) {
	jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({
		// hook: 'data-gal',
		theme: 'facebook', /* light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default*/
		social_tools: false,
		deeplinking: false,
		default_width: 1170,
		default_height: 780,
		//test
	});
}

	////////////////////////////////////////
	//init Bootstrap JS components//
	////////////////////////////////////////
	//bootstrap carousel
	if (jQuery().carousel) {
		jQuery('.carousel').carousel();
	}
	//bootstrap tab - show first tab
	jQuery('.nav-tabs').each(function() {
		jQuery(this).find('a').first().tab('show');
	});
	jQuery('.tab-content').each(function() {
		jQuery(this).find('.tab-pane').first().addClass('fade in');
	});
	//bootstrap collapse - show first tab
	jQuery('.panel-group').each(function() {
		jQuery(this).find('a').first().filter('.collapsed').trigger('click');
	});
	//tooltip
	if (jQuery().tooltip) {
		jQuery('[data-toggle="tooltip"]').tooltip();
	}

	//comingsoon counter
	if (jQuery().countdown) {
		//today date plus month for demo purpose
		var demoDate = new Date();
		demoDate.setMonth(demoDate.getMonth()+1);
		jQuery('#comingsoon-countdown').countdown({until: demoDate});

		setTimeout(function() {
			jQuery('#comingsoon-countdown').countdown('pause');
		}, 2000);
	}

	/////////////////////////////////////////////////
	//PHP widgets - contact form, search, MailChimp//
	/////////////////////////////////////////////////

	//contact form processing
	jQuery('form.contact-form').on('submit', function( e ){
		e.preventDefault();
		var $form = jQuery(this);
		jQuery($form).find('span.contact-form-respond').remove();

		//checking on empty values
		jQuery($form).find('[aria-required="true"], [required]').each(function(index) {
			var $thisRequired = jQuery(this);
			if (!$thisRequired.val().length) {
				$thisRequired
					.addClass('invalid')
					.on('focus', function(){
						$thisRequired
							.removeClass('invalid');
					});
			}
		});
		//if one of form fields is empty - exit
		if ($form.find('[aria-required="true"], [required]').hasClass('invalid')) {
			return;
		}

		//sending form data to PHP server if fields are not empty
		var request = $form.serialize();
		var ajax = jQuery.post( "contact-form.php", request )
		.done(function( data ) {
			jQuery($form).find('[type="submit"]').attr('disabled', false).parent().append('<span class="contact-form-respond highlight">'+data+'</span>');
			//cleaning form
			var $formErrors = $form.find('.form-errors');
			if ( !$formErrors.length ) {
				$form[0].reset();
			}
		})
		.fail(function( data ) {
			jQuery($form).find('[type="submit"]').attr('disabled', false).parent().append('<span class="contact-form-respond highlight">Mail cannot be sent. You need PHP server to send mail.</span>');
		})
	});


	//search modal
	jQuery(".search_modal_button").on('click', function(e){
		e.preventDefault();
		jQuery('#search_modal').modal('show').find('input').first().focus();
	});
	//search form processing
	jQuery('form.searchform').on('submit', function( e ){

		e.preventDefault();
		var $form = jQuery(this);
		var $searchModal = jQuery('#search_modal');
		$searchModal.find('div.searchform-respond').remove();

		//checking on empty values
		jQuery($form).find('[type="text"]').each(function(index) {
			var $thisField = jQuery(this);
			if (!$thisField.val().length) {
				$thisField
					.addClass('invalid')
					.on('focus', function(){
						$thisField.removeClass('invalid')
					});
			}
		});
		//if one of form fields is empty - exit
		if ($form.find('[type="text"]').hasClass('invalid')) {
			return;
		}

		$searchModal.modal('show');
		//sending form data to PHP server if fields are not empty
		var request = $form.serialize();
		var ajax = jQuery.post( "search.php", request )
		.done(function( data ) {
			$searchModal.append('<div class="searchform-respond">'+data+'</div>');
		})
		.fail(function( data ) {
			$searchModal.append('<div class="searchform-respond">Search cannot be done. You need PHP server to search.</div>');

		})
	});

	//MailChimp subscribe form processing
	jQuery('.signup').on('submit', function( e ) {
		e.preventDefault();
		var $form = jQuery(this);
		// update user interface
		$form.find('.response').html('Adding email address...');
		// Prepare query string and send AJAX request
		jQuery.ajax({
			url: 'mailchimp/store-address.php',
			data: 'ajax=true&email=' + escape($form.find('.mailchimp_email').val()) + '&fullname=' + escape($form.find('.mailchimp_fullname').val()),
			success: function(msg) {
				$form.find('.response').html(msg);
			}
		});
	});

	//twitter
	if (jQuery().tweet) {
		jQuery('.twitter').tweet({
			modpath: "./twitter/",
			count: 2,
			avatar_size: 48,
			loading_text: 'loading twitter feed...',
			join_text: 'auto',
			username: 'michaeljackson',
			template: "<span class=\"tweet_text highlightlinks\">{tweet_text}</span><span class=\"darklinks\">{time}</span>"
		});
	}


	//adding CSS classes for elements that needs different styles depending on they widht width
	//see 'plugins.js' file
	jQuery('#mainteasers .col-lg-4').addWidthClass({
		breakpoints: [500, 600]
	});

	// init timetable
	var $timetable = jQuery('#timetable');
	if ($timetable.length) {
		// bind filter click
		jQuery('#timetable_filter').on( 'click', 'a', function( e ) {
			e.preventDefault();
			e.stopPropagation();
			var $thisA = jQuery(this);
			if ( $thisA.hasClass('selected') ) {
				// return false;
				return;
			}
			var selector = $thisA.attr('data-filter');
			$timetable
				.find('tbody td')
				.removeClass('current')
				.end()
				.find(selector)
				.closest('td')
				.addClass('current');
			$thisA.closest('ul').find('a').removeClass('selected');
			$thisA.addClass('selected');
	  });
	}

	/////////
	//SHOP///
	/////////
	jQuery('#toggle_shop_view').on('click', function( e ) {
		e.preventDefault();
		jQuery(this).toggleClass('grid-view');
		jQuery('#products').toggleClass('grid-view list-view');
	});
	//zoom image
	if (jQuery().elevateZoom) {
		jQuery('#product-image').elevateZoom({
			gallery: 'product-image-gallery',
			cursor: 'pointer',
			galleryActiveClass: 'active',
			responsive:true,
			loadingIcon: 'img/AjaxLoader.gif'
		});
	}

	//add review button
	jQuery('.review-link').on('click', function( e ) {
		var $thisLink = jQuery(this);
		var reviewTabLink = jQuery('a[href="#reviews_tab"]');
		//show tab only if it's hidden
		if (!reviewTabLink.parent().hasClass('active')) {
			reviewTabLink
			.tab('show')
			.on('shown.bs.tab', function (e) {
				$window.scrollTo($thisLink.attr('href'), 400);
			})
		}
		$window.scrollTo($thisLink.attr('href'), 400);
	});

	//product counter
	jQuery('.plus, .minus').on('click', function( e ) {
		var numberField = jQuery(this).parent().find('[type="number"]');
		var currentVal = numberField.val();
		var sign = jQuery(this).val();
		if (sign === '-') {
			if (currentVal > 1) {
				numberField.val(parseFloat(currentVal) - 1);
			}
		} else {
			numberField.val(parseFloat(currentVal) + 1);
		}
	});

	//remove product from cart
	jQuery('a.remove').on('click', function( e ) {
		e.preventDefault();
		jQuery(this).closest('tr, .media').remove();
	});

	//price filter - only for HTML
	if (jQuery().slider) {
		var $rangeSlider = jQuery(".slider-range-price");
		if ($rangeSlider.length) {
			var $priceMin = jQuery(".price_from");
			var $priceMax = jQuery(".price_to");
			$rangeSlider.slider({
				range: true,
				min: 0,
				max: 200,
				values: [ 30, 100 ],
				slide: function( event, ui ) {
					$priceMin.html( '$' + ui.values[ 0 ] );
					$priceMax.html( '$' + ui.values[ 1 ] );
				}
			});
			$priceMin.html('$' + $rangeSlider.slider("values", 0));
			$priceMax.html('$' + $rangeSlider.slider("values", 1));
		}
	}

	//color filter
	jQuery(".color-filters").find("a[data-background-color]").each(function() {
		jQuery(this).css({"background-color" : jQuery(this).data("background-color")});
	}); // end of SHOP
	///eof docready

	//////////////
	//flexslider//
	//////////////
	if (jQuery().flexslider) {
		var $introSlider = jQuery(".intro_section .flexslider");
		$introSlider.each(function(index){
			var $currentSlider = jQuery(this);
			var data = $currentSlider.data();
			var nav = (data.nav !== 'undefined') ? data.nav : true;
			var dots = (data.dots !== 'undefined') ? data.dots : true;
			var dotsDisabled = $currentSlider.find('.slides').children().length < 2 ? 'dots-disabled' : '';
			$currentSlider.addClass(dotsDisabled);

			$currentSlider.flexslider({
				animation: "fade",
				pauseOnHover: true,
				useCSS: true,
				controlNav: dots,
				directionNav: nav,
				prevText: "",
				nextText: "",
				smoothHeight: false,
				slideshowSpeed:10000,
				animationSpeed:600,
				start: function( slider ) {
					slider.find('.slide_description').children().css({'visibility': 'hidden'});
					slider.find('.flex-active-slide .slide_description').children().each(function(index){
						var self = jQuery(this);
						var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
						setTimeout(function(){
							self.addClass("animated "+animationClass);
						}, index*200);
					});
					slider.find('.flex-control-nav').find('a').each(function() {
						jQuery( this ).html('0' + jQuery( this ).html());
					})
				},
				after: function( slider ){
					slider.find('.flex-active-slide .slide_description').children().each(function(index){
						var self = jQuery(this);
						var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
						setTimeout(function(){
							self.addClass("animated "+animationClass);
						}, index*200);
					});
				},
				end :function( slider ){
					slider.find('.slide_description').children().each(function() {
						var self = jQuery(this);
						var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
						self.removeClass('animated ' + animationClass).css({'visibility': 'hidden'});
							// jQuery(this).attr('class', '');
					});
				},

			})
			//wrapping nav with container - uncomment if need
			.find('.flex-control-nav')
			.wrap('<div class="container-fluid nav-container"/>');
		}); //intro_section flex slider

		jQuery(".flexslider").each(function(index){
			var $currentSlider = jQuery(this);
			//exit if intro slider already activated
			if ($currentSlider.find('.flex-active-slide').length) {
				return;
			}

			var data = $currentSlider.data();
			var nav = (data.nav !== 'undefined') ? data.nav : true;
			var dots = (data.dots !== 'undefined') ? data.dots : true;
			var autoplay = (data.autoplay !== 'undefined') ? data.autoplay : true;
			$currentSlider.flexslider({
				animation: "fade",
				useCSS: true,
				controlNav: dots,
				directionNav: nav,
				prevText: "",
				nextText: "",
				smoothHeight: false,
				slideshow: autoplay,
				slideshowSpeed:5000,
				animationSpeed:400,
				start: function( slider ) {
					slider.find('.flex-control-nav').find('a').each(function() {
						jQuery( this ).html('0' + jQuery( this ).html());
					})
				},
			})
			.find('.flex-control-nav')
			.wrap('<div class="container-fluid nav-container"/>')
		});
	}

	////////////////////
	//header processing/
	////////////////////
	//stick header to top
	//wrap header with div for smooth sticking
	var $header = jQuery('.page_header').first();
	var boxed = $header.closest('.boxed').length;
	if ($header.length) {
		//hiding main menu 1st levele elements that do not fit width
		menuHideExtraElements();
		//mega menu
		initMegaMenu();
		//wrap header for smooth stick and unstick
		var headerHeight = $header.outerHeight();
		$header.wrap('<div class="page_header_wrapper"></div>');
		var $headerWrapper = $header.parent();
		if (!boxed) {
			$headerWrapper.css({height: $header.outerHeight()});
		}

		//headerWrapper classes
		if( $header.hasClass('header_white') ) {
			$headerWrapper.addClass('header_white');
		} else if ( $header.hasClass('header_darkgrey') ) {
			$headerWrapper.addClass('header_darkgrey');
			if ( $header.hasClass('bs') ) {
				$headerWrapper.addClass('bs');
			}
		} else if ( $header.hasClass('header_gradient') ) {
			$headerWrapper.addClass('header_gradient');
		}

		if ( $header.hasClass('header_transparent') ) {
			$headerWrapper.addClass('header_transparent_wrap')
		}
		if ( $header.hasClass('header_v1') ) {
			$headerWrapper.addClass('header_v1_wrap')
		}

		if ( $headerWrapper.next('.intro_section').find('.skew-overlay').length ) {
			$headerWrapper.addClass('before_skew_overlay')
		} 

		//get offset
		var headerOffset = 0;
		//check for sticked template headers
		if (!boxed && !($headerWrapper.css('position') === 'fixed') && !$header.hasClass('vertical_menu_header')) {
			headerOffset = $header.offset().top;
		}

		//for boxed layout - show or hide main menu elements if width has been changed on affix
		jQuery($header).on('affixed-top.bs.affix affixed.bs.affix affixed-bottom.bs.affix', function ( e ) {
			if( $header.hasClass('affix-top') ) {
				$headerWrapper.removeClass('affix-wrapper affix-bottom-wrapper').addClass('affix-top-wrapper');
			} else if ( $header.hasClass('affix') ) {
				$headerWrapper.removeClass('affix-top-wrapper affix-bottom-wrapper').addClass('affix-wrapper');
			} else if ( $header.hasClass('affix-bottom') ) {
				$headerWrapper.removeClass('affix-wrapper affix-top-wrapper').addClass('affix-bottom-wrapper');
			} else {
				$headerWrapper.removeClass('affix-wrapper affix-top-wrapper affix-bottom-wrapper');
			}
			menuHideExtraElements();
			initMegaMenu();
		});

		//if header has different height on afixed and affixed-top positions - correcting wrapper height
		jQuery($header).on('affixed-top.bs.affix', function () {
            setTimeout(function() {
                $headerWrapper.css({height: $header.outerHeight()});
			}, 510);
		});

		if ($header.hasClass('animatable')) {
			jQuery($header).on('affix.bs.affix', function () {
				//fade and slide effect
				$header.animate({
					opacity: 0,
					top: -headerHeight
				}, 0);

				setTimeout(function(){
					$header.animate({
						opacity: 1,
						top: 0
					}, 300);
				}, 100);
			});

			jQuery($header).on('affix-top.bs.affix', function () {
				//fade and slide effect
				$header.animate({
					opacity: 0,
					top: -headerHeight
				}, 0);

				setTimeout(function(){
					$header.animate({
						opacity: 1,
						top: 0
					}, 300);
				}, 100);
			});
		}

        if (window.matchMedia("(min-width: 992px)").matches) {
            jQuery($header).affix({
                offset: {
                    top: headerOffset,
                    bottom: 0
                }
            });
        } else {
        	$header.addClass('affix-top');
		}


	}

	////////////////////
	//triggered search//
	////////////////////
	jQuery('.search_form_trigger').on('click', function($e) {
		$e.preventDefault();
		jQuery( '.search_form_trigger, .search_form_wrapper' ).toggleClass('active');
	});

	////////////////
	//owl carousel//
	////////////////
	if (jQuery().owlCarousel) {
		jQuery('.owl-carousel').each(function() {
			var $carousel = jQuery(this);
			var data = $carousel.data();

			var loop = data.loop ? data.loop : false;
			var margin = (data.margin || data.margin === 0) ? data.margin : 30;
			var nav = data.nav ? data.nav : false;
			var dots = data.dots ? data.dots : false;
			var dotsContainer = data.dotsContainer ? data.dotsContainer: false;
			var themeClass = data.themeclass ? data.themeclass : 'owl-theme';
			var center = data.center ? data.center : false;
			var items = data.items ? data.items : 4;
			var autoplay = data.autoplay ? data.autoplay : false;
			var animateIn = data.animteIn ? data.animteIn : false;
			var animateOut = data.animateOut ? data.animateOut : false;
			var responsiveXs = data.responsiveXs ? data.responsiveXs : 1;
			var responsiveXxs = data.responsiveXxs ? data.responsiveXxs : 1;
			var responsiveSm = data.responsiveSm ? data.responsiveSm : 2;
			var responsiveMd = data.responsiveMd ? data.responsiveMd : 3;
			var responsiveLg = data.responsiveLg ? data.responsiveLg : 4;
			var responsivexLg = data.responsiveXlg ? data.responsiveXlg : responsiveLg;
			var filters = data.filters ? data.filters : false;
			var mouseDrag = $carousel.data('mouse-drag') === false ? false : true;
			var touchDrag = $carousel.data('touch-drag') === false ? false : true;

			if (window.matchMedia("(max-width: 1199px)").matches) {
				margin = margin > 30 ? 30 : margin;
			}

			if (filters) {
				// $carousel.clone().appendTo($carousel.parent()).addClass( filters.substring(1) + '-carousel-original' );
				$carousel.after($carousel.clone().addClass('owl-carousel-filter-cloned'));
				jQuery(filters).on('click', 'a', function( e ) {
					//processing filter link
					e.preventDefault();
					var $thisA = jQuery(this);
					if ($thisA.hasClass('selected')) {
						return;
					}
					var filterValue = $thisA.attr('data-filter');
					$thisA.siblings().removeClass('selected active');
					$thisA.addClass('selected active');

					//removing old items
					$carousel.find('.owl-item').length;
					for (var i = $carousel.find('.owl-item').length - 1; i >= 0; i--) {
						$carousel.trigger('remove.owl.carousel', [1]);
					};

					//adding new items
					var $filteredItems = jQuery($carousel.next().find(' > ' +filterValue).clone());
					$filteredItems.each(function() {
						$carousel.trigger('add.owl.carousel', jQuery(this));
						jQuery(this).addClass('scaleAppear');
					});

					$carousel.trigger('refresh.owl.carousel');

					//reinit prettyPhoto in filtered OWL carousel
					if (jQuery().prettyPhoto) {
						$carousel.find("a[data-gal^='prettyPhoto']").prettyPhoto({
							hook: 'data-gal',
							theme: 'facebook', /* light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default*/
							social_tools: false
						});
					}
				});

			} //filters

			$carousel.owlCarousel({
				loop: loop,
				margin: margin,
				nav: nav,
				navText: ['<span>prev</span>', '<span>next</span>'],
				autoplay: autoplay,
				dots: dots,
				dotsContainer: dotsContainer,
				themeClass: themeClass,
				center: center,
				items: items,
				smartSpeed: 400,
				mouseDrag: mouseDrag,
				touchDrag: touchDrag,
				animateIt: animateIn,
				animateOut: animateOut,
				responsive: {
					0:{
						items: responsiveXxs
					},
					500:{
						items: responsiveXs
					},
					768:{
						items: responsiveSm
					},
					992:{
						items: responsiveMd
					},
					1200:{
						items: responsiveLg
					},
					1600:{
						items: responsivexLg
					}
				},
			})
			.addClass(themeClass);
			if(center) {
				$carousel.addClass('owl-center');
			}

			$window.on('resize', function() {
				$carousel.trigger('refresh.owl.carousel');
			});

//			$carousel.on('changed.owl.carousel', function() {
//				if (jQuery().prettyPhoto) {
//					jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({
//						hook: 'data-gal',
//						theme: 'facebook', /* light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default*/
//						social_tools: false
//					});
//				}
//			})
		});

	} //eof owl-carousel

	//aside affix
	affixSidebarInit();

	$body.scrollspy('refresh');

	//appear plugin is used to elements animation, counter, pieChart, bootstrap progressbar
	if (jQuery().appear) {
		jQuery('.no_appear_delay').each(function(index){
			initAnimateElement(jQuery(this), index);
		})

		//animation to elements on scroll
		jQuery('.to_animate').appear();

		jQuery('.to_animate').filter(':appeared').each(function(index){
			initAnimateElement(jQuery(this), index);
		});

		$body.on('appear', '.to_animate', function(e, $affected ) {
			jQuery($affected).each(function(index){
				initAnimateElement(jQuery(this), index);
			});
		});

		//counters init on scroll
		if (jQuery().countTo) {
			jQuery('.counter').appear();

			jQuery('.counter').filter(':appeared').each(function(){
				initCounter(jQuery(this));
			});
			$body.on('appear', '.counter', function(e, $affected ) {
				jQuery($affected).each(function(){
					initCounter(jQuery(this));
				});
			});
		}

		//bootstrap animated progressbar
		if (jQuery().progressbar) {
			jQuery('.progress .progress-bar').appear();

			jQuery('.progress .progress-bar').filter(':appeared').each(function(){
				initProgressbar(jQuery(this));
			});
			$body.on('appear', '.progress .progress-bar', function(e, $affected ) {
				jQuery($affected).each(function(){
					initProgressbar(jQuery(this));
				});
			});
			//animate progress bar inside bootstrap tab
			jQuery('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
				initProgressbar(jQuery(jQuery(e.target).attr('href')).find('.progress .progress-bar'));
			});
			//animate progress bar inside bootstrap dropdown
			jQuery('.dropdown').on('shown.bs.dropdown', function(e) {
				initProgressbar(jQuery(this).find('.progress .progress-bar'));
			});
		}

		//circle progress bar
		if (jQuery().easyPieChart) {

			jQuery('.chart').appear();

			jQuery('.chart').filter(':appeared').each(function(){
				initChart(jQuery(this));
			});
			$body.on('appear', '.chart', function(e, $affected ) {
				jQuery($affected).each(function(){
					initChart(jQuery(this));
				});
			});

		}

	} //appear check

	//Flickr widget
	// use http://idgettr.com/ to find your ID
	if (jQuery().jflickrfeed) {
		var $flickr = jQuery("#flickr, .flickr_ul");
		if ( $flickr.length ) {
			if ( ! ( $flickr.hasClass('flickr_loaded') ) ) {
				$flickr.jflickrfeed({
					flickrbase: "http://api.flickr.com/services/feeds/",
					limit: 6,
					qstrings: {
						id: "131791558@N04"
					},
					itemTemplate: '<a href="{{image_b}}" data-gal="prettyPhoto[pp_gal]"><li><img alt="{{title}}" src="{{image_m}}" /></li></a>'
				}, function(data) {
					$flickr.find('a').prettyPhoto({
						hook: 'data-gal',
						theme: 'facebook'
					});
				}).addClass('flickr_loaded');
			}
		}
	}

	// Instagram widget
	if(jQuery().spectragram) {
		var Spectra = {
			instaToken: '3905738328.5104743.42b91d10580042e3aeeab90c926666a4',

			init: function () {
				jQuery.fn.spectragram.accessData = {
					accessToken: this.instaToken
				};

				//available methods: getUserFeed, getRecentTagged
				jQuery('.instafeed').each(function(){
					var $this = jQuery(this);
					if ($this.find('img').length) {
						return;
					}
					$this.spectragram('getUserFeed',{
						max: 12,
						wrapEachWith: '<div class="photo" />'
					});
				});
				
			}
		}

		Spectra.init();
	}

	//video images preview - from WP
	jQuery('.embed-placeholder').each(function(){
		jQuery(this).on('click', function(e) {
			var $thisLink = jQuery(this);
			// if prettyPhoto popup with YouTube - return
			if ($thisLink.attr('data-gal')) {
				return;
			}
			e.preventDefault();
			if ($thisLink.attr('href') === '' || $thisLink.attr('href') === '#') {
				$thisLink.replaceWith($thisLink.data('iframe').replace(/&amp/g, '&').replace(/$lt;/g, '<').replace(/&gt;/g, '>').replace(/$quot;/g, '"')).trigger('click');
			} else {
				$thisLink.replaceWith('<iframe class="embed-responsive-item" src="'+ $thisLink.attr('href') + '?rel=0&autoplay=1'+ '"></iframe>');
			}
		});
	});

	// init Isotope
	jQuery('.isotope_container').each(function(index) {
		var $container = jQuery(this);
		var layoutMode = ($container.hasClass('masonry-layout')) ? 'masonry' : 'fitRows';
		var columnWidth = ($container.find('.col-lg-20').length) ? '.col-lg-20' : '';
		$container.isotope({
			percentPosition: true,
			layoutMode: layoutMode,
			masonry: {
				//for big first element in grid - giving smaller element to use as grid
				columnWidth: columnWidth
			}
		});

		var $filters = jQuery(this).attr('data-filters') ? jQuery(jQuery(this).attr('data-filters')) : $container.prev().find('.filters');
		// bind filter click
		if ($filters.length) {
			var $defaultA = $filters.find('.selected');
			var defaultFilterValue = $defaultA.attr('data-filter');
			$container.isotope({ filter: defaultFilterValue });
			$defaultA.addClass('active');
			$filters.on( 'click', 'a', function( e ) {
				e.preventDefault();
				var $thisA = jQuery(this);
				var filterValue = $thisA.attr('data-filter');
				$container.isotope({ filter: filterValue });
				$thisA.siblings().removeClass('selected active');
				$thisA.addClass('selected active');
			});
			//for works on select
			$filters.on( 'change', 'select', function( e ) {
				e.preventDefault();
				var filterValue = jQuery(this).val();
				$container.isotope({ filter: filterValue });
			});
		}
	});

	//Unyson or other messages modal
	var $messagesModal = jQuery('#messages_modal');
	if ($messagesModal.find('ul').length) {
		$messagesModal.modal('show');
	}

	//page preloader
	jQuery(".preloaderimg").fadeOut(150);
	jQuery(".preloader").fadeOut(350).delay(200, function(){
		jQuery(this).remove();
	});

	// prevent search form trigger from scrolling to top
	jQuery('.search_form_trigger').on( 'click', function($e) {
	    $e.preventDefault();
	});

	//prevent default action of # links
	jQuery("[href='#0']").on( 'click', function($e) {
		$e.preventDefault();
	});

	headerColumnsEqualize();

	relatedPostsThumbnail();

}//eof windowLoadInit

function windowReadyInit() {

	//selectize init
	if (jQuery().selectize) {
		var $select = jQuery('select');
		if($select.length > 0){
			$select.selectize({
				create: true,
				sortField: 'text'
			});
		}
	}
    var $instagramCrousel = jQuery('#footer-fullwidth .instafeed');
    function instCarouselInit() {
        $instagramCrousel.addClass('owl-carousel owl-theme');
        // setTimeout(function() {
            $instagramCrousel.owlCarousel({
				loop: false,
                margin: 0,
                nav: true,
                navText: ['<span>prev</span>', '<span>next</span>'],
                autoplay: false,
                dots: false,
                smartSpeed: 400,
                responsive: {
                    0:{
                        items: 2
                    },
                    500:{
                        items: 3
                    },
                    768:{
                        items: 3
                    },
                    992:{
                        items: 4
                    },
                    1200:{
                        items: 5
                    },
                    1600:{
                        items: 6
                    }
                }
            });
		// }, 1000)
	}
	var insObserver = new MutationObserver(instCarouselInit);
    if ($instagramCrousel[0]) {
        insObserver.observe($instagramCrousel[0], {childList: true});
    }

	//Google Map script
	var $googleMaps = jQuery('#map, .page_map');
	if ( $googleMaps.length ) {
		$googleMaps.each(function() {
			var $map = jQuery(this);

			var lat;
			var lng;
			var map;

			//map styles. You can grab different styles on https://snazzymaps.com/
			var styles = [{"featureType": "water","elementType": "geometry","stylers": [{"color": "#e9e9e9"},{"lightness": 17}]},{"featureType": "landscape","elementType": "geometry","stylers": [{"color": "#f5f5f5"},{"lightness": 20}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#ffffff"},{"lightness": 17}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#ffffff"},{"lightness": 29},{"weight": 0.2}]},{"featureType": "road.arterial","elementType": "geometry","stylers": [{"color": "#ffffff"},{"lightness": 18}]},{"featureType": "road.local","elementType": "geometry","stylers": [{"color": "#ffffff"},{"lightness": 16}]},{"featureType": "poi","elementType": "geometry","stylers": [{"color": "#f5f5f5"},{"lightness": 21}]},{"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#dedede"},{"lightness": 21}]},{"elementType": "labels.text.stroke","stylers": [{"visibility": "on"},{"color": "#ffffff"},{"lightness": 16}]},{"elementType": "labels.text.fill","stylers": [{"saturation": 36},{"color": "#333333"},{"lightness": 40}]},{"elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#f2f2f2"},{"lightness": 19}]},{"featureType": "administrative","elementType": "geometry.fill","stylers": [{"color": "#fefefe"},{"lightness": 20}]},{"featureType": "administrative","elementType": "geometry.stroke","stylers": [{"color": "#fefefe"},{"lightness": 17},{"weight": 1.2}]}];

			//map settings
			var address = $map.data('address') ? $map.data('address') : 'london, baker street, 221b';
			var markerDescription = $map.find('.map_marker_description').prop('outerHTML');

			//if you do not provide map title inside #map (.page_map) section inside H3 tag - default titile (Map Title) goes here:
			var markerTitle = $map.find('h3').first().text() ? $map.find('h3').first().text() : 'Map Title';
			var markerIconSrc = $map.find('.map_marker_icon').first().attr('src');

			var geocoder = new google.maps.Geocoder();

			//type your address after "address="
			geocoder.geocode({
	            address: address
	        }, function(data){

				lat = data[0].geometry.location.lat();
				lng = data[0].geometry.location.lng();

				var center = new google.maps.LatLng(lat, lng);
				var settings = {
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					zoom: 16,
					draggable: false,
					scrollwheel: false,
					center: center,
					styles: styles
				};
				map = new google.maps.Map($map[0], settings);

				var marker = new google.maps.Marker({
					position: center,
					title: markerTitle,
					map: map,
					icon: markerIconSrc,
				});

				var infoWindows = [];

				var infowindow = new google.maps.InfoWindow({
					content: markerDescription
				});

				infoWindows.push(infowindow);

				google.maps.event.addListener(marker, 'click', function() {
					for (var i=0;i<infoWindows.length;i++) {
						infoWindows[i].close();
					}
					infowindow.open(map,marker);
				});

				if($map.data('markers')) {

					jQuery($map.data('markers')).each(function(index) {

						var markerObj = this;

						var markerDescription = '';
						markerDescription += markerObj.markerTitle ? '<h3>' + markerObj.markerTitle + '</h3>' : '';
						markerDescription += markerObj.markerDescription ? '<p>' + markerObj.markerDescription + '</p>' : '';
						if(markerDescription) {
							markerDescription = '<div class="map_marker_description">' + markerDescription + '</div>';
						}

						geocoder.geocode({
				            address: this.markerAddress
				        }, function(data){

							var lat = data[0].geometry.location.lat();
							var lng = data[0].geometry.location.lng();

							var center = new google.maps.LatLng(lat, lng);

							var marker = new google.maps.Marker({
								position: center,
								title: markerObj.markerTitle,
								map: map,
								icon: markerObj.markerIconSrc ? markerObj.markerIconSrc : '',
							});

							var infowindow = new google.maps.InfoWindow({
								content: markerDescription
							});

							infoWindows.push(infowindow);

							google.maps.event.addListener(marker, 'click', function() {
								for (var i=0;i<infoWindows.length;i++) {
									infoWindows[i].close();
								}
								infowindow.open(map,marker);
							});

						});
					});
				}
			});
		}); //each
	}//google map length
}

$window.on('load', function(){
	windowLoadInit();
}); //end of "window load" event

jQuery(document).ready(windowReadyInit);

$window.on('resize', function(){

	$body.scrollspy('refresh');

	//header processing
	menuHideExtraElements();
	headerColumnsEqualize();
	initMegaMenu();
	var $header = jQuery('.page_header').first();
		//checking document scrolling position
		if ($header.length && !jQuery(document).scrollTop() && $header.first().data('bs.affix')) {
			$header.first().data('bs.affix').options.offset.top = $header.offset().top;
		}
    if (!$header.closest('.boxed').length) {
        setTimeout(function() {
            jQuery(".page_header_wrapper").css({height: $header.first().outerHeight()});
        }, 210);
    }

});
//end of IIFE function

})();
