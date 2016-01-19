Meteor.startup(function () {

	if(Categories.find().count() === 0){
		//todo insert categories
		var categoryArray = [
			{
				catId: 1,
				name: 'Appetizers, Pickles, and Relishes'
			},
			{
				catId: 2,
				name: 'Soups, Salads, Dressings, and Sauces'
			},
			{
				catId: 3,
				name: 'Main Dishes - Meat, Seafood, and Poultry'
			},
			{
				catId: 4,
				name: 'Vegtables'
			},
			{
				catId: 5,
				name: 'Bread, Rolls, Pies, and Pastry'
			},
			{
				catId: 6,
				name: 'Cakes, Cookies, and Icings'
			},
			{
				catId: 7,
				name: 'Desserts'
			},
			{
				catId: 8,
				name: 'Candy, Jelly, and Preservatives'
			},
			{
				catId: 9,
				name: 'Beveraves and Miscellaneous'
			},
			{
				catId: 10,
				name: 'Microwave'
			}
		];
		_.each(categoryArray, function(doc){
			Categories.insert(doc);
		})
	}
});

