require("dotenv").config();

module.exports = {
	mongodb: {
		url: process.env.DB_URL || "mongodb://localhost:27017",
		databaseName: process.env.DB_NAME || "kobayashiMaru",
		options: {
			useNewUrlParser: true, // removes a deprecation warning when connecting
			useUnifiedTopology: true // removes a deprecating warning when connecting
		}
	},
	migrationsDir: "migrations",
	// Collection where the applied changes are stored.
	changelogCollectionName: "migrations"
};
