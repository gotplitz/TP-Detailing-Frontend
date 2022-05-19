const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const compression = require('compression');
const path = require('path');

const cors = require('cors');

// Declaring express server
const app = express();
const buildPath = path.join(__dirname, 'client', 'build');

app.use(
	require('prerender-node')
		.set('prerenderToken', 'uoAo3hpSxOoutwUAmgNV')
		.set('protocol', 'https')
);

app.use(cors());

// File path for production

// Express settings and middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ extended: false }));

app.use(compression());

// Set static folder
app.use('/sitemap.xml', function (req, res) {
	res.format({
		'application/xml': function () {
			res.send(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
              <loc>https://gettpd.com/</loc>
              <priority>1</priority>
              <changefreq>monthly</changefreq>
            </url>
            <url>
              <loc>https://gettpd.com/fully-insured-vehicle-detailing-in-connecticut</loc>
              <priority>1</priority>
              <changefreq>monthly</changefreq>
            </url>
            <url>
              <loc>https://gettpd.com/pricing-for-professional-detailing-in-connecticut</loc>
              <priority>1</priority>
              <changefreq>monthly</changefreq>
            </url>
            <url>
              <loc>https://gettpd.com/blog</loc>
              <priority>1</priority>
              <changefreq>monthly</changefreq>
            </url>
            <url>
              <loc>https://gettpd.com/gallery</loc>
              <priority>1</priority>
              <changefreq>monthly</changefreq>
            </url>
            <url>
              <loc>https://gettpd.com/contact-us</loc>
              <priority>1</priority>
              <changefreq>monthly</changefreq>
            </url>
            <url>
              <loc>https://gettpd.com/services/ceramic-coating</loc>
              <priority>1</priority>
              <changefreq>never</changefreq>
            </url>
            <url>
              <loc>https://gettpd.com/services/detailing</loc>
              <priority>1</priority>
              <changefreq>never</changefreq>
            </url>
            <url>
              <loc>https://gettpd.com/services/other-services</loc>
              <priority>1</priority>
              <changefreq>never</changefreq>
            </url>
            <url>
              <loc>https://gettpd.com/blog/everyday-tips-to-keep-your-car-clean-</loc>
              <priority>1</priority>
              <changefreq>never</changefreq>
            </url>
            <url>
              <loc>https://gettpd.com/blog/-beginners-guide-to-professional-car-detailing</loc>
              <priority>1</priority>
              <changefreq>never</changefreq>
            </url>
            <url>
              <loc>https://gettpd.com/blog/5-benefits-of-autodetailing-services</loc>
              <priority>1</priority>
              <changefreq>never</changefreq>
            </url>
          </urlset>`);
		},
	});
});

app.use(
	'/',
	expressStaticGzip(buildPath, {
		enableBrotli: true,
		orderPreference: ['br', 'gz'],
	})
);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'), (err) => {
		if (err) {
			res.status(500).send(err);
		}
	});
});

const PORT = process.env.PORT || 5080;

app.listen(PORT, () =>
	console.log(`Ferocious Media Node Server started on ${PORT}`)
);
