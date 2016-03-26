export class TransportCalculationService {
  constructor ($log, transportData,$filter,$q) {
    'ngInject';

    this.$log = $log;
    this.$filter=$filter;
    this.transportData = transportData;
    this.$q=$q;
  }

  getTransportOptions(departure,arrival,day) {
    var deferred = this.$q.defer();
    this.transportData.getTrips().then(tripsData =>
    {
    this.transportData.getCalendar().then(calendarData =>
    {
    this.transportData.getStopsTimes().then(stopsTimesData =>
      {
        let dayWeek=this.$filter('date')(day, 'EEEE');
        let hourMinutes=this.$filter('date')(day, 'HH:mm:ss');
        dayWeek=dayWeek. toLowerCase();
        let calendarID= calendarData.data.filter((calendar) => calendar[dayWeek] == 1);
        let tripsByCalendar=tripsData.data.filter((trip) => trip.service_id == calendarID[0].service_id);
        this.stopsTimesData=stopsTimesData;

        let departureStopsTimes = stopsTimesData.data.filter((stop) => stop.stop_id === departure.stop_id && stop.departure_time>hourMinutes);
          let arrivalStopsTimes = stopsTimesData.data.filter((stop) => stop.stop_id === arrival.stop_id);

        let possibleTripsByStop=[];
        angular.forEach(departureStopsTimes, function(value, key) {
          let trip=arrivalStopsTimes.filter((stop) =>  stop.trip_id === value.trip_id && Number(stop.stop_sequence) > Number(value.stop_sequence));
          if(trip[0]){
            possibleTripsByStop.push(
              {
                departure: value,
                arrival:  trip[0]
              });
          }
        });
        let possibleTripsByCalendar=[];
        angular.forEach(tripsByCalendar, function(tripCalendar, key) {
          let trip=possibleTripsByStop.filter((stop) =>  stop.departure.trip_id === tripCalendar.trip_id );
          if(trip[0]){
            possibleTripsByCalendar.push(trip[0]);
          }

        });
        console.log(possibleTripsByCalendar);
        deferred.resolve(possibleTripsByCalendar);
      }
    );
    });
    });
    return deferred.promise;
  }
}
