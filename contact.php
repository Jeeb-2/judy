<?php include "header.php"; ?>
			<section class="page_breadcrumbs ls background_cover section_padding_50">
				<div class="container">
					<div class="row">
						<div class="col-xs-12 text-center">
							<h1 class="sr-only">Contact 3</h1>
							<ol class="breadcrumb darklinks">
								<li> <a href="index.php">
							Home
						</a> </li>
								<li class="active"> <span>Contact</span> </li>
							</ol>
						</div>
					</div>
				</div>
			</section>
			<section class="ls section_padding_top_150 section_padding_bottom_150">
				<div class="container">
					<div class="row">
						<div class="col-sm-4 to_animate" data-animation="pullDown">
							<div class="teaser text-center">
								<div class="teaser_icon highlight size_small"> <i class="rt-icon2-phone5"></i> </div>
								<p> <span class="grey">Phone:</span> +12 345 678 9123</p>
							</div>
						</div>
						<div class="col-sm-4 to_animate" data-animation="pullDown">
							<div class="teaser text-center">
								<div class="teaser_icon highlight size_small"> <i class="rt-icon2-location2"></i> </div>
								<p>4321 Street,<br> Madison, Wisconsin </p>
							</div>
						</div>
						<div class="col-sm-4 to_animate" data-animation="pullDown">
							<div class="teaser text-center">
								<div class="teaser_icon highlight size_small"> <i class="rt-icon2-world"></i> </div>
								<p><a href="#" class="__cf_email__" data-cfemail="bfd9d6d1c8d6c5ffcccacfcfd0cdcb91dcd0d2">contact@jamaestro.com</a></p>
								<p> <a href="#" class="social-icon color-icon socicon-twitter"></a> <a href="#" class="social-icon color-icon socicon-facebook"></a> <a href="#" class="social-icon color-icon socicon-google"></a> <a href="#" class="social-icon color-icon socicon-pinterest"></a>									</p>
							</div>
						</div>
					</div>
					<div class="row topmargin_60">
						<div class="col-sm-12 to_animate">
							<form class="contact-form cs parallax overlay_color" method="post" action="#">
								<div class="row">
									<div class="col-sm-6">
										<p class="form-group"> <label for="name">Full Name <span class="required">*</span></label> <i class="fa fa-user black" aria-hidden="true"></i> <input type="text" aria-required="true" size="30" value="" name="name" id="name" class="form-control" placeholder="Full Name">											</p>
										<p class="form-group"> <label for="email">Email address<span class="required">*</span></label> <i class="fa fa-envelope black" aria-hidden="true"></i> <input type="email" aria-required="true" size="30" value="" name="email" id="email" class="form-control" placeholder="Email Address">											</p>
										<p class="form-group"> <label for="subject">Subject<span class="required">*</span></label> <i class="fa fa-flag black" aria-hidden="true"></i> <input type="text" aria-required="true" size="30" value="" name="subject" id="subject" class="form-control" placeholder="Subject">											</p>
									</div>
									<div class="col-sm-6">
										<p class="contact-form-message form-group"> <label for="message">Message</label> <i class="fa fa-comment black" aria-hidden="true"></i> <textarea aria-required="true" rows="7" cols="45" name="message" id="message" class="form-control" placeholder="Message"></textarea> </p>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12">
										<p class="contact-form-submit text-center topmargin_30"> <button type="submit" id="contact_form_submit" name="contact_submit" class="theme_button gradient2">Send Message</button> </p>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
			<section class="ls section_padding_top_150 section_padding_bottom_150">
				<div class="container">
					<div class="row">
						<div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3 text-center">
							<h2 class="section_header small">Our Newsletter</h2>
							<p class="small-text grey">subscribe</p>
							<div class="widget widget_mailchimp">
								<form class="signup" action="#" method="get">
									<div class="form-group"> <input class="mailchimp_email form-control" name="email" type="email" placeholder="Email Address"> <button type="submit" class="theme_button">Sign Up!</button> </div>
									<div class="response"></div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
 <?php include "footer.php"; ?>