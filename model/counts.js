_Counts = new Meteor.Collection("counts");

Counts = {
  get : function() {
    return _Counts.findOne({}, {sort: {time: -1}});
  },
  getCount : function(text) {
    var regex = /\s+/gi;
    return text.trim().replace(regex, ' ').split(' ').length;
  },
  _publication_single : function() {
    return _Counts.find({},{sort: {time: -1}, limit: 1});
  },
  doCount : function() {
    var words = 0;
    var proses = 0;
    Proses.find().forEach(function (prose) {
      prose = new Prose(prose);
      branch = prose.getBranch();
      if (branch) {
        words += Counts.getCount(branch.text);
      }
      proses++;
    });
    days_left = 30 - (new Date()).getDate();
    words_left = 50000 - words;
    words_needed = Math.ceil(words_left / days_left);
    return {prose_count: proses, word_count: words, time: new Date(), words_left: words_left, days_left: days_left + 1, words_needed: words_needed};
  }
}