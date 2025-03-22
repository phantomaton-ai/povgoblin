import https from 'https';
import path from 'path';
import fs from 'fs';

class Manual {
  constructor(options = {}) {
    this.base = options.base || 'https://www.povray.org/documentation/3.7.0';
    this.cache = options.cache || path.join(process.cwd(), 'data', 'docs-cache');

    // Ensure cache directory exists
    if (!fs.existsSync(this.cache)) {
      fs.mkdirSync(this.cache, { recursive: true });
    }
  }

  read(pagePath) {
    return new Promise((resolve, reject) => {
      // Construct full URL
      const fullUrl = `${this.base}/${pagePath}`;
      const cacheFile = path.join(this.cache, `${pagePath.replace(/\//g, '_')}.html`);

      // Check cache first
      if (fs.existsSync(cacheFile)) {
        const cachedContent = fs.readFileSync(cacheFile, 'utf-8');
        return resolve(cachedContent);
      }

      // Fetch from web
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
            // Cache the content
            fs.writeFileSync(cacheFile, data);
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