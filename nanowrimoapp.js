if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.writing_area.helpers({
    userProse: function() {
      prose = Proses.findOne({uid: Meteor.userId()});
      if (prose) {
        return prose;
      }
    }
  });

  var autosaveTimeout;

  Template.writing_area.events({
    'keypress textarea': function(event) {
      $(event.target).addClass('unsaved');
      if (autosaveTimeout) {
        clearTimeout(autosaveTimeout);
      }
      autosaveTimeout = setTimeout(function() {
        Proses.update($(event.target).data('id'), {"$set": {text: $(event.target).val()}});
        $(event.target).removeClass('unsaved');
      }, 700);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
