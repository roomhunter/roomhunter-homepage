"use strict";var substringMatcher=function(a){return function(b,c){var d,e;d=[],e=new RegExp(b,"i"),$.each(a,function(a,b){e.test(b)&&d.push({value:b})}),c(d)}},universityMap={"Columbia University":"columbia","New York University":"nyu","Stony Brook University":"stony","City University of New York":"cuny"},appHost="http://app.roomhunter.us";"roomhunter.us"!==location.hostname&&"www.roomhunter.us"!==location.hostname&&(appHost="http://"+location.hostname+":2001"),$(document).ready(function(a){var b=a("#search-str").typeahead({hint:!0,highlight:!0,minLength:1},{name:"schools",displayKey:"value",source:substringMatcher(Object.keys(universityMap)),templates:{empty:['<div class="tt-empty-message text-muted">','<i class="fa fa-frown-o"></i>',"unable to find any schools matching current query","</div>"].join("\n")}});b.on("typeahead:selected",function(){console.log("autocomplete");var b=a("#search-btn");b.removeClass("disabled")}).on("typeahead:cursorchanged",function(){console.log(a("#search-str").val()),console.log("autocomplete");var b=a("#search-btn");b.removeClass("disabled")}).on("typeahead:closed",function(){var b=a("#search-str").val(),c=a("#search-btn"),d=universityMap[b];d?(console.log("valid"),c.removeClass("disabled")):(console.log("invalid"),c.addClass("disabled"))}),b.keyup(function(){var b=a("#search-str").val(),c=a("#search-btn"),d=universityMap[b];d?(console.log("valid"),c.removeClass("disabled")):(console.log("invalid"),c.addClass("disabled"))}),a("#query-form").submit(function(b){var c=a("#search-str").val(),d=universityMap[c];return d?(b.preventDefault(),void(window.location=appHost+"/#/li/"+d)):!1}),a("a.popular-university-container").click(function(b){b.preventDefault(),window.location=appHost+a(this).attr("href")})});