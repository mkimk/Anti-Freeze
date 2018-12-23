/*! Lazy Load 1.9.7  */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);

//---------------------------------------- scroll speed setting for the two columns
$(document).ready(function() {
        // Sync up two sections
        syncScroll($('#info .scroll'), $('#artist .scroll'));

        function syncScroll(el1, el2) {
            var $el1 = $(el1);
            var $el2 = $(el2);

            // Lets us know when a scroll is organic
            // or forced from the synced element.
            var forcedScroll = false;

            // Catch our elements' scroll events and
            // syncronize the related element.
            $el1.scroll(function() { performScroll($el1, $el2); });
            $el2.scroll(function() { performScroll($el2, $el1); });

            // Perform the scroll of the synced element
            // based on the scrolled element.
            function performScroll($scrolled, $toScroll) {
                if (forcedScroll) return (forcedScroll = false);
                var percent = ($scrolled.scrollTop() / 
                            ($scrolled[0].scrollHeight - $scrolled.outerHeight())) * 100;
                setScrollTopFromPercent($toScroll, percent);
            }

            // Scroll to a position in the given
            // element based on a percent.
            function setScrollTopFromPercent($el, percent) {
                var scrollTopPos = (percent / 100) *
                    ($el[0].scrollHeight - $el.outerHeight());
                forcedScroll = true;
                $el.scrollTop(scrollTopPos);
            }
        };


//---------------------------------------- 2 columns width change

$(document).on("click mousemove","#container",function(e){ 
    var x = e.clientX;
    // var y = e.clientY;
    $("#info").css("width", window.innerWidth - x + "px");
    var widthInfo = $('#info').width();
    var middlex = window.innerWidth / 2;
    var middley = window.innerHeight / 2;


    $("#artist").css("width", x  - 100 + "px" );
    $(".dot").css ("position", "fixed");

    // $(".dot").css ("left", middlex);
    // $(".dot").css ("top", middley);

    // if (!widthInfo < 960 || widthInfo > 790) {
    //     $("#info").css("font-size", widthInfo - 750 + "px");
    //  } 
     if (x < middlex || x === middlex) {   
            $("#info").addClass("zoom-in").removeClass("zoom-out");
            $("#artist").addClass("zoom-out").removeClass("zoom-in");
            $("#top").addClass("zoom-in").removeClass("zoom-out");
            $(".landscape").css("max-width","250px");
            $(".landscape-wide").css("max-width","300px");
            $(".portrait").css("max-height","250px");
            $(".square").css("max-height","185px");




         } if (x > middlex ) {
            $("#info").addClass("zoom-out").removeClass("zoom-in");
            $("#artist").addClass("zoom-in").removeClass("zoom-out");
            $("#top").addClass("zoom-out").removeClass("zoom-in");
            $(".landscape").css("max-width","500px");
            $(".landscape-wide").css("max-width","600px");
            $(".portrait").css("max-height","500px");
            $(".square").css("max-height","400px");


         } 
         else {
        $("#info").addClass("zoom-in").removeClass("zoom-out");
        $("#artist").addClass("zoom-out").removeClass("zoom-in");
        $("#top").addClass("zoom-in").removeClass("zoom-out");
        $(".landscape").css("max-width","250px");
        $(".landscape-wide").css("max-width","300px");
        $(".portrait").css("max-height","250px");
        $(".square").css("max-height","185px");


    }



});

if($('.thumb').is(":hover")) {
    WidthVariation.stop();
};

setInterval(function(){
    var artwork = $("#artwork");
    if(artwork.is(":hover")) {
        $("#info").css("width", window.innerWidth - x + "px");

       
    }
    else {
    }
}, 200);




 



//---------------------------------------- toggle
  $('.artwork').on('click',function(){
    // if($(this).attr('data-click-state') == 1) {
    //     $(this).attr('data-click-state', 0)
    //     $(this).css('background-color', 'transparent')
    //     } else {
    //     $(this).attr('data-click-state', 1)
    //     $(this).css('background-color', 'orange')
    //     }
        // $('#info').css('margin-left','-82vw');
        $('.goback').show();
        // $('#artwork').show();
        // $(body).css('margin-left','-80px');

  });

  $('.goback').on('click', function() {
    // $('#info').css('margin-left','2rem');
    $(this).hide();
  });

});

//---------------------------------------- cover scroll
$('nav.navbar a, .scrollTop').click(function(event){
    // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash (#)
            var hash = this.hash;
            
            // Ensure no section has relevant class
            $('section').removeClass("focus");

            // Add class to target
            $(hash).addClass("focus");

            // Remove thy class after timeout
            setTimeout(function(){
                $(hash).removeClass("focus");
            }, 2000);			
            
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area (the speed of the animation)
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 10
            }, 600, function(){
                
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
            // $(".navbar-collapse").collapse('hide');	
            $('.header').addClass('active');	
            // $("#top").show();

            });
                    
            // Collapse Navbar for mobile view
            // $(".navbar-collapse").collapse('hide');	
            $('.header').addClass('active');	
            // $("#top").show();
	
        }

    });

//----------------------------------------lightbox
