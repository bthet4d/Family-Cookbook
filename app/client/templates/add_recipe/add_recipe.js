/*****************************************************************************/
/* AddRecipe: Event Handlers */
/*****************************************************************************/
ingredients = [];
directions = [];
stepCounter = [];
var addTask = function(task){
		$("#directionsTable").append(
			'<li class="">'
				+ task
				+ '  <span name="removeTask" class="glyphicon glyphicon-minus" data-step=""><span>'
				+ '</li>'
		);
		$("#directions_step").val('');
		//remove invalid entry class
		$('#directions_step').removeClass('invalid-entry');
		//increment step number
		// Template.instance().step.set(Template.instance().step.get() + 1);
		$('.sortable-directions').sortable('destroy');
		$('.sortable-directions').sortable();
}

Template.AddRecipe.events({
	'click [name=add_ingredient]':function(e){
		e.preventDefault();
		var ingredient = $('#ingredient_name').val();
		var amount = $('#ingredient_amount').val();

		var type = $('#ingredient_type');
		var typeVal = type.val();
		var typeName = $('#ingredient_type').find(":selected").html();

		var append = '<li data-id="ingredient" class="">';
			if(amount){
				append += '<span id="amount">' + amount + '</span> ';
			}
			if(typeVal != 0){
				append += '<span id="type" val"' + typeVal + '">' + typeName + '</span> ';
			}
			append += '<span id="name">' + ingredient + '</span>'
			+ '  <span name="removeTask" class="glyphicon glyphicon-minus" data-step=""><span>'
			+ '</li>'
		$('#ingredients_list').append(append);
		$('#ingredient_name').val('');
		$('#ingredient_amount').val('');
		//show ingrendients
		$('#ingredientsList').css('display: inline');
		//remove the invalid entry class
		$('#ingredient_name').removeClass('invalid-entry');
		$('#ingredient_amount').removeClass('invalid-entry');
		$('.sortable-ingredients').sortable('destroy');
		$('.sortable-ingredients').sortable();
		//todo - reset the select to empty option
		type.val(0);
	},

	'click [name=add_step]':function(e){
		e.preventDefault();
		
		//add step to the directions list
		var task = $("#directions_step").val();
		addTask(task);
		// $("#directionsTable").append(
		// 	'<li class="">'
		// 		+ task
		// 		+ '  <span name="removeTask" class="glyphicon glyphicon-minus" data-step=""><span>'
		// 		+ '</li>'
		// );
		// $("#directions_step").val('');
		// //remove invalid entry class
		// $('#directions_step').removeClass('invalid-entry');
		// //increment step number
		// // Template.instance().step.set(Template.instance().step.get() + 1);
		// $('.sortable-directions').sortable('destroy');
		// $('.sortable-directions').sortable();

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

		var directionsCount = document.getElementById('directionsTable').getElementsByTagName('li').length;
		var ingredientsCount = document.getElementById('ingredients_list').getElementsByTagName('li').length;
		
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

		var directionsList = document.getElementById('directionsTable');
		var list = directionsList.getElementsByTagName('li');
		for(var i = 0; i < list.length; i++){
			var stepNumber = i + 1;
			var task = list[i].innerText;
			directions.push({
				step: stepNumber,
				task: task
			});
		}

		var ingredientsList = document.getElementById('ingredients_list');
		var list = ingredientsList.getElementsByTagName('li');
		
		for(var i = 0; i < list.length; i++){
			var name = '';
			var type = '';
			var amount = '';
			var spans = list[i].getElementsByTagName('span');
			for (var s = 0; s < spans.length; s++) {
				
				var id = spans[s].id;
				
				var value = spans[s].innerText;
				if(id === 'name'){
					name = value;
				}else if(id === 'amount'){
					amount = value;
				}else if(id === 'type'){
					type = value;
				}
			}
			var ing = {
				name: name,
				amount: amount,
				type: type
			}
			
			//add ingredient to array
			ingredients.push({
				name: name,
				type: type,
				amount: amount
			});
		}	
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
		if(validForm){
			Meteor.call('addOriginalRecipe', recipe);
		}
			
	},

	'click [name="removeTask"]': function(e){
		e.preventDefault();
		//remove the list item containing the span
		$(e.currentTarget).parent().remove();
		
		$('.sortable-directions').sortable('destroy');
		$('.sortable-directions').sortable();

	},
	'change [class="form-control invalid-entry"]': function(e){
		$(e.currentTarget).removeClass('invalid-entry');
	},
	'keypress [name="directions_step"]': function(e){
		//if this is the first letter of the first direction added
		//toggle the modal to check if the recipe calls use of the oven
		// var directionText = document.getElementById('directions_step').value.length;
		var directionsCount = document.getElementById('directionsTable').getElementsByTagName('li').length;
		if(directionsCount === 0 && usingOven){
			$('#degreeModal').modal('show');
		}

	},
	'hide.bs.modal #degreeModal': function(){
		usingOven = false;

	},
	'click [id="confirmTemp"]': function(){
		var temp = document.getElementById('tempDegree').value;
		//todo - add direction
		var task = 'Preheat oven to ' + temp + '&deg;';
		addTask(task);

	}

	//todo if typeing in the directions input
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
	getDirections: function(){
		var directionsArray = Template.instance().directions.get();
		var newArray = _.map(directionsArray, function(value, index){
			return {task: value, index: index + 1};
		});
		return newArray;
	}, displayDirection: function(){
		$("#directionsTable").append(
        
				'<li class="">'
				+ this.task
				+ '  <span name="removeTask" class="glyphicon glyphicon-minus" data-step="' + this.index + '"><span>'
				+ '</li>'
				);
	},
});



/*****************************************************************************/
/* AddRecipe: Lifecycle Hooks */
/*****************************************************************************/
Template.AddRecipe.created = function () {
	var instance = this;
	instance.directions = new ReactiveVar([]);
	instance.step = new ReactiveVar(1);
	usingOven = true;
	instance.subscribe('ingredients');
};

Template.AddRecipe.rendered = function () {
};

Template.AddRecipe.destroyed = function () {
};

