TestCollection = new Meteor.Collection('test_collection');
  TestCollection.allow({
    insert: function (userId) {
      console.log(userId);
      return true;
    },
// update: function (userId, doc, fieldNames, modifier) {
    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });