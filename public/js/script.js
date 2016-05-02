/*
** QuestLogger created by Rafael De Jongh, Inias Van Ingelgom, Evelyne Vas Esbroeck and Nico Bosmans.
** This webapplication is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
**/
"use strict";
/*Global Variables
------------------*/
var app = angular.module('QuestLogger', []);
var nDate = new Date();
var hours = nDate.getHours();
var minutes = nDate.getMinutes();
var seconds = nDate.getSeconds();
/*Current Year
------------------*/
app.controller('yearC',function($scope){$scope.cDate = nDate.getFullYear();});
/*Clock
------------------*/
app.controller('clock', function ($scope) {
  $scope.clock = {clock:nDate};
    var updateClock = function(){
		$scope.clock.now = (new Date().getHours()<10?'0':'') + new Date().getHours() + ':' + (new Date().getMinutes()<10?'0':'') + new Date().getMinutes() + ':' + (new Date().getSeconds()<10?'0':'') + new Date().getSeconds();};
    setInterval(function(){$scope.$apply(updateClock);},500);
    updateClock();
});
/*ToDoList
------------------*/
app.controller('toDoC', function ($scope) {
    $scope.todos = [];
    $scope.markAll = false;
    //addToDo
    $scope.addTodo = function() {
        if($scope.todoText){
            $scope.todos.push({text:$scope.todoText, done:false});
            $scope.todoText = "";
        }
    };
    $scope.isTodo = function(){
      return $scope.todos.length > 0;  
    };
    //Toggle Edit Mode
    $scope.toggleEditMode = function(){
      $(event.target).closest('li').toggleClass('editing');
    };
    //Edit
    $scope.editOnEnter = function(todo){
      if(event.keyCode == 13 && todo.text){
          $scope.toggleEditMode();
      }
    };
    //Remaining
    $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
        });
        return count;
    };
    //isDone
    $scope.hasDone = function() {
      return ($scope.todos.length != $scope.remaining());
    };
    //itemText
    $scope.itemText = function() {
      return ($scope.todos.length - $scope.remaining() > 1) ? "items" : "item";     
    };
    //ToggleAll
    $scope.toggleMarkAll = function() {
      angular.forEach($scope.todos, function(todo) {
        todo.done =$scope.markAll;
      });
    };
    //Clear
    $scope.clear = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
          if (!todo.done) $scope.todos.push(todo);
        });
    };
});
/*Switches
------------------*/
app.controller('secondsSwitch', function ($scope) {
    $scope.secondsSwitch = "on";
    $scope.$watch('secondsSwitch', function () {
        if ($scope.secondsSwitch == "off") {
            //Remove seconds
            $("time").addClass("none");
        } else {
            //Add seconds
            $("time").removeClass("none");
        }
    });
});
/*Hash URL Check
------------------*/
$(document).ready(function() {
    if(window.location.hash == "#avatar"){$("#avatar").removeClass("none")}
    if(window.location.hash == "#addlist"){$("#addlist").removeClass("none")}
    if(window.location.hash == "#lists"){$("#lists").removeClass("none")}
    if(window.location.hash == "#styles"){$("#styles").removeClass("none")}
    if(window.location.hash == "#settings"){$("#settings").removeClass("none")}
    if(window.location.hash == "#about"){$("#about").removeClass("none")}
});
/*Jquery
------------------*/
$(function(){
    $(".content").draggable({containment:"main",scroll:false}).resizable({containment:"main"});
    $("a.close").closest("a.close").click(function(){$(this).closest(".content").addClass("none")});
	$("a.maximize").closest("a.maximize").click(function(){
		$(this).addClass("none").closest(".content").addClass("maximized");
		$("a.minimize").closest("a.minimize").removeClass("none");
	});
	$("a.minimize").closest("a.minimize").click(function(){
		$(this).closest(".content").removeClass("maximized");
		$("a.minimize").closest("a.minimize").addClass("none");
		$("a.maximize").closest("a.maximize").removeClass("none");
	});
    $("nav a").click(function(){$($(this).attr("href")).removeClass("none").siblings(".content").addClass("none");});
});
/*StyleChanger
------------------*/
app.controller("styles", function($scope){
    $scope.style = [
        {
            name: 'Into The Woods',
            img: 'images/backgrounds/intoTheWoodsDay.png',
            version: 'Day',
            class: 'theme1'
        },
        {
            name: 'Into The Woods',
            img: 'images/backgrounds/intoTheWoodsEvening.png',
            version: 'Evening',
            class: 'theme1'
        },
        {
            name: 'Into The Woods',
            img: 'images/backgrounds/intoTheWoodsNight.png',
            version: 'Night',
            class: 'theme1'
        },
        {
            name: 'The Raging Hills',
            img: 'images/backgrounds/theRagingHillsDay.png',
            version: 'Day',
            class: 'theme2'
        },
        {
            name: 'The Raging Hills',
            img: 'images/backgrounds/theRagingHillsEvening.png',
            version: 'Evening',
            class: 'theme2'
        },
        {
            name: 'The Raging Hills',
            img: 'images/backgrounds/theRagingHillsNight.png',
            version: 'Night',
            class: 'theme2'
        },
        {
            name: 'Elegancy',
            img: 'images/backgrounds/theCalmingBeachDay.png',
            version: 'Day',
            class: 'theme3'
        },
        {
            name: 'Elegancy',
            img: 'images/backgrounds/theCalmingBeachEvening.png',
            version: 'Evening',
            class: 'theme3'
        },
        {
            name: 'Elegancy',
            img: 'images/backgrounds/theCalmingBeachNight.png',
            version: 'Night',
            class: 'theme3'
        },
        {
            name: 'Retrowave',
            img: 'images/backgrounds/RetrowaveDay.png',
            version: 'Day',
            class: 'theme4'
        },
        {
            name: 'Retrowave',
            img: 'images/backgrounds/RetrowaveEvening.png',
            version: 'Evening',
            class: 'theme4'
        },
        {
            name: 'Retrowave',
            img: 'images/backgrounds/RetrowaveNight.png',
            version: 'Night',
            class: 'theme4'
        }
    ]
})
$(function(){
   $(".theme img").click(function(){
      var myClass = $(this).attr("class");
      $(".theme img").removeClass("currentTheme");
      $(this).closest("img").addClass("currentTheme");
      $("body").removeClass("currentTheme theme1 theme2 theme3 theme4 kcode");
      $("body").addClass(myClass).removeClass("currentTheme");
    }); 
});
/*Day-NightCycle
------------------*/
$(function(){
        if(hours >= 7 && hours < 17){
            $("body").removeClass("night evening");
            $("body").addClass("day");
            $(".theme .theme1").attr("src", "images/backgrounds/intoTheWoodsDay.png");
            $(".theme .theme2").attr("src", "images/backgrounds/theRagingHillsDay.png");
            $(".theme .theme3").attr("src", "images/backgrounds/theCalmingBeachDay.png");
            $(".theme .theme4").attr("src", "images/backgrounds/RetrowaveDay.jpg");
        }else if(hours >= 17 && hours <= 20){
            $("body").removeClass("day night");
            $("body").addClass("evening");
            $(".theme .theme1").attr("src", "images/backgrounds/intoTheWoodsEvening.png");
            $(".theme .theme2").attr("src", "images/backgrounds/theRagingHillsEvening.png");
            $(".theme .theme3").attr("src", "images/backgrounds/theHowlingDesertEvening.png");
            $(".theme .theme4").attr("src", "images/backgrounds/RetrowaveEvening.jpg");
        }else{
            $("body").removeClass("day evening");
            $("body").addClass("night");
            $(".theme .theme1").attr("src", "images/backgrounds/intoTheWoodsNight.png");
            $(".theme .theme2").attr("src", "images/backgrounds/theRagingHillsNight.png");
            $(".theme .theme3").attr("src", "images/backgrounds/theSilentMoonNight.png");
            $(".theme .theme4").attr("src", "images/backgrounds/RetrowaveNight.jpg");
        }
});
/*EasterEggs
------------------*/
var kkeys = [], kcode = "38,38,40,40,37,39,37,39,66,65";
$(document).keydown(function(e) {
  kkeys.push(e.keyCode);
  if (kkeys.toString().indexOf( kcode ) >= 0 ){
    $(document).unbind('keydown',arguments.call);
	//window.open('http://games.freearcade.com/Contra.flash/ContraFlash.swf', '_blank');
	//Add code here to do something fun!
    $("body").removeClass("theme1 theme2 theme3 theme4 day");
    $("body").addClass("night kcode");
  }
});