describe('service transportData', () => {
  beforeEach(angular.mock.module('transportationApp'));

  it('should be registered', inject(transportData => {
    expect(transportData).not.toEqual(null);
  }));

  describe('apiHost variable', () => {
    it('should exist', inject(transportData => {
      expect(transportData.apiHost).not.toEqual(null);
    }));
  });

  describe('getData function', () => {
    it('should exist', inject(transportData => {
      expect(transportData.getData).not.toEqual(null);
    }));

    it('should return data', inject((transportData, $httpBackend) => {
      $httpBackend.when('GET',  transportData.apiHost).respond(200, [{pprt: 'value'}]);
      var data;
      transportData.getData(1).then(function(fetchedData) {
        data = fetchedData;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Array));
      expect(data.length === 1).toBeTruthy();
      expect(data[0]).toEqual(jasmine.any(Object));
    }));

    it('should log a error', inject((transportData, $httpBackend, $log) => {
      $httpBackend.when('GET',  transportData.apiHost).respond(500);
      transportData.getData();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for get transportation data'));
    }));
  });
});
