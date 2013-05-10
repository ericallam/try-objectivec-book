$(function(){
  _.each($('.exercise-objective pre'), function(el) {
    var syntax, text, theme;

    if ($(el).data('syntax')) {
      text = $(el).text();
      syntax = $(el).data('syntax');
      CodeMirror.runMode(text, syntax, el);
      $(el).addClass('CodeMirror');
      return $(el).addClass("cm-s-ios");
    }
  });
});
