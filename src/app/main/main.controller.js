export class MainController {
  constructor (clock,$scope,transportData,transportCalculation,serviceWorker) {
    'ngInject';
    serviceWorker.register();
    $scope.clock= {Time: 0};
    clock.getHour($scope.clock);
    this.transportCalculation=transportCalculation;
    this.transportStaticData(transportData);
    this.clock=$scope.clock;


  }
  transportStaticData(transportData){
    transportData.getStops().then(stopsData =>
    {
      this.stopsData=stopsData;
    }
    );


  }
  departureSelected(){
  this.stopsDataArrival=this.stopsData;
  var index = this.stopsDataArrival.data.indexOf(this.selectedItemDeparture);
  this.stopsDataArrival.data.splice(index, 1);
  }
  arrivalSelected(){
    console.log(this.selectedItemDeparture);
   this.transportCalculation.getTransportOptions(this.selectedItemDeparture,this.selectedItemArrival,this.clock.Time).then(possibleTrips=>
   {
     this.possibleTrips=possibleTrips;
   });
  }

}
