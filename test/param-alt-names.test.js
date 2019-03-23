
const chai = require('chai');
const geosupport = require('../index.js');

const { expect } = chai;


describe('Alternate names can be used for parameters', () => {
  it('returns the same function 1B response when using an alt_name', async () => {
    const responseWithNames = await geosupport['1B']({
      'House Number - Display Format': '120',
      'Street Name-1': 'BROADWAY',
      'ZIP Code Input': '10271',
      'Borough Code-1': '1',
    });

    const responseWithAltNames = await geosupport['1B']({
      house_number: '120',
      street: 'BROADWAY',
      zip_code: '10271',
      borough_code: '1',
    });

    expect(responseWithNames).to.eql(responseWithAltNames);
  });
});
