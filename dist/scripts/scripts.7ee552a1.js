"use strict";$(document).ready(function(){weixinLogin.initialization(),userAuth.initAuthViewWithCachedInfo(),userAuth.userLabelClicked(),langSwitch.initLang(),langSwitch.buttonClicked(),schoolInput.typeAhead(),schoolInput.formSubmit(),helpContact.showHideDropdown(),userAuth.loginButtonClicked(),userAuth.forgetPwdButtonClicked(),userAuth.loginFormSubmit(),userAuth.logOut(),userAuth.forgetPwdFormSubmit(),userAuth.noAccountButtonClicked()});var video1=document.getElementsByTagName("video")[0];video1.waiting=function(){video1.stop(),video1.progress=function(){if(!(video1.buffered.length<1)){var a=video1.buffered.end(0)/video1.duration;a>.3&&(video1.play(),video1.removeEventListener("progress"))}}};var langSwitch={toEn:function(){$(".zh").addClass("hidden"),$(".en").removeClass("hidden"),$(".en").removeClass("invisible"),$("title").text("Apartment Hunting"),$("#search-str").attr("placeholder","I will go to..."),$("#login-submit").attr("value","Login"),$("#forgetPwd-submit").attr("value","发送邮件"),schoolInput.init("unable to find any schools matching current query")},toZh:function(){$(".en").addClass("hidden"),$(".zh").removeClass("hidden"),$(".zh").removeClass("invisible"),$("title").text("美国留学租房"),$("#search-str").attr("placeholder","输入学校查找附近住房"),$("#login-submit").attr("value","登录"),$("#forgetPwd-submit").attr("value","帮我重设"),schoolInput.init("无法找到匹配的学校")},initLang:function(){var a=localStorage.getItem("userLang");a||(a=navigator.languages?navigator.languages[0]:navigator.language||navigator.userLanguage),"en-US"===a||"en"===a?(localStorage.setItem("userLang","en"),this.toEn()):(localStorage.setItem("userLang","zh"),this.toZh())},buttonClicked:function(){$("#switch-zh").click(function(a){a.preventDefault(),localStorage.setItem("userLang","zh"),langSwitch.toZh()}),$("#switch-en").click(function(a){a.preventDefault(),localStorage.setItem("userLang","en"),langSwitch.toEn()})}},helpContact={showHideDropdown:function(){var a=$(".help-dropdown");$(".help-contact").mouseenter(function(){a.css("display","block")}).mouseleave(function(){a.css("display","none")}).click(function(){a.toggle()})}},substringMatcher=function(a){return function(b,c){var d,e;d=[],e=new RegExp(b,"i"),$.each(a,function(a,b){e.test(b)&&d.push({value:b,img:universityMap[b].img})}),c(d)}},universityMap={"Columbia University":{token:"columbia",img:"https://roomhunter-images.b0.upaiyun.com/apartments/030972072134d06caef7867d83ca027c.jpeg"},"New York University":{token:"nyu",img:"https://roomhunter-images.b0.upaiyun.com/apartments/35ad361d583743f33bbe0b276a84a142.jpg"},"Stony Brook University":{token:"stony",img:"https://roomhunter-images.b0.upaiyun.com/apartments/44291985f3ea88a843917730ce6537e2.jpeg"},"City University of New York":{token:"cuny",img:"https://roomhunter-images.b0.upaiyun.com/apartments/9ac2e000c2e38fe7b16af83874292d62.png"}},schoolInput;schoolInput={formSubmit:function(){$("#query-form").submit(function(a){var b=$("#search-str").val(),c=universityMap[b].token;return c?(a.preventDefault(),localStorage.setItem("toSchool",b),void(window.location="app/#/list/"+c)):!1})},compileTemplate:function(a){return'<img width="26" src="'+a.img+'"><span>'+a.value+"</span>"},init:function(a){$("#search-str").typeahead("destroy");var b=$("#search-str").typeahead({hint:!0,highlight:!0,minLength:0},{name:"schools",displayKey:"value",source:substringMatcher(Object.keys(universityMap)),templates:{empty:['<div class="tt-empty-message text-muted">','<i class="icon-frown"></i>',a,"</div>"].join("\n"),suggestion:schoolInput.compileTemplate}});return b},typeAhead:function(){var a=$("#search-str");a.on("typeahead:selected",function(){var a=$("#search-str").val(),b=universityMap[a].token;return b?(localStorage.setItem("toSchool",a),void(window.location="app/#/list/"+b)):!1}).on("typeahead:cursorchanged",function(){console.log($("#search-str").val()),console.log("autocomplete");var a=$("#search-btn");a.removeClass("disabled")}).on("typeahead:closed",function(){var a=$("#search-str").val(),b=$("#search-btn"),c=universityMap[a];c?(console.log("valid"),b.removeClass("disabled")):(console.log("invalid"),b.addClass("disabled")),""===a&&langSwitch.initLang()}),a.keyup(function(){var a=$("#search-str").val(),b=$("#search-btn"),c=universityMap[a];c?(console.log("valid"),b.removeClass("disabled")):(console.log("invalid"),b.addClass("disabled"))}),a.click(function(){var b=a.typeahead("val");""===b&&(a.typeahead("val","c"),a.typeahead("val",""),a.attr("placeholder",""))})}};var userAuth={apiHost:function(){return"roomhunter.us"===location.hostname?"https://api.roomhunter.us/v1":"https://test.roomhunter.us:3100/v1/"},userLabelClicked:function(){$("#user-label").click(function(){localStorage.getItem("userToken")})},displayRegisterAndLogin:function(){$(".none-cached-user-info").css("display","block"),$(".has-cached-user-info").css("display","none")},displayUserLabel:function(){var a=(localStorage.getItem("userId"),localStorage.getItem("firstName")),b=localStorage.getItem("userAvatar"),c=$("#user-label");$(".none-cached-user-info").css("display","none"),$(".has-cached-user-info").css("display","block"),c.children("span").text(a),c.children("img").attr("src",b+"!userSmallAvatar")},initAuthViewWithCachedInfo:function(){var a=localStorage.getItem("userToken"),b=localStorage.getItem("userId"),c=localStorage.getItem("firstName"),d=localStorage.getItem("userAvatar");a&&c&&d&&b?userAuth.displayUserLabel():userAuth.displayRegisterAndLogin()},loginButtonClicked:function(){$("#login").click(function(a){a.preventDefault(),$("#login-modal").modal("show"),$("#msg").hide("fast"),$(".form-group").removeClass("has-error"),$(".register-related").addClass("hidden"),$(".login-related").removeClass("hidden")})},forgetPwdButtonClicked:function(){$("#forgetPwd").click(function(a){a.preventDefault(),$("#login-modal").modal("hide"),$("#forgetPwd-modal").modal("show"),$(".form-group").removeClass("has-error")})},noAccountButtonClicked:function(){$("#no-account").click(function(a){a.preventDefault(),$("#msg").hide("fast"),$(".form-group").removeClass("has-error"),$(".login-related").addClass("hidden"),$(".register-related").removeClass("hidden")})},emailRegex:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,loginFormSubmit:function(){$("#login-form").submit(function(e){e.preventDefault(),$(".form-group").removeClass("has-error"),$("#msg").hide("fast");var host_url=userAuth.apiHost()+"users/login",email=$("#emailaddress").val(),pwd=$("#password").val();if(""==email&&""==pwd)return $(".form-group").addClass("has-error"),void $("#msg").show("slow").html("The following fields cannot be blank!");if(!userAuth.emailRegex.test(email))return $(".email-form-group").addClass("has-error"),void $("#msg").show("slow").html("Invalid email address!");if(""==pwd)return void $("#msg").show("slow").html("Password cannot be blank!");$(".button-loading-img").removeClass("invisible");var postData_login=$("#login-form").serialize();$.ajax({cache:!0,type:"POST",url:host_url,data:postData_login,dataType:"json",success:function(data){$(".button-loading-img").addClass("invisible");var obj=eval(data.data);localStorage.setItem("userToken",obj.userToken),localStorage.setItem("userId",obj.userId),localStorage.setItem("firstName",obj.firstName),localStorage.setItem("userAvatar",obj.userAvatar),$(".none-cached-user-info").hide(),$("#user-name").text(obj.firstName),$("#user-avatar").attr("src",obj.userAvatar+"!userSmallAvatar"),$(".has-cached-user-info").show(),$("#login-modal").modal("hide")},error:function(){$(".button-loading-img").addClass("invisible")}})})},logOut:function(){$("#logout").click(function(a){a.preventDefault();var b=localStorage.getItem("userToken");localStorage.removeItem("userToken"),localStorage.removeItem("userId"),localStorage.removeItem("userAvatar"),localStorage.removeItem("firstName"),$(".has-cached-user-info").hide(),$(".none-cached-user-info").show();var c={userToken:b};$.ajax({cache:!0,type:"GET",url:userAuth.apiHost()+"users/logout",data:c,dataType:"JSON",success:function(a){200==a.error.code&&console.log("success")},error:function(){console.log("error")}})})},forgetPwdFormSubmit:function(){$("#forgetPwd-form").submit(function(a){a.preventDefault();var b=userAuth.apiHost()+"users/forget-pwd";$(".button-loading-img").removeClass("invisible"),$.ajax({cache:!0,type:"GET",url:b,data:$("#forgetPwd-form").serialize(),dataType:"json",success:function(){$(".button-loading-img").addClass("invisible"),$("#forgetPwd-modal").modal("hide"),$("#alertMessage").show(),setTimeout("$('#alertMessage').hide()",5e3)},error:function(){console.log("error"),$(".button-loading-img").addClass("invisible")}})})}},weixinLogin={initialization:function(){var a="wxc685011a4fb095bd",b="https://test.roomhunter.us",c=userAuth.apiHost()+"users/wechat/login",d="https://test.roomhunter.us/styles/wechat-related.css";new WxLogin({id:"wechat-login-2D-code",appid:a,scope:"snsapi_login",redirect_uri:encodeURIComponent(b),state:"",style:"black",href:d}),$("iframe").each(function(){$(this).css("height","300px")});var e=function(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),c=window.location.search.substr(1).match(b);return null!=c?decodeURIComponent(c[2]):null},f=e("code");if(null!=f){var g={code:f};$.ajax({cache:!0,type:"GET",url:c,data:g,dataType:"json",success:function(a){var b=a.data;localStorage.setItem("userId",b.userId),localStorage.setItem("userAvatar",b.userAvatar),localStorage.setItem("userToken",b.userToken),localStorage.setItem("firstName",b.firstName);var c=$("#user-label").attr("href");$("#user-label").attr("href",c+b.userId),$("#user-name").text(b.firstName),$("#user-avatar").attr("src",b.userAvatar+"!userSmallAvatar"),$(".has-cached-user-info").show(),$("#register").hide(),$("#login").hide(),201==a.error.code&&($("#alertMessageToRegister").show(),setTimeout("window.location.href='https://test.roomhunter.us/app/#/user/register-remaining-info'",3e3))},error:function(){console.log("error")}})}else console.log("no code here")}};