import { expect, stub } from 'lovecraft';
import https from 'https';

import Manual from './manual.js';

describe('Manual', () => {
  let mockHttps;

  beforeEach(() => {
    mockHttps = stub(https, 'get');
  });

  afterEach(() => {
    mockHttps.restore();
  });

  it('should fetch documentation from the correct URL', (done) => {
    const manual = new Manual();
    const mockResponse = {
      on: stub(),
      statusCode: 200
    };

    mockResponse.on.withArgs('data').yields('Mock HTML Content');
    mockResponse.on.withArgs('end').yields();

    mockHttps.callsFake((url, callback) => {
      expect(url).to.equal('https://www.povray.org/documentation/3.7.0/test-page.html');
      callback(mockResponse);
      return { on: stub() };
    });

    manual.read('test-page.html')
      .then(content => {
        expect(content).to.equal('Mock HTML Content');
        done();
      })
      .catch(done);
  });

  it('should handle network errors', (done) => {
    const manual = new Manual();
    const mockError = new Error('Network Error');

    mockHttps.returns({
      on: (event, callback) => {
        if (event === 'error') {
          callback(mockError);
        }
      }
    });

    manual.read('test-page.html')
      .catch(error => {
        expect(error.message).to.include('Network error fetching documentation');
        expect(error.url).to.include('test-page.html');
        done();
      });
  });

  it('should handle non-200 status codes', (done) => {
    const manual = new Manual();
    const mockResponse = {
      on: stub(),
      statusCode: 404
    };

    mockResponse.on.withArgs('data').yields('');
    mockResponse.on.withArgs('end').yields();

    mockHttps.callsFake((url, callback) => {
      callback(mockResponse);
      return { on: stub() };
    });

    manual.read('test-page.html')
      .catch(error => {
        expect(error.status).to.equal(404);
        expect(error.message).to.include('Failed to fetch');
        done();
      });
  });
});