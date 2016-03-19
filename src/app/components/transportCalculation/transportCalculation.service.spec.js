describe('service transportCalculation', () => {
  beforeEach(angular.mock.module('transportationApp'));

  it('should be registered', inject(transportCalculation => {
    expect(transportCalculation).not.toEqual(null);
  }));

  describe('getTransportOptions function', () => {
    it('should exist', inject(transportCalculation => {
      expect(transportCalculation.getTransportOptions).not.toEqual(null);
    }));



  });
});


