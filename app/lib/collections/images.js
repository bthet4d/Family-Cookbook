if(Meteor.isServer){
	var imageStore = new FS.Store.S3("images",{
		accessKeyId: Meteor.settings.AWSAccessKeyId,
		secretAccessKey: Meteor.settings.AWSSecretAccessKey,
		bucket: Meteor.settings.AWSBucket
	});

	Images = new FS.Collection("Images", {
		stores: [imageStore],
		filter: {
			allow: {
				contentTypes: ['image/*']
			}
		}
	});
}

if(Meteor.isClient){
	var imageStore = new FS.Store.S3("images");
	Images = new FS.Collection("Images",{
		stores: [imageStore],
		filter: {
			allow: {
				contentTypes: ['image/*']
			},
			onInValid: function(message){
				console.log(message);
			}
		}
	});
}

Images.allow({
	insert: function(){return true;},
	update: function(){return true;},
	download: function(){return true;}
});