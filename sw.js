self.importScripts('js/idb.js');
self.importScripts('js/dbhelper.js');

var restaurantsInfoCache = 'restaurants-review-cache-v1';

var allCaches = [
  restaurantsInfoCache
];

//Cache Links
var urlsToCache = [
  '/',
  '/index.html',
  'manifest.json',
  '/restaurant.html',
  'restaurant_reviews.html',
  '/sw.js',
  '/css/main.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/register.js',
  '/js/restaurant_info.js',
  '/js/idb.js',
  '/js/reviews.js',
  '/js/OfflineToOnline.js',
  '/icons/001-like.svg',
  '/icons/002-like.svg',
  '/img/1_1x.jpg',
  '/img/1_2x.jpg',
  '/img/2_1x.jpg',
  '/img/2_2x.jpg',
  '/img/3_1x.jpg',
  '/img/3_2x.jpg',
  '/img/4_1x.jpg',
  '/img/4_2x.jpg',
  '/img/5_1x.jpg',
  '/img/5_2x.jpg',
  '/img/6_1x.jpg',
  '/img/6_2x.jpg',
  '/img/7_1x.jpg',
  '/img/7_2x.jpg',
  '/img/8_1x.jpg',
  '/img/8_2x.jpg',
  '/img/9_1x.jpg',
  '/img/9_2x.jpg',
  '/img/10_1x.jpg',
  '/img/10_2x.jpg',
  '/img/not-found.png',
  '/img/icon-192.png',
  '/img/icon-512.png'
]

//Cache Files
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(restaurantsInfoCache)
      .then(function(cache) {
        console.log('Opened Restaurant Info Cache');
        return cache.addAll(urlsToCache);
      }).catch((error) =>{
        console.error('Failed to cache', error);
      })
    );
  });

//Return Requests
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request)
    }).catch(function(errorResponse) {
        if(event.request.url.startsWith('restaurant.html?id=')){
        console.log("The cache is not working!.")
        return caches.match('/restaurant.html');
      }
    })
  );
});
      

self.addEventListener('activate', function(event) {
  event.waitUntil(
    createDatabase()
   );
  event.waitUntil(
    populateRestaurantInfoDatabase()
    );
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurants-') &&
                 !allCaches.includes(cacheName);    
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );

});

function createDatabase(data){
  console.log('Creating Databases')
  idb.open('Restaurants', 1, function(upgradeDb) {
    switch (upgradeDb.oldVersion) {
      case 0:
        upgradeDb.createObjectStore('restaurant-info', {
          keyPath: 'id'
        });
        upgradeDb.createObjectStore('online-restaurant-reviews', {
          keyPath: 'id'
        })
        upgradeDb.createObjectStore('offline-restaurant-reviews', {
          keyPath: 'id', autoIncrement:true
        })
          upgradeDb.createObjectStore('offline-restaurant-favs-status', {
          keyPath: 'id', autoIncrement:true
        })
    }
  });
}

function populateRestaurantInfoDatabase() {
   fetch(`${DBHelper.DATABASE_URL}`)
   .then(response => response.json())
   .then(addRestaurantInfo)

   function addRestaurantInfo(data){
    idb.open('Restaurants', 1).then(function(db){
      var tx = db.transaction('restaurant-info', 'readwrite');
      var restaurantStore = tx.objectStore('restaurant-info');
      for (var i = 0; i < data.length; i++) {
      restaurantStore.put(data[i]);
    }

    });
  }
}
