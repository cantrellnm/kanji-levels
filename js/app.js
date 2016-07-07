var app = angular.module('LevelApp', []);

app.value('KanjiCollection', KanjiCollection);

app.controller('AppController', function($scope) {
  $scope.inputText = '';
  $scope.collection;
  $scope.mostFrequent;
  $scope.joyoGrades = [1,2,3,4,5,6,9];
  $scope.jlptLevels = ["N5", "N4", "N3", "N2", "N1"];
  $scope.wkLevels = [];

  for (var i=1; i<61; i++) {
    $scope.wkLevels.push(i);
  }

  $scope.parseText = function() {
    $scope.collection = KanjiCollection($scope.inputText);
    if ($scope.collection) {
      $scope.mostFrequent = $scope.collection.mostFrequent(1);
    }
  };

  $scope.percent = function(type, level) {
    var opt = {};
    opt[type] = level;
    return parseInt($scope.collection.percentReadable(opt)) / 100;
  };
});
