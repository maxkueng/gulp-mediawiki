gulp-mediawiki
==============

A [gulp](http://gulpjs.com/) plugin to upload files as pages to a MediaWiki instance.

## Install

```bash
npm install gulp-mediawiki --save
```

## Usage

### Options

 - `server`: FQDN of the MediaWiki instance
 - `port` *(optional)*: Port, defaults to 80
 - `path`: Path to the directory where index.php or api.php reside
 - `username` *(optional)*: Username to log in to MediaWiki
 - `password` *(optional)*: Password to log in to MediaWiki
 - `namespace` *(optional)*: Name of the namespace to save the pages
 - `namespace_delimiter` *(optional, default: "__")*: Will be replaced with ":" so that "Help__Magic" will be saved as "Help:Magic". This is for when your OS doesn't support colons in file names
 - `space_delimiter` *(optional, default: "_")*: Will be replaced with " " so that "Magic_Friends" will be saved as "Magic Friends". This is for when you don't want to use spaces in file names
 - `extension` *(optional)*: The file extension of your wikitext files. This will be stripped away when saving the page
 - `edit_message` *(optional)*: An edit message wor the wiki edits
 - `name` *(optional, default: "mediawiki")*: Log messages will be prefixed with this

### Example gulp task

```javascript
var gulp = require('gulp');
var mediawiki = require('gulp-mediawiki');

var options = {
  server: 'wiki.example.com',
  path: '/w',
  port: 80,
  extension: '.mw'
};

gulp.task('default', function () {
  return gulp.src('pages/*.mw')
    .pipe(mediawiki(options));
});

```

## License

Copyright (c) 2014 Max Kueng

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
