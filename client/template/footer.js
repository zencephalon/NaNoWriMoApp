Template.footer.word_count = function() {
  if (count = Counts.doCount()) {
    return "Words to go<br>total: " + count.words_left + "<br>today: " + count.words_needed;
  }
}

Template.footer.prose_count = function() {
  if (count = Counts.doCount()) {
    return count.prose_count;
  }
}

Template.footer.content = function() {
  template = Prose.get("__footer_template__");
  if (template._id && template.getBranch()) {
    return template.getBranch().text;
  }
}