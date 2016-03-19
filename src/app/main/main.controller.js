export class MainController {
  constructor (clock,$scope,transportData,transportCalculation) {
    'ngInject';
    $scope.clock= {Time: 0};
    clock.getHour($scope.clock);
    this.transportCalculation=transportCalculation;
    this.transportStaticData(transportData);

  }
  transportStaticData(transportData){
    transportData.getStops().then(stopsData =>
    {
      this.stopsData=stopsData;
     console.log(this.stopsData.data);
    }
    );


  }
  departureSelected(){
  console.log(this.selectedItemDeparture);
  this.stopsDataArrival=this.stopsData;
  var index = this.stopsDataArrival.data.indexOf(this.selectedItemDeparture);
  this.stopsDataArrival.data.splice(index, 1);
  }
  arrivalSelected(){
    console.log(this.selectedItemArrival);
    this.transportCalculation.getTransportOptions(this.selectedItemDeparture,this.selectedItemArrival);
  }

}
