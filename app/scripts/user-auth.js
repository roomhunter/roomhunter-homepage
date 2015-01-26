'use strict';

var userAuth = {
  userLabelClicked: function () {
    $('#user-label').click(function () {
      var t = localStorage.getItem('userToken');
      var apiHost = 'https://api.roomhunter.us/';
      if (location.hostname !== 'roomhunter.us') {
        apiHost = 'http://121.199.3.126:1111/';
      }
      var req = {
        userToken: t
      }
    });
  },
  displayRegisterAndLogin: function () {
    $('.none-cached-user-info').css('display', 'block');
    $('.has-cached-user-info').css('display', 'none');
  },
  displayUserLabel: function () {
    var id = localStorage.getItem('userId'),
      name = localStorage.getItem('userFirstName'),
      avatar = localStorage.getItem('userAvatar'),
      userLabel = $('#user-label');
    $('.none-cached-user-info').css('display', 'none');
    $('.has-cached-user-info').css('display', 'block');
    userLabel.attr('href', 'app/#/user/' + id);
    userLabel.children('span').text('Hi, ' + name);
    userLabel.children('img').attr('src', avatar);
  },
  initAuthViewWithCachedInfo: function () {
    var t = localStorage.getItem('userToken');
    var id = localStorage.getItem('userId');
    var name = localStorage.getItem('userFirstName');
    var avatar = localStorage.getItem('userAvatar');

    if (t && name && avatar && id) {
      userAuth.displayUserLabel();
    }
    else {
      userAuth.displayRegisterAndLogin()
    }
  },
  registerButtonClicked: function () {
    $('#register').click(function () {
      $('#register-modal').modal('show');
    });
  },
  loginButtonClicked: function () {
    $('#login').click(function () {
      $('#login-modal').modal('show');
    });
  },
  registerFormSubmit: function () {
    $('#register-form').submit(function (e) {
      var email = $('#emailaddress').val();
      var pwd = $('#password').val();
      if (email == "" && pwd == "") {
        $('.form-group').addClass("has-error");
        e.preventDefault();
        $('#msg').show("slow").html("The above fields cannot be blank!");
        return;
      }
      else if (email == "") {
        $('#emailaddress').addClass("has-error");
        e.preventDefault();
        $('#msg').show("slow").html("Email address cannot be blank!");
        return;
      }
      else if (pwd == "") {
        $('#password').addClass("has-error");
        e.preventDefault();
        $('#msg').show("slow").html("Password cannot be blank!");
        return;
      }
      var end = email.split(".");
      if (end.length == 1) {
        $('#emailaddress').addClass("has-error");
        $('#msg').show("slow").html("Invalid email address!");
        e.preventDefault();
        return;
      }
      if (end[1] != "edu") {
        $('#emailaddress').addClass("has-error");
        $('#msg').show("slow").html("You must register with an .edu email address!");
        e.preventDefault();
        return;
      }
      ;
      <!-- use ajax to submit -->
      var postData = $('#register-form').serialize();
      $('.form-group').removeClass("has-error");
      e.preventDefault();
      $('#RegisterModal').modal('hide');
      $('#InformationModal1').modal('show');
    })
  },

  loginFormSubmit: function () {
    $('#login-form').submit(function (e) {
      var email = $('#emailaddress1').val();
      var pwd = $('#password1').val();
      if (email == "" && pwd == "") {
        $('.form-group').addClass("has-error");
        e.preventDefault();
        $('#msg2').show("slow").html("The above fields cannot be blank!");
        return;
      }
      else if (email == "") {
        $('#emailaddress').addClass("has-error");
        e.preventDefault();
        $('#msg2').show("slow").html("Email address cannot be blank!");
        return;
      }
      else if (pwd == "") {
        $('#password').addClass("has-error");
        e.preventDefault();
        $('#msg2').show("slow").html("Password cannot be blank!");
        return;
      }
      $.ajax({
        cache: true,
        type: post,
        url: $('login-form').attr("action"),
        data: postData,
        dataType: json,
        success: function (data) {
          $('.oldLink').hide();
          location.reload();
          $('.newLink').find('a').attr("href", "/profile?username=" + username).html(username);
          $('.newLink').show();
        },
        error: function () {
          alert("aa");
        }

      })
    })
  },
  profileFormSubmit: function () {
    $('#personal-form-1').submit(function (e) {
      var first = $('#firstname').val();
      var last = $('#lastname').val();
      var uni = $('university').val()
      if (first == "" && last == "") {
        $('.form-group').addClass("has-error");
        e.preventDefault();
        $('#msg3').show("slow").html("The above fields cannot be blank!");
        return;
      }
      else if (first == "") {
        $('#firstname').addClass("has-error");
        e.preventDefault();
        $('#msg3').show("slow").html("First name cannot be blank!");
        return;
      }
      else if (last == "") {
        $('#lastname').addClass("has-error");
        e.preventDefault();
        $('#msg3').show("slow").html("Last name cannot be blank!");
        return;
      }
      $.ajax({
        cache: true,
        type: post,
        url: $('information-form-1').attr("action"),
        data: postData,
        dataType: json,
        success: function (data) {
          location.reload();
        },
        error: function () {
          alert("aa");
        }

      })
    })

  }
};


