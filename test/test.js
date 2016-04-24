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

test('KanjiCollection() with string including kanji', function(t) {
  var coll = KanjiCollection('自分を信じて。');
  t.equal(typeof coll, 'object', 'returns object');
  t.end();
});

test('KanjiCollection() with string without kanji', function(t) {
  var coll = KanjiCollection('foobar おはよう！');
  t.equal(coll, undefined, 'returns undefined');
  t.end();
});

test('KanjiCollection instance methods', function(t) {
  var coll = KanjiCollection('自分を信じて。大丈夫、出来ますよ。本当さ。信じた方がいいぜ。自分を信じて。');
  t.equal(coll.countTotal(), 15, 'countTotal() returns correct number');
  t.equal(coll.countUnique(), 11, 'countUnique() returns correct number');
  t.equal(coll.count('自'), 2, 'count(kanji) returns correct number');

  t.equal(typeof coll.mostFrequent(), 'object', 'mostFrequent() returns array');
  t.equal(coll.mostFrequent()[1].kanji[0], Kanji('信').character, 'mostFrequent() returns object with correct 1st-place kanji');
  t.equal(coll.mostFrequent(3)[2].kanji.length, 2, 'mostFrequent(3) returns 2nd-place object with 2 kanji');

  t.equal(coll.highestWk(), 15, 'highestWk() returns correct level');
  t.equal(coll.highestJoyo(), 9, 'highestJoyo() returns correct grade');
  t.equal(coll.highestJlpt(), 'N3', 'highestJlpt() returns correct level');

  t.equal(coll.percentReadable({wk:5, digits:2}), '66.67%', 'percentReadable({wk: 5, digits:2}) returns correct value');

  t.equal(coll.filterMax({wk:5}).countTotal(), 10, 'filterMax({wk:5}) returns object with collection of correct size');
  t.equal(coll.filterMin({wk:5}).countTotal(), 9, 'filterMin({wk:5}) returns object with collection of correct size');
  t.equal(coll.filterEqual({wk:5}).countTotal(), 4, 'filterEqual({wk:5}) returns object with collection of correct size');

  t.equal(coll.filterCategory('joyo').countTotal(), 15, 'filterCategory(jouyou) returns object with collection of correct size');
  t.end();
});
