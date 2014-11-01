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

Meteor.methods({updateWordCount: function () {
   this.unblock();
   var result = Meteor.http.call('PUT', 'http://nanowrimo.org/api/wordcount', {params: {hash: "43c0fcaa26b2a3820d99f292c3a001676a096775", name: 'Zencephalon', wordcount: 46}});
   if (result.statusCode === 200) return true
   return false;
}}); 