export class TransportDataService {
  constructor ($log, $http) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.apiHost = '';
  }

  getData(limit) {
    if (!limit) {
      limit = 30;
    }

    return this.$http.get(this.apiHost)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.$log.error('XHR Failed for get transportation data.\n' + angular.toJson(error.data, true));
      });
  }
}
