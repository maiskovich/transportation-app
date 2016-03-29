export class ServiceWorkerService {
  constructor ($log, $http) {
    'ngInject';
    this.$log = $log;
    this.$http = $http;
  }
  register() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(registration => {
        this.$log.log('ServiceWorker registration successful with: ', registration);
      }).catch(err=> {
        this.$log.log('ServiceWorker registration failed: ', err);
      });
    }
  }
}

