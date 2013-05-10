var convertToWords, _ref, _ref1;

convertToWords = function(str) {
  var obj, word, words, _i, _len;

  obj = {};
  words = str.split(" ");
  for (_i = 0, _len = words.length; _i < _len; _i++) {
    word = words[_i];
    obj[word] = true;
  }
  return obj;
};


function tokenString(quote) {
  return function(stream, state) {
    var multiLineStrings = false;
    var escaped = false, next, end = false;
    while ((next = stream.next()) != null) {
      if (next == quote && !escaped) {end = true; break;}
      escaped = !escaped && next == "\\";
    }
    if (end || !(escaped || multiLineStrings))
      state.tokenize = null;
    return "string";
  };
}
;

CodeMirror.defineMIME("objc", {
  name: 'clike',
  blockKeywords: convertToWords("@interface @implementation @end"),
  useCPP: true,
  atoms: convertToWords("true false TRUE FALSE YES NO NULL Nil nil BOOL SEL id IBOutlet IBAction weak strong #import atomic nonatomic"),
  keywords: convertToWords("@property @interface UIApplication self unichar IMP Class @selector class protocol @implementation @end auto if break int case long char register continue return default short do sizeof double static else struct entry switch extern typedef float union for unsigned void super NSInteger " + (['NSArray', 'NSArrayM', 'NSDictionary', 'NSLog', 'NSMutableArray', 'NSNumber', 'NSString', 'NSRange', 'Cake', 'NSObject', 'NSUInteger', '@selector']).join(' ')),
  hooks: {
    '#': function(stream, state) {
      if (!state.startOfLine) {
        return false;
      }
      stream.skipToEnd();
      return "meta";
    },
    "@": function(stream, state) {
      if (stream.eat('"')) {
        state.tokenize = tokenString('"');
        return state.tokenize(stream, state);
      }
      stream.eatWhile(/[\w\$_]/);
      return "keyword";
    }
  }
});
