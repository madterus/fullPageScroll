# Full Page Scroll

Lightweight, cross-browser jQuery full page scroll.

[![GitHub version](https://badge.fury.io/gh/madterus%2FfullPageScroll.svg)](https://badge.fury.io/gh/madterus%2FfullPageScroll)

## Installation
The plugin requires jQuery 1.8 or higher.

Via [npm](https://www.npmjs.com/package/jquery.scrollto):
```bash
npm install jquery.scrollto
```

### Downloading Manually

If you want the latest stable version, get the latest release from the [releases page](https://github.com/madterus/fullPageScroll/releases).

## 0.8.2

Version 0.8.2 has been release.
Still under development.
If you have problem then go ahead and [report the issue](https://github.com/madterus/fullPageScroll/issues/new).

## Usage
```html
<div id="fullPageScroll">
    <section class="fp-block" data-nicehash="first"> // have scrollClass
        // content
    </section>
    <section class="fp-block">
        <div class="fp-noscroll" data-nicehash="second"> // have noScrollClass
            // content with own scroll
        </div>
        // more content
    </section>
</div>
```

```js
$(element).fullpagescroll([settings]);
```

### _element_

This should be element that contains sections that you want to scroll.

### _scrollClass (.fp-block)_

Each element that should be scrolled must have this class.

### _noScrollClass (.fp-noscroll)_

Element that should have its own scroll (overflow).

### _data-nicehash_

Each element with _scrollClass_ must have data attribute that determine hash in url.


### _settings_

These are the supported settings:
 * __scrollClass__: Class of section that you want to scroll. Default is `.fp-block`
 * __noScrollClass__: Class of a element that can scroll itself (overflow). Default is `.fp-noscroll`
 * __breakpoint__: On what size of window (width) you want deactivate full page scroll. Default is `991`
 * __nav__: If you want display bullets navigation. Default is `true`
 * __resizeCheck__: If you want to have check for resize window to determine if you reach breakpoint. Default is `true`


### Changing the default settings

As with most plugins, the default settings are exposed so they can be changed.
```js
$.extend($.fullPage.defaults, {
  scrollClass: '.fp-block',
  noScrollClass: '.fp-noscroll'
});
```

## License

(The MIT License)

Copyright (c) 2019 Tomáš Surovčík

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.