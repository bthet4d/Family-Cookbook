/*****************************************************************************/
/* AddRecipe: Event Handlers */
/*****************************************************************************/
ingredients = [];
directions = [];
stepCounter = [];

Template.AddRecipe.events({
	'click [name=add_ingredient]':function(e){
		e.preventDefault();
		var ingredient = $('#ingredient_name').val();
		var amount = $('#ingredient_amount').val();
		var type = $('#ingredient_type').val();
		var typeName = $('#ingredient_type').find(":selected").html();
		
		$('#ingredients_list tbody').append(
			'<tr class="ingredient_item" draggable="true">'
			+ '<td id="ingredient">' 
			+ '<span id="amount">' + amount + '</span>'
			+ ' '
			+ '<span id="type" val="' + type + '">' + typeName + '</span>'
			+ ' '
			+ '<span id="name">' + ingredient + '</span>'
			+ '</td>'
			+ '<td class="removeItem"><span class="glyphicon glyphicon-minus"></span></td>'
			+ '</tr>'
		);
		$('#ingredient_name').val('');
		$('#ingredient_amount').val('');
		//show ingrendients
		$('#ingredientsList').css('display: inline');
		//remove the invalid entry class
		$('#ingredient_name').removeClass('invalid-entry');
		$('#ingredient_amount').removeClass('invalid-entry');
		// ing = {
		// 	name: name,
		// 	amount: amount,
			
		// }
		// ingredients.push(ing);
	},

	'click [name=add_step]':function(e){
		e.preventDefault();
		//add step to the directions list
		
		var currentStep = Template.instance().step.get();
		var task = $("#directions_step").val();
		
		$("#directionsTable").append(
			'<tr class="step">' 
			+ '<td id="task">' + task + '</td>'
			+ '<td class="removeItem"><span class="glyphicon glyphicon-minus" data-step="' + currentStep + '"></span></td>'
			+ '</tr>'
			);
		
		$("#directions_step").val('');
		//remove invalid entry class
		$('#directions_step').removeClass('invalid-entry');
		//increment step number
		var nextStep = Template.instance().step.get() + 1;
		Template.instance().step.set(nextStep);
	},

	'click [name=submitRecipe]':function(e){
		e.preventDefault();
		var validForm = true;
		//submission by enter currently prevented
		if(e.keyCode == 13){
			validForm = false;
		}
		var title = $("#addTitle").val().toLowerCase();
		var prepTime = $("#addPrepTime").val();
		var servings = $("#addServings").val();
		var categoryId = $("#addCategoryId").val();
		var author = $('#addAuthor').val().toLowerCase();
		var stepPlain = 1;
		
		//if the title, author or category are emmpty, prevent submission
		if(title === ''){
			validForm = false;
			$('#addTitle').addClass('invalid-entry');
		}else{
			$('#addTitle').removeClass('invalid-entry');
		}
		if(author === ''){
			validForm = false;
			$('#addAuthor').addClass('invalid-entry');
		}else{
			$('#addAuthor').removeClass('invalid-entry');
		}

		if(categoryId === ''){
			validForm = false;
			$('#addCategoryId').addClass('invalid-entry');
		}else{
			$('#addCategoryId').removeClass('invalid-entry');
		}

		var directionsCount = document.getElementById('directionsTable').getElementsByTagName('tr').length;
		var ingredientsCount = document.getElementById('ingredients_list').getElementsByTagName('tr').length;
		
		if(!directionsCount){
			validForm = false;
			$("#directions_step").addClass('invalid-entry');
		}else{
			$("#directions_step").removeClass('invalid-entry');
		}

		if(!ingredientsCount){
			validForm = false;
			$('#ingredient_name').addClass('invalid-entry');
			$('#ingredient_amount').addClass('invalid-entry');
		}else{
			$('#ingredient_name').removeClass('invalid-entry');
			$('#ingredient_amount').removeClass('invalid-entry');
		}


		$('#directionsTable tr').each(function(){
			$(this).find('td').each(function(){
				if($(this).attr('id') === 'task'){
					directions.push({
						step: stepPlain,
						task: $(this).text().toLowerCase()
					});
				}
			});
			stepPlain++;
		});

		$('#ingredients_list tr').each(function(){

			var name = '';
			var type = '';
			var amount = '';
			$(this).find('td').each(function(){
				$(this).find('span').each(function(){
					console.log('this');
					console.log(this);
					var id = (this).getAttribute('id');
					console.log('id');
					console.log(id);
					if(id === 'name'){
						name = $(this).context.innerHTML.toLowerCase();
					}else if(id === 'amount'){
						amount = $(this).context.innerHTML;
					}else if(id == "type"){
						type = $(this).context.innerHTML;
					}
				});
			});
			var ing = {
				name: name,
				amount: amount,
				type: type
			}
			ingredients.push(ing);
		});
		//todo -add validation to form and disable submit on enter
	
			// insert into Recipes Collection
			var recipe = {
				categoryId: parseInt(categoryId),
				title: title,
				author: author,
				prepTime: prepTime,
				servings: servings,
				directions: directions,
				ingredients: ingredients
			};
			// ingredients not currently saved or used as a filter
			// moved to a search feature
			// for(ing in ingredients){
			// 	var ingToAdd = ingredients[ing].name;
			// 	//todo check if there are similar ingredients
			// 	var similarIngredients = Ingredients.find({name: new RegExp(ingToAdd)}).fetch();
			// 	Meteor.call('insertIngredient', ingToAdd);
			// }
			console.log('recipe');
			console.log(recipe);
			validForm = false;
			if(validForm){
				Meteor.call('addOriginalRecipe', recipe);
			}
			
	},

	'click [class="removeItem"]': function(e){
		//todo - reset the counts in the list....is this possible?????
		e.preventDefault();
		var currentTarget = $(e.currentTarget);
		currentTarget.parent().remove();
	},
	'change [class="form-control invalid-entry"]': function(e){
		$(e.currentTarget).removeClass('invalid-entry');
	},
	'ondragover [name="ingredient-dropzone"]': function(e){
		e.preventDefault();
		console.log('drag over');
	},
	'ondrag [class="ingredient_item"]': function(e){
		e.preventDefault();
		console.log('drag');
	},
	'ondrop [class="ingredient-drop"]': function(e){
		e.preventDefault();
		console.log('drop event');
	},
	'ondragenter [class="ingredient-drop"]': function(e){
		e.preventDefault();
		console.log('drag enter');
	},
	'ondragleave [class="ingredient-drop"]': function(e){
		e.preventDefault();
		console.log('drag leave');
	},




// 	$('.drop').on('drop dragdrop',function(){
//     alert('dropped');
// });
// $('.drop').on('dragenter',function(){
//     $(this).html('drop now').css('background','blue');
// })
// $('.drop').on('dragleave',function(){
//     $(this).html('drop here').css('background','red');
// })
});

/*****************************************************************************/
/* AddRecipe: Helpers */
/*****************************************************************************/
Template.AddRecipe.helpers({
	stepNumber: function(){

		return Template.instance().step.get();
	},
	category: function(){
		return Categories.find();
	},
	displayCategory: function(){
		if(this.catId !== 1){
			return true;
		}else{
			return false;
		}
	},
	getMeasurements: function(){
		return MEASUREMENT_TYPES;
	},
	getMeasurementType: function(){
		return this.measurements;
	},
	'ingredientDropHandler': function(e){
		e.preventDefault();
		console.log('drop handler');
	},
});

/*****************************************************************************/
/* AddRecipe: Lifecycle Hooks */
/*****************************************************************************/
Template.AddRecipe.created = function () {
	var instance = this;
	instance.step = new ReactiveVar(1);
	instance.subscribe('ingredients');
};

Template.AddRecipe.rendered = function () {
};

Template.AddRecipe.destroyed = function () {
};
