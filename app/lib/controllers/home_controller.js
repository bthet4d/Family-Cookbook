HomeController = RouteController.extend({
  layoutTemplate: 'MasterLayout',

  subscriptions: function() {

  },
    waitOn: function(){

  },
  data: function(){
    
  },
  action: function() {
  	//this is reactive
  	//and reactive vars here will rerender when they change
  	//like a collection of a users favorite recipes
    this.render('Home');
    this.render('Conversations', {
      to: 'conversations'
    });
    this.render('DisplayPopular', {
      to: "popular"
    });
  }
});
