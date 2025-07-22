module.exports = [
	"strapi::errors",
	{
		name: "strapi::cors",
		config: {
			origin: ["http://localhost:3000"], // Cambia por tu frontend
			methods: ["GET", "POST", "PUT", "DELETE"],
		},
	},
	"strapi::security",
	"strapi::poweredBy",
	"strapi::logger",
	"strapi::query",
	"strapi::body",
	"strapi::session",
	"strapi::favicon",
	"strapi::public",
];
