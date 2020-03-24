# Express User Agent Redirect

![](https://travis-ci.org/world-gaming-fed/express-ua-redirect.svg?branch=master)
![](https://david-dm.org/world-gaming-fed/express-ua-redirect.svg)
[![Coverage Status](https://coveralls.io/repos/world-gaming-fed/express-ua-redirect/badge.svg?branch=master&service=github)](https://coveralls.io/github/world-gaming-fed/express-ua-redirect?branch=master)

Express UA Redirect is a simple configurable middleware for ExpressJS allowing you to redirect all routes to a configured route based on user agent restrictions.
It was create to warn the user that the browser is not compatible, but it can be used for other reasons.

Here is an example to redirect IE 8 and less user to `/incompatible-browser` route:
```js
app.use(uaRedirect({
  browsers: {
    unauthorized: {
      IE: '8-'
    }
  },
  redirectTo: '/incompatible-browser'
}));
```

There is also an evergreen mode to accept all automatic updated browsers and redirect all other:
```js
app.use(uaRedirect({
  browsers: {
    evergreen: true
  },
  redirectTo: '/incompatible-browser'
}));
```

## Installation

Install the dependency
```shell
npm install --save express-ua-redirect
```

Install it on your express server
```js
var uaRedirect = require('express-ua-redirect');
//...
app.use(uaRedirect(options));
```

## How to use

1. Proceed to installation has describe before
2. Configure the `browsers` option
3. Add a route to your server according to the option `redirectTo`
4. Make what you will with this route
5. You're done!

### Exemple

To redirect IE7 to `/update-your-browser` who it render `update-your-browser.ejs` template.

#### server.js
```js
var express = require('express');
var uaRedirect = require('express-ua-redirect');

var app = express();
app.set('view engine', 'ejs');

// Configure uaRedirect
app.use(uaRedirect({
  browsers: {
    unauthorized: {
      IE: 7
    }
  },
  redirectTo: '/update-your-browser'
}));

// ...
// Define your routes
// ...

// Define the associate route to `redirectTo` option
app.get('/update-your-browser', function(req, res) {
  res.render('update-your-browser');
});
```

#### update-your-browser.ejs
```ejs
<h1>Oups your browser is not compatible</h1>
<p>We recommend that you update your browser ...</p>
```

## options

- browsers {Object}
  - unauthorized {Object} Specify unauthorized browser(s) and its version with a browser object described below
  - authorized {Object} Specify authorized browser(s) and its version with a browser object described below
  - evergreen {Boolean} Redirect all not evergreen browser
- redirectTo {String} Route path

### Browser object possibilities

```js
{
  IE: 8,         // match the exact version of IE8
  Chrome: '44+', // match chrome 44 and above
  Safari: '8-'   // match safari 8 and below
}
```
Browser name is not case sensitive an you can use all browser listed on ua-parser-js plugin documentation [here](https://github.com/faisalman/ua-parser-js#methods)

Version condition can be `String` or `Number`. __With `+` or `-` indicator it must be a `String`__.

## Priority order
If you specify an unauthorized browser __it will override authorized browser__ and __authorized override evergreen browsers__.

    unauthorized > authorized > evergreen

## Use cases

### Lock IE8 and below
```js
app.use(uaRedirect({
  browsers: {
    unauthorized: {
      IE: '8-'
    }
  },
  redirectTo: '/incompatible-browser'
}));
```

### Authorized modern browsers
```js
app.use(uaRedirect({
  browsers: {
    authorized: {
      safari: '7+',
      IE: '9+'
    },
    evergreen: true
  },
  redirectTo: '/incompatible-browser'
}));
```
