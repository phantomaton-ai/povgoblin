import https from 'https';

class Manual {
  constructor(options = {}) {
    this.base = options.base || 'https://www.povray.org/documentation/3.7.0';
  }

  read(pagePath) {
    return new Promise((resolve, reject) => {
      // Construct full URL
      const fullUrl = `${this.base}/${pagePath}`;

      https.get(fullUrl, (response) => {
        let data = '';

        // A chunk of data has been received.
        response.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received.
        response.on('end', () => {
          // Handle different response codes
          if (response.statusCode === 200) {
            resolve(data);
          } else {
            reject({
              status: response.statusCode,
              message: `Failed to fetch documentation page: ${pagePath}`,
              url: fullUrl
            });
          }
        });
      }).on('error', (error) => {
        reject({
          error,
          message: `Network error fetching documentation: ${pagePath}`,
          url: fullUrl
        });
      });
    });
  }
}

export default Manual;