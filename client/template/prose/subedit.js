Template.prose_subedit.events({
  'keypress': function(e) {
    var target = $(e.target);

    var timer = Session.get("autosave_timer");
    target.removeClass("saved");

    if (timer !== undefined) {
      clearTimeout(timer);
    }

    Session.set("autosave_timer", setTimeout(function() {
      target.addClass("saved");
      Editor.saveProse(e.target);
    }, 1500));
  },
  'select, mouseup, keyup': function(e) {
    var target = $(e.target);
    var selection = target.getSelection();
    if (selection !== undefined) {
      Meteor.subscribe("branches_by_url", selection.text);
    }
  }
});

Template.prose_subedit.helpers({
  wordcount: function(branch) {
    today_count = Counts.getCount(branch.text);
    count = Counts.doCount();
    if (branch) {
      return "<hr><footer>today: <span class='standout'>" + today_count + "</span>, today left: <span class='standout'>" + (count.words_needed - today_count) + "</span>, total left: <span class='standout'>" + count.words_left + "</span></footer>";
    }
  }
});

Template.prose_subedit.rendered = function() {
  //$(".placeholder").replaceWith(Blaze.toHTML(Blaze.With(this.data, function() { return Template.textarea; })))

  $(document).ready(function() {
    $("textarea").autosize();
    View.autosize();
  });
}