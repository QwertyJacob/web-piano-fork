const resource = [
    /* --- CSS --- */
    '/toy-jekyll-page/assets/css/style.css',

    /* --- PWA --- */
    '/toy-jekyll-page/app.js',
    '/toy-jekyll-page/sw.js',

    /* --- HTML --- */
    '/toy-jekyll-page/index.html',
    '/toy-jekyll-page/404.html',

    
        '/toy-jekyll-page/categories/',
    
        '/toy-jekyll-page/tags/',
    
        '/toy-jekyll-page/archives/',
    
        '/toy-jekyll-page/about/',
    

    /* --- Favicons & compressed JS --- */
    
    
        '/toy-jekyll-page/assets/img/favicons/android-chrome-192x192.png',
        '/toy-jekyll-page/assets/img/favicons/android-chrome-512x512.png',
        '/toy-jekyll-page/assets/img/favicons/apple-touch-icon.png',
        '/toy-jekyll-page/assets/img/favicons/favicon-16x16.png',
        '/toy-jekyll-page/assets/img/favicons/favicon-32x32.png',
        '/toy-jekyll-page/assets/img/favicons/favicon.ico',
        '/toy-jekyll-page/assets/img/favicons/mstile-150x150.png',
        '/toy-jekyll-page/assets/js/dist/categories.min.js',
        '/toy-jekyll-page/assets/js/dist/commons.min.js',
        '/toy-jekyll-page/assets/js/dist/home.min.js',
        '/toy-jekyll-page/assets/js/dist/misc.min.js',
        '/toy-jekyll-page/assets/js/dist/page.min.js',
        '/toy-jekyll-page/assets/js/dist/post.min.js',
        '/toy-jekyll-page/assets/js/dist/pvreport.min.js'
];

/* The request url with below domain will be cached */
const allowedDomains = [
    

    'localhost:4000',

    

    'fonts.gstatic.com',
    'fonts.googleapis.com',
    'cdn.jsdelivr.net',
    'polyfill.io'
];

/* Requests that include the following path will be banned */
const denyUrls = [
    
];

