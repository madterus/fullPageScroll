/*!
 * jQuery.fullPage
 * Copyright (c) 2019 Tomáš Surovčík - suro.madter<a>gmail<d>com
 * Licensed under MIT
 * http://tomas.surovcik.cz/jQuery/fullPage.html
 * @projectDescription Lightweight, cross-browser jQuery full page scroll.
 * @author Tomáš Surovčík
 * @version 0.5.0
 */
;(function(factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof module !== 'undefined' && module.exports) {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Global
		factory(jQuery);
	}
})(function($) {
	'use strict';

	var $fullPage = $.fullPage = function(settings) {
		return $(window).fullPage(settings);
	};

	$fullPage.defaults = {
        scrollClass: '.fp-block',
        noScrollClass: '.fp-noscroll',
        scrollOffset: 0,
        breakpoint: '991',
        nav: true,
        navBullets: {
            position: 'right',
            color: 'white',
            activeColor: '',
            border: '',
            image: false
        },
        scroll: {
            animation: '',
            duration: ''
        },
        resizeCheck: true,
        changeUrl: {
            change: true,
            dataName: 'fphash',
            scrollOnLoad: true
        }
        
	};	

	$.fn.fullPage = function(settings) {
        settings = $.extend({}, $fullPage.defaults, settings);
        
        if (settings.nav) {
            createNav(this);
        }

        if ($(window).width() > settings.breakpoint) {

            $( settings.noScrollClass )
                .mouseover(function() {
                    destroyScroll();
                })
                .mouseout(function() {
                    handleScroll();
                });
    
            var timeout;
    
            if (window.location.hash == '') {
                setFirstBlock();
            } else {
                var currentBlock = $(settings.scrollClass + "[data-nicehash='" + window.location.hash.substring(1) +"']");
                if (currentBlock.length > 0) {
                    setNavActive(window.location.hash.substring(1));
                    scrollTo(currentBlock);
                } else {
                    setFirstBlock();
                }
            }
    
            handleScroll();
        }

        function setFirstBlock() {
            window.location.hash = $(settings.scrollClass).first().data('nicehash');
            setNavActive();
        }

        function scrollTo(block) {
            if (block.length > 0) {
                $.scrollTo(block, 500);
                window.location.hash = block.data('nicehash');
            }
        };
    
        $('.fp-nav-item').on('click', function(){
            var href = $(this).data('href');
            var block = $(settings.scrollClass + "[data-nicehash='" + href + "']");
            scrollTo(block);
            $('.fp-nav-item').removeClass('active');
            $(this).addClass('active');
        });
    
        window.onresize = function() {
            if (window.innerHeight <= 991) {
                destroyScroll();
            } else {
                handleScroll();
            }
        }
    
        function setNavActive(hash = false) {
            $('.fp-nav-item').removeClass('active');
            if (!hash) {
                $('.fp-nav-item').first().addClass('active');
            } else {
                $(".fp-nav-item[data-href='" + hash + "']").addClass('active');
            }
        }
    
        function destroyScroll() {
            $(document).unbind('DOMMouseScroll mousewheel');
        };
    
        function handleScroll() {
            $(document).on('DOMMouseScroll mousewheel', function(event)
            {
                var hash = window.location.hash;
                var currentBlock = $(settings.scrollClass + "[data-nicehash='" + hash.substring(1) +"']");
    
                timeout = setTimeout(function()
                {
                    if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
                        var newBlock = currentBlock.next(settings.scrollClass);
                        scrollTo(newBlock);
                        setNavActive(newBlock.data('nicehash'));
                    } else {
                        //up
                        var newBlock = currentBlock.prev(settings.scrollClass);
                        scrollTo(newBlock);
                        setNavActive(newBlock.data('nicehash'));
                    }
    
                    return false;
                }, 25);
            });
        };

        function createNav(element) {
            var items = $(settings.scrollClass);
            var navHtml = '<div class="fp-nav"><ul>';
            
            items.each(function(){
                navHtml += '<li class="fp-nav-item" data-href="' + $(this).data('nicehash') + '"></li>';
            });
            
            element.append(navHtml);
        }
	};

	// AMD requirement
	return $fullPage;
});
