export class TransportDataService {
  constructor ($log, $http) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
  }
  getCalendar() {

    return this.$http.get('/data/GTFS/calendar.txt')
      .then((response) => {
        return Papa.parse(response.data,{header: true,skipEmptyLines: true});
      })
      .catch((error) => {
        this.$log.error('XHR Failed for get calendar data.\n' + angular.toJson(error.data, true));
      });
  }
  getTrips() {

    return this.$http.get('/data/GTFS/trips.txt')
      .then((response) => {
        return Papa.parse(response.data,{header: true,skipEmptyLines: true});
      })
      .catch((error) => {
        this.$log.error('XHR Failed for get trips data.\n' + angular.toJson(error.data, true));
      });
  }
  getStops() {

    return this.$http.get('/data/GTFS/stops.txt')
      .then((response) => {
        return Papa.parse(response.data,{header: true,skipEmptyLines: true});
      })
      .catch((error) => {
        this.$log.error('XHR Failed for get transportation data.\n' + angular.toJson(error.data, true));
      });
  }
  getStopsTimes() {

    return this.$http.get('/data/GTFS/stop_times.txt')
      .then((response) => {
        return Papa.parse(response.data,{header: true,skipEmptyLines: true});
      })
      .catch((error) => {
        this.$log.error('XHR Failed for get transportation data.\n' + angular.toJson(error.data, true));
      });
  }
}

