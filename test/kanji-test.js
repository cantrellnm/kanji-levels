require('../kanji-levels')();
var test = require('tape');

test('Kanji() given kanji character', function(t) {
  var kanji = Kanji('右');
  t.equal(typeof kanji, 'object', 'returns object');
  t.equal(kanji.character, '右', 'correct .character value');
  t.equal(kanji.category, 'jōyō', 'correct .category value');
  t.equal(kanji.toString(), '右', 'calling toString() returns .character')
  t.end();
});

test('Kanji() given incorrect arguments', function(t) {
  t.equal(Kanji('平右'), undefined, 'multiple characters return undefined');
  t.equal(Kanji('の'), undefined, 'Japanese kana returns undefined');
  t.equal(Kanji('f'), undefined, 'English character return undefined');
  t.equal(Kanji(42), undefined, 'Number returns undefined');
  t.end();
});
