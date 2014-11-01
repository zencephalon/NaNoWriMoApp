if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Proses.find().count() === 0) {
      Proses._ensureIndex({url: 1}, {unique: true});
    }

    if (_Counts.find().count() === 0) {
      Counts.doCount();
    }

    Meteor.setInterval(function() {
      Counts.doCount();
    }, 1000*60*60*8); // every eight hours

    Prose.subscriptions();
    Branches.subscriptions();
    Meteor.publish("counts", Counts._publication_single);
    Meteor.publish("users", function() {
      return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
    })
  });
}
