export class ServiceWorkerService {
  constructor ($log, $http,$mdToast) {
    'ngInject';
    this.$log = $log;
    this.$http = $http;
    this.$mdToast=$mdToast;
  }
  register() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(reg => {
        this.$log.log('ServiceWorker registration successful with: ', reg);
        if (reg.waiting) {
          this.updateReady(reg.waiting);
          return;
        }
        if (reg.installing) {
          this.trackInstalling(reg.installing);
          return;
        }
        reg.addEventListener('updatefound', function() {
          this.trackInstalling(reg.installing);
        });
      }).catch(err=> {
        this.$log.log('ServiceWorker registration failed: ', err);
      });
    }

  };
  trackInstalling(worker) {
  worker.addEventListener('statechange', function() {
    if (worker.state == 'installed') {
      this.updateReady(worker);
    }
  });
};

  updateReady(worker) {
    var toast = this.$mdToast.simple()
      .textContent('New update available')
      .action('UPDATE')
      .highlightAction(true);
    this.$mdToast.show(toast).then(response=> {
      if ( response == 'ok' ) {
        worker.postMessage({action: 'skipWaiting'});
      }
    });

};

}
