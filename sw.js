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
var CACHE = 'cache-and-update-v-1';

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(update(evt.request));
});

function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      './controlled.html',
      './asset'
    ]);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
