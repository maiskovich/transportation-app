export class MainController {
  constructor (clock,$scope,transportData,transportCalculation,serviceWorker) {
    'ngInject';
    serviceWorker.register();
    $scope.clock= {Time: 0};
    clock.getHour($scope.clock);
    this.transportCalculation=transportCalculation;
    this.transportStaticData(transportData);
    this.clock=$scope.clock;
    this.changeDate='off';
    this.selectedDate=this.clock.Time;
    this.$scope=$scope;
  }
  //Select a specific date and not use the actual date
  selectManualDate(){
    this.selectedDate=this.selectedDate;
    this.changeDate='off';
  }
  //Gets the stops data to give options to the user choose from which stop to depart and to which stop to arrive
  transportStaticData(transportData){
    transportData.getStops().then(stopsData =>
    {
      this.stopsData=stopsData;
    }
    );
  }
  //Function that is called when the departure is selected, its remove the departure stop from the options that the user
  //can choose as arrival stop
  departureSelected(){
  this.stopsDataArrival=this.stopsData;
  var index = this.stopsDataArrival.data.indexOf(this.selectedItemDeparture);
  this.stopsDataArrival.data.splice(index, 1);
  }
  //When the arrival have been selected it call the getTransportOptions function to get the data
  arrivalSelected(){
    if(this.selectedItemDeparture && this.selectedItemArrival){
   this.transportCalculation.getTransportOptions(this.selectedItemDeparture,this.selectedItemArrival,this.selectedDate).then(possibleTrips=>
   {
     this.possibleTrips=possibleTrips;
   });
    }
  }
  //To make a new search, overwrite the possible trips var
  resetSearch(){
    this.possibleTrips='';
  }

}
