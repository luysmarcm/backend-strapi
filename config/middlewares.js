module.exports = [
	"strapi::errors",
	{
		name: "strapi::cors",
		config: {
			origin: ["http://localhost:3000"], // Cambia por tu frontend
			methods: ["GET", "POST", "PUT", "DELETE"],
		},
	},
	{
		name: "strapi::security",
		config: {
			contentSecurityPolicy: {
				useDefaults: true,
				directives: {
					"connect-src": ["'self'", "https:"],
					"img-src": [
						"'self'",
						"data:",
						"blob:",
						"res.cloudinary.com", 
					],
					"media-src": [
						"'self'",
						"data:",
						"blob:",
						"res.cloudinary.com", 
					],
					upgradeInsecureRequests: null,
				},
			},
		},
	},
	"strapi::poweredBy",
	"strapi::logger",
	"strapi::query",
	"strapi::body",
	"strapi::session",
	"strapi::favicon",
	"strapi::public",
];
