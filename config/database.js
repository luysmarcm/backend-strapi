const path = require("path");

module.exports = ({ env }) => {
	const client = env("DATABASE_CLIENT", "sqlite"); // Por defecto a sqlite para desarrollo local si no se especifica

	// Este objeto define los detalles de conexión para cada cliente de base de datos.
	const connections = {
		mysql: {
			connection: {
				host: env("DATABASE_HOST", "localhost"),
				port: env.int("DATABASE_PORT", 3306),
				database: env("DATABASE_NAME", "strapi"),
				user: env("DATABASE_USERNAME", "strapi"),
				password: env("DATABASE_PASSWORD", "strapi"),
				ssl: env.bool("DATABASE_SSL", false) && {
					key: env("DATABASE_SSL_KEY", undefined),
					cert: env("DATABASE_SSL_CERT", undefined),
					ca: env("DATABASE_SSL_CA", undefined),
					capath: env("DATABASE_SSL_CAPATH", undefined),
					cipher: env("DATABASE_SSL_CIPHER", undefined),
					rejectUnauthorized: env.bool(
						"DATABASE_SSL_REJECT_UNAUTHORIZED",
						true
					),
				},
			},
			pool: {
				min: env.int("DATABASE_POOL_MIN", 2),
				max: env.int("DATABASE_POOL_MAX", 10),
			},
		},
		// --- INICIO: CONFIGURACIÓN POSTGRES MODIFICADA ---
		postgres: {
			connection: {
				// Usa connectionString si DATABASE_URL es provista, lo cual Render hará.
				// Esto parseará automáticamente todos los detalles (host, puerto, usuario, contraseña, nombre de la base de datos) desde la URL.
				connectionString: env("DATABASE_URL"),
				// Para SSL, Render típicamente provee una conexión segura.
				// `rejectUnauthorized: false` a menudo es necesario para algunos proveedores de bases de datos en la nube
				// (incluyendo Render) si usan certificados autofirmados o si encuentras errores SSL.
				ssl: env.bool("DATABASE_SSL", true)
					? {
							rejectUnauthorized: env.bool(
								"DATABASE_SSL_REJECT_UNAUTHORIZED",
								false
							),
						}
					: false,
				schema: env("DATABASE_SCHEMA", "public"), // Mantenemos el esquema para PostgreSQL
			},
			pool: {
				min: env.int("DATABASE_POOL_MIN", 2),
				max: env.int("DATABASE_POOL_MAX", 10),
			},
		},
		// --- FIN: CONFIGURACIÓN POSTGRES MODIFICADA ---
		sqlite: {
			connection: {
				filename: path.join(
					__dirname,
					"..",
					env("DATABASE_FILENAME", ".tmp/data.db")
				),
			},
			useNullAsDefault: true,
		},
	};

	return {
		connection: {
			client,
			...connections[client],
			acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
		},
	};
};
