# kanji-levels.js
### See code in use and check kanji levels of text with [Kanji Level Check](https://cantrellnm.github.io/kanji-levels/).

- parse text for Japanese kanji
- see the jōyō grade, JLPT level, and WaniKani level of each kanji
- determine readability of Japanese text based on grade/level of kanji
- count number of times a kanji is used, find most frequently used kanji
- filter kanji by category (jōyō, jinmeiyō, hyōgai) or level

---
## `Kanji` Object

`Kanji()` returns a kanji object when given a single-character String that (according to its UTF-8 code) is Japanese kanji. Otherwise returns `undefined`.

Examples:
```javascript
// returns object when given single kanji character
Kanji("会");
// -> Object {...}

// returns undefined when given more than one character
Kanji("文字");
// -> undefined

// returns undefined if character is not kanji
Kanji("の");
// -> undefined
```

The returned object has the following attributes:

| attribute   | values                       | description                                                                                                                                                                       |
|-------------|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `character`   | single-character String      | the kanji character that defines the object                                                                                                                                       |
| `category`    | "jōyō", "jinmeiyō", "hyōgai" | describes if kanji character is part of the list of common kanji taught in school ("jōyō"), used in names and is not jōyō ("jinmeiyō"), or is neither and more obscure ("hyōgai") |
| `joyo` | 1, 2, 3, 4, 5, 6, 9, undefined          | indicates the school year in which the kanji are taught in Japan (grade 9 includes all jōyō kanji not in the kyōiku list of grades 1-6)                                                  |
| `jlpt`   | "N5", "N4", "N3", "N2", "N1", undefined | indicates lowest level JLPT examination in which the kanji should be known                                                                                                        |
| `wk`     | 1..60, undefined                         | indicates at which level the kanji is taught by WaniKani

The object will return its `character` when the `toString()` method is called.

---

## `KanjiCollection` Object

`KanjiCollection()` returns a kanjicollection object when given a String of text that contains kanji. Otherwise returns `undefined`.

Examples:
```javascript
// returns object when given String containing kanji
KanjiCollection("自分を信じて。");
// -> Object {...}

// returns undefined when given String without kanji
KanjiCollection("おはよう！");
// -> undefined
```

`KanjiCollection.all` is a kanjicollection object containing **all 2998 jōyō and jinmeiyō kanji**.

The returned object has the following attributes:

| attribute  | value | description                                                                |
|------------|--------|----------------------------------------------------------------------------|
| `collection` | Array  | an array of kanji objects ordered by appearance in text, kanji can repeat  |

The object has the following methods:

| method          | parameters                 | returns                      | description                                                                                                                                                         |
|-----------------|----------------------------|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `unique`          | -                          | Array                        | an array of unique kanji objects ordered by appearance in text                                                                                                      |
| `count`           | single-kanji String        | Number                       | count the number of times a kanji appears in collection                                                                                                             |
| `countTotal`      | -                          | Number                       | returns `this.collection.length`                                                                                                                                    |
| `countUnique`     | -                          | Number                       | returns `this.unique().length`                                                                                                                                      |
| `mostFrequent`    | Number                     | Object                        | sorts `this.collection` by frequency of kanji, returns object with count and characters of kanji ranked by frequency                                                                         |
| `highestWk`       | -                          | 1..60                        | returns WaniKani level of kanji with highest                                                                                                                        |
| `highestJoyo`   | -                          | 1, 2, 3, 4, 5, 6, 9          | returns Jōyō grade of kanji with highest                                                                                                                            |
| `highestJlpt`     | -                          | "N5", "N4", "N3", "N2", "N1" | returns JLPT level of kanji with highest                                                                                                                            |
| `percentReadable` | {digits, wk, joyo, jlpt} | 'Number%'                    | takes given WaniKani/Jōyō/JLPT level(s) and returns percent of kanji in collection that can be read at that level, to decimal precision of `digits` (defaults to 0 digits after decimal) |
| `filterMax`       | {wk, joyo, jlpt}         | Object                       | returns a kanjicollection object that is filtered to contain only kanji with levels below or equal to given arguments                                               |
| `filterMin`       | {wk, joyo, jlpt}         | Object                       | returns a kanjicollection object that is filtered to contain only kanji with levels above or equal given arguments                                                  |
| `filterEqual`     | {wk, joyo, jlpt}         | Object                       | returns a kanjicollection object that is filtered to contain only kanji with levels equal to given arguments                                                        |
| `filterCategory`  | category String            | Object                       | returns a kanjicollection object that is filtered to contain only kanji of given category                                                                           |
