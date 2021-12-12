module.exports = {
	up(db) {
		return db.collection("customers").insertMany([
			{
				name: "Wesley Crusher",
				address: "mvd6qFeVkqH6MNAS2Y2cLifbdaX5XUkbZJ"
			},
			{
				name: "Leonard McCoy",
				address: "mmFFG4jqAtw9MoCC88hw5FNfreQWuEHADp"
			},
			{
				name: "Jonathan Archer",
				address: "mzzg8fvHXydKs8j9D2a8t7KpSXpGgAnk4n"
			},
			{
				name: "Jadzia Dax",
				address: "2N1SP7r92ZZJvYKG2oNtzPwYnzw62up7mTo"
			},
			{
				name: "Montgomery Scott",
				address: "mutrAf4usv3HKNdpLwVD4ow2oLArL6Rez8"
			},
			{
				name: "James T. Kirk",
				address: "miTHhiX3iFhVnAEecLjybxvV5g8mKYTtnM"
			},
			{
				name: "Spock",
				address: "mvcyJMiAcSXKAEsQxbW9TYZ369rsMG6rVV"
			}
		]);
	},

	down(db) {
		return db.collection("customers").deleteMany([
			{
				address: "mvd6qFeVkqH6MNAS2Y2cLifbdaX5XUkbZJ"
			},
			{
				address: "mmFFG4jqAtw9MoCC88hw5FNfreQWuEHADp"
			},
			{
				address: "mzzg8fvHXydKs8j9D2a8t7KpSXpGgAnk4n"
			},
			{
				address: "2N1SP7r92ZZJvYKG2oNtzPwYnzw62up7mTo"
			},
			{
				address: "mutrAf4usv3HKNdpLwVD4ow2oLArL6Rez8"
			},
			{
				address: "miTHhiX3iFhVnAEecLjybxvV5g8mKYTtnM"
			},
			{
				address: "mvcyJMiAcSXKAEsQxbW9TYZ369rsMG6rVV"
			}
		]);
	}
};
