"use strict";var substringMatcher=function(a){return function(b,c){var d,e;d=[],e=new RegExp(b,"i"),$.each(a,function(a,b){e.test(b)&&d.push({value:b})}),c(d)}},universities=["Columbia University","New York University","Stony Brook University","City University of New York"],nameToLink={"Columbia University":"columbia","New York University":"nyu","Stony Brook University":"stony","City University of New York":"cuny"},appHost="http://app.roomhunter.us";$(document).ready(function(a){a(".university-typeahead").typeahead({hint:!0,highlight:!0,minLength:1},{name:"states",displayKey:"value",source:substringMatcher(universities)}),a("#search-btn").click(function(){window.location=appHost+"/#/li/"+nameToLink[a("#search-str").val()]})});