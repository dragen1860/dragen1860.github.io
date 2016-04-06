

$.fn.exists = function () {
    return this.length > 0 ? this : false;
}

$(document).ready(function(){

	/*++++++++++++++++++++++++++++++++++++
		tooltips
	++++++++++++++++++++++++++++++++++++++*/
	$(".tooltips").tooltip();


	/*++++++++++++++++++++++++++++++++++++
		slidepage
	++++++++++++++++++++++++++++++++++++++*/
	var SidebarAnim = new TimelineLite({paused:true});
	SidebarAnim
		.to($(".social-icons, #main-nav"),0.2,{left:0})
		.to($("#main"),0.2,{left:250,right:"-=250"},"-=0.2");
	

	$("a.mobilemenu").on("click",function(){
		SidebarAnim.play();
	});
	$(".social-icons, #main-nav, #main").on("click",function(){
		SidebarAnim.reverse();		
	});


	/*++++++++++++++++++++++++++++++++++++++++++++++
		custom scrolls with perfectScroll plugin
	++++++++++++++++++++++++++++++++++++++++++++++++*/
	$("#main-nav").perfectScrollbar({
		wheelPropagation:true,
		wheelSpeed:80
	});


	/*++++++++++++++++++++++++++++++++++++
		click event on ul.timeline titles
	++++++++++++++++++++++++++++++++++++++*/
	$("ul.timeline").children().eq(0)
		.find(".text").slideDown()
		.addClass("open");

	$("ul.timeline").on("click","li", function(){
		$this = $(this);
		$this.find(".text").slideDown();
		$this.addClass("open");
		$this.siblings('li.open').find(".text").slideUp();
		$this.siblings('li').removeClass("open");
	}).on('mouseenter','li',function(){
		$this = $(this);
		var anim = new TweenLite($(this).find(".subject"),0.4,{'padding-left':20, paused:true});
		($this.hasClass('open')) || anim.play();
	}).on('mouseleave','li',function(){
		var anim = new TweenLite($(this).find(".subject"),0.2,{'padding-left':0});
	});



	/*++++++++++++++++++++++++++++++++++++
		lab personnel carousel
	++++++++++++++++++++++++++++++++++++++*/
	function generateLabCarousel() {

		var defaultCss = {
			width: 100,
			height: 100,
			marginTop: 50,
			marginRight: 0,
			marginLeft: 0,
			opacity: 0.2
		};
		var selectedCss = {
			width: 150,
			height: 150,
			marginTop: 30,
			marginRight: -25,
			marginLeft: -25,
			opacity: 1
		};
		var aniOpts = {
			queue: false,
			duration: 300,
			//easing: 'cubic'
		};
		var $car = $('#lab-carousel');
		$car.find('img').css('zIndex', 1).css( defaultCss );

		$car.children('div').each(function(i){
			$(this).data('index',i);
		});

		$car.carouFredSel({
			circular: true,
			infinite: true,
			width: '100%',
			height: 250,
			items: {
				visible:3,
				start:1
			},
			prev: '#prev',
			next: '#next',
			auto: false,
			swipe : {
				onTouch :true,
				onMouse :true
			},
			scroll: {
				items: 1,
				duration: 300,
				//easing: 'cubic',
				onBefore: function( data ) {
					var $comming = data.items.visible.eq(1),
						$going = data.items.old.eq(1),
						$commingdetail = $("div#lab-details div").eq($comming.data('index')),
						$goingdetail = $("div#lab-details div").eq($going.data('index'));

					
					$goingdetail.fadeOut(100,function(){
						$goingdetail.siblings().hide();
						$commingdetail.fadeIn(300);
					});
					

					$comming.find('img').css('zIndex', 2).animate( selectedCss, aniOpts );
					data.items.old.eq(1).find('img').css('zIndex', 1).animate( defaultCss, aniOpts );
				}
			}

		});
	}
	generateLabCarousel();



	/*++++++++++++++++++++++++++++++++++++
		ul-withdetails details show/hide
	++++++++++++++++++++++++++++++++++++++*/
	$("ul.ul-withdetails li").find(".row").on('click',function(){
		// $this = $(this);
		$(this).closest("li").find(".details")
	        .stop(true, true)
	        .animate({
	            height:"toggle",
	            opacity:"toggle"
	        },300);
	}).on('mouseenter',function(){
		$this = $(this);
		var anim = new TweenLite($(this).closest("li").find(".imageoverlay"),0.4,{left:0});
	}).on('mouseleave', function(){
		var anim = new TweenLite($(this).closest("li").find(".imageoverlay"),0.2,{left:"-102%"});
	});



	/*++++++++++++++++++++++++++++++++++++
		Publications page categorization
	++++++++++++++++++++++++++++++++++++++*/
	
	
	$('div#pub-grid').mixitup({
		layoutMode: 'list',
		easing : 'snap',
		transitionSpeed :600,
		onMixEnd: function(){
			$(".tooltips").tooltip();
		}
	}).on('click','div.pubmain',function(){
		var $this = $(this), 
			$item = $this.closest(".item");
		
		$item.find('div.pubdetails').slideToggle(function(){
			$this.children("i").toggleClass('icon-collapse-alt icon-expand-alt');
		},function(){
			$this.children("i").toggleClass('icon-expand-alt icon-collapse-alt');
		});
	});

	$( '#cd-dropdown' ).dropdownit( {
		gutter : 0
	} );

	$("[name=cd-dropdown]").on("change",function(){
		var item = this.value;		
		$('div#pub-grid').mixitup('filter',item);
	});

	

	/*++++++++++++++++++++++++++++++++++++
		gallery overlays and popups
	++++++++++++++++++++++++++++++++++++++*/ 

	$(".grid").on("mouseenter","li",function(){
		new TweenLite($(this).find(".over"),0.4,{bottom:0,top:0});
	}).on("mouseleave","li",function(){
		new TweenLite($(this).find(".over"),0.4,{bottom:"-100%", top:"100%"});
	});

	$('.popup-with-move-anim').magnificPopup({
		type: 'image',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 400,
		mainClass: 'my-mfp-slide-bottom'
	});

	/*++++++++++++++++++++++++++++++++++++
		stellar for contact page backgrounds
	++++++++++++++++++++++++++++++++++++++*/
	$(".stellar").stellar({
  		verticalOffset: -100,
  		horizontalScrolling: false,
	});


});


$(window).load(function(){

	/*++++++++++++++++++++++++++++++++++++
		gallery masonry layout
	++++++++++++++++++++++++++++++++++++++*/
	var $container = $('#grid');
	// initialize
	$container.masonry({
	  itemSelector: 'li'
	});
	
});
