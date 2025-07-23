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
						"res.cloudinary.com", // ¡Añade esto!
					],
					"media-src": [
						"'self'",
						"data:",
						"blob:",
						"res.cloudinary.com", // ¡Añade esto!
					],
					upgradeInsecureRequests: null, // Si usas HTTPS, esto ayuda a que las peticiones se hagan por HTTPS
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
