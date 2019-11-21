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
        currentClass: '.fp-current',
        breakpoint: '991',
        nav: true,
        scrollOffset: 0,
        scrollEasing: 'swing',
        scrollDuration: 500,
        resizeCheck: true,
        changeUrl: true,
        changeDataName: 'fphash',
        scrollOnLoad: true
	};	

	$.fn.fullPage = function(settings) {
        settings = $.extend({}, $fullPage.defaults, settings);

        var parrentElement = this;
        
        initBlocks(parrentElement);

        if (settings.nav) {
            createNav(parrentElement);
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
    
            if ( settings.changeUrl) {
                if (window.location.hash == '') {
                    setFirstBlock();
                } else {
                    var currentBlock = $(settings.scrollClass + "[data-" + settings.changeDataName + "='" + window.location.hash.substring(1) +"']");
                    if (currentBlock.length > 0) {
                        setNavActive(window.location.hash.substring(1));
                        scrollTo(currentBlock);
                    } else {
                        setFirstBlock();
                    }
                }
            } else {
                setFirstBlock();
            }
    
            handleScroll();
        }

        // ----- BLOCKS start -----
        function initBlocks(parrentElement) {
            var blocks = $( parrentElement ).children();
            
            blocks.each(function(){
                if (!$(this).hasClass(settings.scrollClass.substring(1))) {
                    $(this).addClass(settings.scrollClass.substring(1));
                }
            });
        }

        function setFirstBlock() {
            if ( settings.changeUrl) {
                window.location.hash = $(settings.scrollClass).first().data(settings.changeDataName);
            }

            $(settings.scrollClass).first().addClass(settings.currentClass.substring(1));

            if (settings.scrollOnLoad) {
                scrollTo($(settings.scrollClass).first());
            }

            if (settings.nav) {
                setNavActive();
            }
        }

        function setCurrentBlock(block) {
            $(settings.currentClass).removeClass(settings.currentClass.substring(1));
            block.addClass(settings.currentClass.substring(1));
        }
        // ----- BLOCKS end -----

        // ----- SCROLL start -----
        function scrollTo(block) {
            if (block.length > 0) {
                setCurrentBlock(block);
                $.scrollTo(block, settings.scrollDuration, {
                    offset: settings.scrollOffset,
                    easing: settings.scrollEasing
                });

                if ( settings.changeUrl) {
                    window.location.hash = block.data(settings.changeDataName);
                }
            }
        };
    
        function destroyScroll() {
            $(document).unbind('DOMMouseScroll mousewheel');
        };
    
        function handleScroll() {
            $(document).on('DOMMouseScroll mousewheel', function(event)
            {
                var currentBlock = $(settings.currentClass);
    
                timeout = setTimeout(function()
                {
                    if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
                        var newBlock = currentBlock.next(settings.scrollClass);
                        scrollTo(newBlock);

                        if (settings.nav) {
                            setNavActive(newBlock.index() + 1);
                        }
                    } else {
                        //up
                        var newBlock = currentBlock.prev(settings.scrollClass);
                        scrollTo(newBlock);

                        if (settings.nav) {
                            setNavActive(newBlock.index() + 1);
                        }
                    }
    
                    return false;
                }, 25);
            });
        };
        // ----- SCROLL end -----

        // ----- RESIZE start ----
        if (settings.resizeCheck) {
            window.onresize = function() {
                if (window.innerHeight <= settings.breakpoint) {
                    destroyScroll();
                } else {
                    handleScroll();
                }
            }
        }
        // ----- RESIZE end ----

        // ----- NAVIGATION start -----
        if (settings.nav) {
            $('.fp-nav-item').on('click', function(){
                var target = $(this).data('target');
                var test = $("#" + parrentElement.attr('id') + " " + settings.scrollClass + ":nth-child(" + target + ")");

                scrollTo(test);

                $('.fp-nav-item').removeClass('active');
                $(this).addClass('active');
            });
        }

        function setNavActive(number = false) {
            $('.fp-nav-item').removeClass('active');
            if (!number) {
                $('.fp-nav-item').first().addClass('active');
            } else {
                $(".fp-nav-item[data-target='" + number + "']").addClass('active');
            }
        }

        function createNav(parrentElement) {
            var items = $(settings.scrollClass);
            var navHtml = '<div class="fp-nav"><ul>';
            var count = 1;
            
            items.each(function(){
                navHtml += '<li class="fp-nav-item" data-target="' + count + '"></li>';
                count++;
            });
            
            parrentElement.append(navHtml);
        }
        // ----- NAVIGATION end -----
	};

	// AMD requirement
	return $fullPage;
});