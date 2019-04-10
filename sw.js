// var CACHE = 'cache-and-update';
//
// self.addEventListener('install', function(evt) {
//   console.log('The service worker is being installed.');
//   evt.waitUntil(caches.open(CACHE).then(function (cache) {
//     cache.addAll([
//       '/sw-testing/index.html',
//       '/sw-testing/'
//     ]);
//   }));
// });
//
// self.addEventListener('fetch', function(evt) {
//   const requestURL = new URL(evt.request.url);
//   if(!/(api|cdn)/gm.test(requestURL.pathname) && evt.request.method != "POST"){
//     evt.respondWith(fromCache(evt.request));
//     evt.waitUntil(update(evt.request));
//   } else {
//     console.log(`api request ${evt.request.url}`);
//   }
// });
//
// function fromCache(request) {
//   return caches.open(CACHE).then(function (cache) {
//     return cache.match(request).then(function (matching) {
//       return matching || Promise.reject('no-match');
//     });
//   });
// }
//
// function update(request) {
//   const requestURL = new URL(request.url);
//
//   return caches.open(CACHE).then(function (cache) {
//     return fetch(request).then(function (response) {
//         return cache.put(request, response);
//     });
//   });
// }
var CACHE = 'network-or-cache';
var regExp = new RegExp(/(api|cdn)/g);
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
  const requestURL = new URL(evt.request.url);
  console.log('The service worker is serving the asset.');
  if(!regExp.test(requestURL.pathname) && evt.request.method != "POST"){
    evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
      return fromCache(evt.request);
    }));
  }
});

function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      '/sw-testing/index.html',
      '/sw-testing/'
    ]);
  });
}

function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {
    var timeoutId = setTimeout(reject, timeout);
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}
