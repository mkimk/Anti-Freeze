/*  =========================================================================
    Detact browser and switch the variable font - WIP
    ==========================================================================   */

    // // var browser_name = '';
    //     isIE = /*@cc_on!@*/false || !!document.documentMode;
    //     isEdge = !isIE && !!window.StyleMedia;
    //     if(navigator.userAgent.indexOf("Chrome") != -1 && !isEdge)
    //     {
    //         $('body').css('font-family', '"KairosSans_variable", sans-serif');

    //     }
    //     else if(navigator.userAgent.indexOf("Safari") != -1 && !isEdge)
    //     {
    //         $('body').css('font-family', '"KairosSans_Light", sans-serif');
    //     }
    //     else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
    //     {
    //         $('body').css('font-family', '"KairosSans_Light", sans-serif');

    //     }
    //     else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
    //     {
    //         $('body').css('font-family', '"KairosSans_Light", sans-serif');
    //     }
    //     else if(isEdge)
    //     {
    //         $('body').css('font-family', '"KairosSans_Light", sans-serif');
    //     }
    //     else 
    //     {
    //         $('body').css('font-family', '"KairosSans_variable", sans-serif');

    //     }
        // $('html').addClass(browser_name);


    var browser = function() {
        // Return cached result if avalible, else get result then cache it.
        if (browser.prototype._cachedResult)
            return browser.prototype._cachedResult;
    
        // Opera 8.0+
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    
        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';
    
        // Safari 3.0+ "[object HTMLElementConstructor]" 
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    
        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
    
        // Edge 20+
        var isEdge = !isIE && !!window.StyleMedia;
    
        // Chrome 1+
        var isChrome = !!window.chrome && !!window.chrome.webstore;
    
        // Blink engine detection
        var isBlink = (isChrome || isOpera) && !!window.CSS;
    
        if(isFirefox){
            $('body').css('font-family', '"KairosSans_Light", sans-serif');
        }
        return browser.prototype._cachedResult =
            isOpera ? 'Opera' :
            isFirefox ? $('body').css('font-family', '"KairosSans_Light", sans-serif') :
            isSafari ? 'Safari' :
            isChrome ? 'Chrome' :
            isIE ? 'IE' :
            isEdge ? 'Edge' :
            isBlink ? 'Blink' :
            "Don't know";
    };
  
//    browser();
   console.log(browser());


/*  =========================================================================
    Cover: Unblur Mask - WIP
    ==========================================================================   */
   
    $window = $(window);
    var coverTop = $('.navbar').offset().top;
    var bodyTop = $('#anti-freeze').offset().top;
    var bodyBottom = $("#anti-freeze").offset().top + $("#anti-freeze").outerHeight() + 1000;
    var pageTop = $window.scrollTop();
    var pageBottom = pageTop + $window.height() - 20;
    var bodyBottom = bodyTop + $window.height();

    // var bottom_of_element = elementTop + $(".detail").outerHeight();

    $window.scroll(function() {

        if ( pageBottom >= coverTop )  {
            $('#title').css('filter','blur(15px)');
            $("#title").css("-webkit-filter", "blur(15px)");
            $("#title").css("-o-filter: blur(15px)");
            $("#title").css("-moz-filter: blur(15px)");
            $("#title").css("-ms-filter: blur(15px);");
            $('.detail').fadeOut();
        } 
        else {
            $('#title').css('filter','blur(0px)');
            $("#title").css("-webkit-filter", "blur(0px)");
            $("#title").css("-o-filter: blur(0px)");
            $("#title").css("-moz-filter: blur(0px)");
            $("#title").css("-ms-filter: blur(0px);");
            $('.detail').fadeIn();
        }
        // if ( distance > $window.innerHeight) {
        //     $('#clip-circle').fadeIn();
        // }
    });

 


/*  =========================================================================
    Cover: Scroll transition
    ==========================================================================   */
    
   
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
                    
                    $('#title').css('filter','blur(15px)');
                    $("#title").css("-webkit-filter", "blur(15px)");
                    $("#title").css("-o-filter: blur(15px)");
                    $("#title").css("-moz-filter: blur(15px)");
                    $("#title").css("-ms-filter: blur(15px);");
                    $('.detail').fadeOut();
    
                });
                        
                // Collapse Navbar for mobile view
                // $('#title').css('filter','blur(0px)');
                // $("#title").css("-webkit-filter", "blur(0px)");
                // $("#title").css("-o-filter: blur(0px)");
                // $("#title").css("-moz-filter: blur(0px)");
                // $("#title").css("-ms-filter: blur(0px);");
                // $('.detail').fadeIn();
        }
    });


/*  =========================================================================
    Scroll speed setting for the two columns 
    ==========================================================================   */
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

/*  =========================================================================
    Variable column width based on mousemove - WIP
    ==========================================================================   */

     
  

        function variableWidth(){
                $(document).on("click mousemove","#anti-freeze",function(e){ 
                    var x = e.clientX;
                    var middlex = window.innerWidth / 2;
                    $("#info").css("width", window.innerWidth - x + "px");
                    $("#artist").css("width", x  - 100 + "px" );

                    if (x < middlex || x === middlex) {   
                        $("#info").addClass("zoom-in").removeClass("zoom-out");
                        $("#artist").addClass("zoom-out").removeClass("zoom-in");
                        $("#top").addClass("zoom-in").removeClass("zoom-out");
                        $(".landscape").addClass("img-width-md").removeClass("img-width-xlg");
                        $(".landscape-wide").addClass("img-width-lg").removeClass("img-width-xxlg"); 
                        $(".portrait").addClass("img-height-md").removeClass("img-height-xlg"); 
                        $(".square").addClass("img-height-sm").removeClass("img-height-md");         
                    } if (x > middlex ) {
                        $("#info").addClass("zoom-out").removeClass("zoom-in");
                        $("#artist").addClass("zoom-in").removeClass("zoom-out");
                        $(".landscape").addClass("img-width-xlg").removeClass("img-width-md");
                        $(".landscape-wide").addClass("img-width-xxlg").removeClass("img-width-lg"); 
                        $(".portrait").addClass("img-height-xlg").removeClass("img-height-md"); 
                        $(".square").addClass("img-height-md").removeClass("img-height-sm"); ; 
                    }   else {
                        $("#info").addClass("zoom-in").removeClass("zoom-out");
                        $("#artist").addClass("zoom-out").removeClass("zoom-in");
                        $(".landscape").addClass("img-width-md").removeClass("img-width-xlg");
                        $(".landscape-wide").addClass("img-width-lg").removeClass("img-width-xxlg"); 
                        $(".portrait").addClass("img-height-md").removeClass("img-height-xlg"); 
                        $(".square").addClass("img-height-sm").removeClass("img-height-md");       
                    } 
                });
        
            }
            variableWidth();
        }); 

     
      
            
         $(window).resize(function(e) {
                if (1024 < $(window).width) {
                    $("#artist").show(); 
                    $("#info").show();
                    $("#artist-mobile").hide();
                    $("#info-mobile").hide();
                    console.log("saysomething");
   
                } if (1024 >= $(window).width) {
                    $("#artist").hide(); 
                    $("#info").hide();
                    $("#artist-mobile").show();
                    $("#info-mobile").show();

                }
        });    

                  
            // var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;

            // if(!isMobile) {
            //     variableWidth().stop();
            //         e.preventDefault();
                    
            //     }

            // $(window).resize(function(e) {
            //     if (1024 < $(window).width) {
            //         variableWidth();
            //     } if (1024 >= $(window).width) {
            //         variableWidth.stop();
            //     }
            // });    
           

    

/*  =========================================================================
    Extra toogles
    ==========================================================================   */





