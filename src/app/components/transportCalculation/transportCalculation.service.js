export class TransportCalculationService {
  constructor ($log, transportData,$filter,$q) {
    'ngInject';

    this.$log = $log;
    this.$filter=$filter;
    this.transportData = transportData;
    this.$q=$q;
  }
  //Function to get the transport options between two stops and for a specified day
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
        //Get the calendar id for the specified date
        let calendarID= calendarData.data.filter((calendar) => calendar[dayWeek] == 1);
        //filters the trips by calendarID
        let tripsByCalendar=tripsData.data.filter((trip) => trip.service_id == calendarID[0].service_id);
        this.stopsTimesData=stopsTimesData;
        //filters trips that runs through the departure stop and that runs after the specified hour
        let departureStopsTimes = stopsTimesData.data.filter((stop) => stop.stop_id === departure.stop_id && stop.departure_time>hourMinutes);
        //filters trips that runs through the arrival stop
        let arrivalStopsTimes = stopsTimesData.data.filter((stop) => stop.stop_id === arrival.stop_id);

        let possibleTripsByStop=[];
        //look for trips that goes through the departure and arrival stop
        angular.forEach(departureStopsTimes, function(value) {
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
        //Filter the trips by calendar
        angular.forEach(tripsByCalendar, function(tripCalendar) {
          let trip=possibleTripsByStop.filter((stop) =>  stop.departure.trip_id === tripCalendar.trip_id );
          if(trip[0]){
            possibleTripsByCalendar.push({
              departure:trip[0].departure,
              arrival:  trip[0].arrival,
              trip:tripCalendar
            });
          }

        });
        deferred.resolve(possibleTripsByCalendar);
      }
    );
    });
    });
    return deferred.promise;
  }
}
