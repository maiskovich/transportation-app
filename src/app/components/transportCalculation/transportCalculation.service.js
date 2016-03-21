export class TransportCalculationService {
  constructor ($log, transportData,$filter) {
    'ngInject';

    this.$log = $log;
    this.$filter=$filter;
    this.transportData = transportData;
  }

  getTransportOptions(departure,arrival,day) {
    this.transportData.getCalendar().then(calendarData =>
    {
    this.transportData.getStopsTimes().then(stopsTimesData =>
      {
        console.log(calendarData);
        let dayWeek=this.$filter('date')(day, 'EEEE');
        dayWeek=dayWeek. toLowerCase();
        let calendarID= calendarData.data.filter((calendar) => calendar[dayWeek] == 1);
        console.log(calendarID);
        this.stopsTimesData=stopsTimesData;
        let departureStopsTimes = this.stopsTimesData.data.filter((stop) => stop.stop_id === departure.stop_id);
        let arrivalStopsTimes = this.stopsTimesData.data.filter((stop) => stop.stop_id === arrival.stop_id);
        let possibleTripsByStop=[];
        angular.forEach(departureStopsTimes, function(value, key) {
          let trip=arrivalStopsTimes.filter((stop) =>  stop.trip_id === value.trip_id );
          if(trip[0]){
            possibleTripsByStop.push(trip[0]);
          }
        });
        console.log(possibleTripsByStop);
      }
    );
    }
    );
  }
}
