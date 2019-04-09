if ('serviceWorker' in navigator) {
    // Весь код регистрации у нас асинхронный.
    navigator.serviceWorker.register('/sw-testing/sw.js',{scope:'./cached'})
      .then(() => navigator.serviceWorker.ready.then((worker) => {
        worker.sync.register('syncdata');
      }))
      .catch((err) => console.log(err));

    navigator.serviceWorker.ready.then(reload);
    var reloadButton = document.querySelector('#reload');
    reloadButton.onclick = reload;

    function reload() {
      window.location.reload();
    }
}
