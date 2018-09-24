window.addEventListener('online', function(e) {
      if (navigator.onLine) {
        console.log("IM BACK");
        DBHelper.updateDatabaseWhenOnline();
      } 
  }, false);