jQuery(function ($) {

	$(document).ready(function() {
		
		"use strict";
		ScrollEffects();		
		FitThumbScreenWEBGL();
		Portfolio();	
		Core();
	});
	
		
	function Portfolio() {
			
		if( $('.portfolio-wrap').length > 0 ){
			
			var $container = $('.portfolio');
		
			$container.isotope({
			  layoutMode: 'packery',
			  itemSelector: '.item',
			  gutter:0,
			  transitionDuration: "0.5s"
			});
			
			
			$('#filters a').on('click', function() {
				$('#filters a').removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				$container.isotope({ filter: selector }, function( $changedItems, instance ) {
				  instance.$allAtoms.filter('.isotope-hidden').removeClass('is-filtered');
				  instance.$filteredAtoms.addClass('is-filtered');
				});		
				return false;
			});
			
			
			$('.portfolio-wrap').waitForImages({
				finished: function() {
					$("#all").trigger('click');
				},
				waitForAll: true
			});
			
			
			if ($('.portfolio-wrap').hasClass('parallax-two-grid')) {						
				if ($(window).width() > 767) {		
					$('.portfolio-wrap').waitForImages({
						finished: function() {
							gsap.utils.toArray('.vertical-parallax').forEach((parallaxElement, index) => {
								const parallaxElementChild = parallaxElement.querySelector(".item-parallax");
								const offsetParallax = parallaxElementChild.offsetHeight;					
								gsap.fromTo( parallaxElementChild, { y: offsetParallax * 0.3 },	{ y: -offsetParallax, 
									ease: "none",
										scrollTrigger: {
											trigger: parallaxElement,
											scrub: 1,
										}
									}
								);
							});
						},
						waitForAll: true
					});
				}
			
			}
			
			
			if ($('.portfolio-wrap').hasClass('parallax-grid')) {						
				if ($(window).width() > 767) {		
					$('.portfolio-wrap').waitForImages({
						finished: function() {
							gsap.utils.toArray('.item').forEach((parallaxElement, index) => {
								const parallaxElementChild = parallaxElement.querySelector(".item-parallax");
								const startMovement = (parallaxElement.offsetHeight * parallaxElement.dataset.startparallax);
								const endMovement = (parallaxElement.offsetHeight * parallaxElement.dataset.endparallax);						
								gsap.fromTo( parallaxElementChild, { y: startMovement },	{ y: endMovement, 
									ease: "none",
										scrollTrigger: {
											trigger: parallaxElement,
											scrub: true,
										}
									}
								);
							});
						},
						waitForAll: true
					});
				}			
			}
			
			
			if ($('.portfolio-wrap').hasClass('ladder-grid')) {
				if ($(window).width() > 767) {	
					let delSections = document.querySelectorAll(".item");
					
					delSections.forEach(itemThumb => {				
						
						let imageAnim = gsap.to(itemThumb.querySelector(".item-parallax"), {
							y: "-100vh",
							ease: "none",
							paused: true
						});	
										
						let progressTo = gsap.quickTo(imageAnim, "progress", {ease: "power3", duration: parseFloat(itemThumb.dataset.scrub) || 0.2 });					
						
						gsap.to(itemThumb, {
							y: "100vh",
							ease: "none",
							scrollTrigger: { 
								scrub: true,
								trigger: itemThumb,
								start: "top bottom",
								end: "bottom top",
								onUpdate: self => progressTo(self.progress)
							}
						});	
									
					});
				}				
			}
			
			
			if ($('.portfolio-wrap').hasClass('scaleout-grid')) {						
				if ($(window).width() > 767) {		
					$('.portfolio-wrap').waitForImages({
						finished: function() {
							gsap.utils.toArray('.item').forEach((parallaxElement, index) => {
								const parallaxElementChild = parallaxElement.querySelector(".item-parallax");
								const startMovement = (parallaxElement.offsetHeight * parallaxElement.dataset.startparallax);
								const endMovement = (parallaxElement.offsetHeight * 0.25);						
								gsap.fromTo( parallaxElementChild, { y: 0 },	{ y: endMovement, scale:0.5, opacity:1,
									ease: "none",
										scrollTrigger: {
											trigger: parallaxElement,
											scrub: true,
											start: "top top",
										}
									}
								);
							});
						},
						waitForAll: true
					});
				}			
			}

			
			
			
			//Show Filters On overlay
			$('#show-filters, #close-filters').on('click', function() {			
				$('#filters-overlay').toggleClass('active');
				var navtitleheight = $(".hero-title").height()
				var navsubtitleheight = $(".hero-subtitle").height()
				
				setTimeout( function(){			
					if ($('#filters-overlay').hasClass("active")) {
						
						gsap.to($(".item-parallax"), {duration: 0.6, force3D:true, scale:0.9, opacity:0.3, delay:0.1, ease:Power2.easeInOut});					
						gsap.to($(".active .item-caption"), {duration: 0.3, opacity:0, ease:Power2.easeOut});
						gsap.to($("#show-filters, #counter-wrap"), {duration: 0.3, opacity:0, delay:0, ease:Power2.easeOut});
						gsap.to($("#show-filters, #counter-wrap"), {duration: 0, visibility:'hidden', delay:0.35, ease:Power2.easeOut}); 
						
						//Fade In Navigation Lists
						gsap.set($(".filters-info"), {y:30, opacity:0});
						gsap.to($(".filters-info"), {duration: 0.4, force3D:true, y:0, opacity:1, delay:0.5, ease:Power2.easeOut});
						var tlMenu = gsap.timeline();
						tlMenu.set($(".filters-timeline a"), {y:60, opacity:0});
						$(".filters-timeline a").each(function(index, element) {
							tlMenu.to(element, {duration: 0.5, y:0, opacity:1, delay:0.3, ease:Power3.easeOut}, index * 0.1)
						});
							
					} else {
						
						gsap.to($(".item-parallax"), {duration: 0.6, force3D:true, scale: 1, opacity:1, delay:0.3, ease:Power2.easeInOut});					
						gsap.to($(".active .item-caption"), {duration: 0.5, opacity:1, delay:0.5, ease:Power2.easeOut});
						gsap.set($("#show-filters, #counter-wrap"), {visibility:'visible', opacity:0});
						gsap.to($("#show-filters, #counter-wrap"), {duration: 0.3, opacity:1, delay:0.7, ease:Power2.easeOut});
						
						//Fade Out Navigation Lists
						gsap.to($(".filters-info"), {duration: 0.2, force3D:true, y:-30, opacity:0, delay:0, ease:Power1.easeIn});					
						var tlMenu = gsap.timeline();
						$(".filters-timeline a, .jssocials-share").each(function(index, element) {
							tlMenu.to(element, {duration: 0.25, opacity:0, y:-60, delay:0.1, ease:Power1.easeIn }, index * 0.1)
						});	
						gsap.to('#ball', {duration: 0.1, borderWidth: '4px', scale:0.5,});
						$("#ball").removeClass("close-icon");
						$('#ball i').remove();
						
					}							
				} , 20 );
			});
			
			
			gsap.to(".portfolio", {			  
				scrollTrigger: {
					trigger: ".portfolio",
					start: "top 40%",
					end: "bottom 90%",
					scrub: true,
					onEnter: function(st) { 
						gsap.to($("#show-filters"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
						$("#show-filters").addClass('enabled')					
					},
					onEnterBack: function(st) {
						gsap.to($("#show-filters"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
						$("#show-filters").addClass('enabled')
					},					
					onLeave: function(st) { 
						gsap.to($("#show-filters"), {duration: 0.15, opacity:0, delay:0, ease:Power2.easeOut});
						$("#show-filters").removeClass('enabled')				
					},
					onLeaveBack: function(st) { 
						gsap.to($("#show-filters"), {duration: 0.15, opacity:0, delay:0, ease:Power2.easeOut});
						$("#show-filters").removeClass('enabled')				
					},
					invalidateOnRefresh: true
				}
			});
			
			
			if (!isMobile()) {
				
				$(".item-parallax").mouseenter(function(e) {
					var $this = $(this);					
					gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$this.parent().data('color'), backgroundColor:$this.parent().data('color')});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).addClass("with-icon").append( '<i class="arrow-icon"></i>' );
					$this.closest('.item').find('video').each(function() {
						$(this).get(0).play();
					});
				});
								
				$(".item-parallax").mouseleave(function(e) {
					var $this = $(this);					
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball i').remove();	
					$this.closest('.item').find('video').each(function() {
						$(this).get(0).pause();
					});
				});
				
				$("#close-filters").mouseenter(function(e) {	
					$( "#ball" ).addClass("close-icon").append( '<i class="fa-solid fa-xmark"></i>' );
					if ($('#page-content').hasClass("light-content")) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff',});
						gsap.to('#ball i', {duration: 0.2, css:{color:"#fff"}});
					} else {
						gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000',});
						gsap.to('#ball i', {duration: 0.2, css:{color:"#000"}});
					}
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				});
					
				$("#close-filters").mouseleave(function(e) {
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					gsap.to('#ball-loader', {duration: 0.2,borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("close-icon");
					$('#ball i').remove();
				});
			}
			
		}
	
	}//End Portfolio



	window.LoadViaAjax = function() {		
					
		Portfolio();			
		
	}//End Load Via Ajax
	
});	


var LoadViaAjax = window.LoadViaAjax;	
	
	
