/*!
 * jQuery.fullPage
 * Copyright (c) 2019 Tomáš Surovčík - suro.madter<a>gmail<d>com
 * Licensed under MIT
 * http://tomas.surovcik.cz/jQuery/fullPage.html
 * @projectDescription Lightweight, cross-browser jQuery full page scroll.
 * @author Tomáš Surovčík
 * @version 0.9.2
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
        navTitle: true,
        navTitleDataName: 'fptitle',
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
                    destroyScroll(parrentElement);
                })
                .mouseout(function() {
                    initEvents(parrentElement);
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
    
            initEvents(parrentElement);
        }

        // ----- BLOCKS start -----
        function initBlocks(parrentElement) {
            var blocks = $( parrentElement ).children();
            
            blocks.each(function(){
                if (!$(this).hasClass(settings.scrollClass.substring(1))) {
                    $(this).addClass(settings.scrollClass.substring(1));
                }
            });

            $(settings.scrollClass).first().addClass('fp-first');
            $(settings.scrollClass).last().addClass('fp-last');
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
                
                $.scrollTo(block, settings.scrollDuration, {
                        offset: settings.scrollOffset,
                        easing: settings.scrollEasing
                    }
                );

                if ( settings.changeUrl) {
                    window.location.hash = block.data(settings.changeDataName);
                }
            }
        };
    
        function destroyScroll(parrentElement) {
            $(parrentElement).unbind('DOMMouseScroll mousewheel touch touchmove', scrollHandle, false);
            $(document).unbind('keydown', keyHandle, false);
        };

        function initEvents(parrentElement) {
            $(document).on('keydown', keyHandle);
            $(parrentElement).on('DOMMouseScroll mousewheel touch touchmove', scrollHandle);
        }

        function keyHandle(evt) {
            var currentBlock = $(settings.currentClass);

            if (evt.which == 40) {
                evt.preventDefault();
                scrollDown(currentBlock);
            } else if (evt.which == 38) {
                evt.preventDefault();
                scrollTop(currentBlock);
            }
        }
        
        var scrolling = false;

        function scrollHandle(event) {
            
            event.preventDefault();

            var currentBlock = $(settings.currentClass);

            if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
                if (!scrolling) {
                    scrolling = true;
                    scrollDown(currentBlock);
                    window.setTimeout(() => { scrolling = false; }, 800)
                } else {
                    
                }
            } else {
                //up
                if (!scrolling) {
                    scrolling = true;
                    scrollTop(currentBlock);
                    window.setTimeout(() => { scrolling = false; }, 800)
                } else {
                    
                }
            }

            return false;

        };

        
        function scrollDown(currentBlock) {
            // if(animating){
            
            //     return false;
            // }
            // animating = true;
            if (!currentBlock.hasClass('fp-last')) {
                var newBlock = currentBlock.next(settings.scrollClass);
                scrollTo(newBlock);
                
                if (settings.nav) {
                    
                    setNavActive(newBlock.index() + 1);
                }
                setCurrentBlock(newBlock);
                // timeout = setTimeout(function()
                // {
                //     animating = false;
                

                // }, 250);
            } else {
                // animating = false;
            }
        }

        function scrollTop(currentBlock) {
            // if(animating){
            
            //     return false;
            // }
            // animating = true;
            if (!currentBlock.hasClass('fp-first')) {
                var newBlock = currentBlock.prev(settings.scrollClass);
                scrollTo(newBlock);
                
                if (settings.nav) {
                    
                    setNavActive(newBlock.index() + 1);
                }
                setCurrentBlock(newBlock);
                // timeout = setTimeout(function()
                // {
                //     animating = false;
                

                // }, 250);
            } else {
                // animating = false;
            }
        }
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
                if (settings.navTitle) {
                    var dataTitle = $(this).data(settings.navTitleDataName);
                }
                navHtml += '<li class="fp-nav-item" data-target="' + count + '">';
                if (dataTitle && settings.navTitle) {
                    navHtml += '<div class="fp-nav-title">' + dataTitle + '</div>';
                }
                navHtml += '<div class="fp-nav-circle"></div></li>';
                count++;
            });
            
            parrentElement.append(navHtml);
        }
        // ----- NAVIGATION end -----

        
	};

	// AMD requirement
	return $fullPage;
});