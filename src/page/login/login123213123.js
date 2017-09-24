// var cookie = new cookies();
// 手机号码监控
$(".login-phone").on("input propertychange", function () {
  var val_mobile = $(this).val();

  if (val_mobile.length != 0) {
    $(".code").removeClass("btn-dis");
  } else {
    $(".code").addClass("btn-dis");
  }

});
// 获取验证码
$('.code').click(function () {
  var smobile = $(".login-phone").val();
  var phoneRule = /^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$/;
  if (!phoneRule.test(smobile)) {
    common.toast('请输入正确的手机号');
    return false;
  } else {
    sendcode(smobile);
  }
})
// 手机验证码监控
$(".login-code").on("input propertychange", function () {
  var phoneRule = /^\d{4}$/;
  var code_val = $(this).val();
  if (code_val.length === 4) {
    $('.login-btn input').removeClass('btn-dis');
  } else {
    $('.login-btn input').addClass('btn-dis');
  }
});
// 登陆事件
$('.sure-login-button').click(function () {
  login_web($('.login-phone').val(), $('.login-code').val());
});
// 发送手机验证码
function sendcode(mobile) {
  var phoneRule = /^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$/;
  if (!phoneRule.test(mobile)) {
    return;
  }
  var requestCode = {
    url: config.caiqr_api_url,
    data: {
      "cmd": "send_verify_code",
      "mobile": mobile
    },
    handler_success: function (data) {
      if (data.code === 0) {
        setTimeout(function () {
          common.toast('验证码发送成功');
        }, 500)
        $(".code").addClass('btn-dis');
        $('.login-btn input').removeAttr('disabled');
        var times = 60;
        $('.code').attr('disabled', 'disabled');
        timer = setInterval(function () {
          times--;
          $(".code").addClass('btn-dis');
          $('.code').html('获取验证码(' + times + 's)');
          if (times <= 0) {
            clearInterval(timer);
            $('.code').text("获取验证码");
            $(".code").removeClass('btn-dis');
            $('.code').removeAttr('disabled');
          }
        }, 1000)
      } else if (data.code == 2013) {
        console.log("请在60秒后重新获取");
        setTimeout(function () {
          common.toast(data.msg);
        }, 500)
      } else {
        common.toast(data.msg);
      }
    },
    handler_ex: function (xhr) {
      console.log(xhr);
      common.toast('网络异常');
    }
  };
  common.ajaxRequest(requestCode);
};
// 登陆
function login_web(mobile, verify_code) {
  var request = {
    url: config.caiqr_api_url,
    data: {
      'cmd': 'user_web_login',
      'mobile': mobile,
      'verify_code': verify_code,
      'channel': channelRequest
    },
    handler_success: function (data) {
      if (data.code == 0) {
        // 登陆成功
        cookie.setCookie('isLogin', 1, 30);
        var userInfo = {
          "user_info": {
            head_img_url: data.resp[0].user_info.head_img_url,
            nick_name: data.resp[0].user_info.nick_name
          }
        };
        //用户的头像+昵称
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        //用户token
        localStorage.removeItem('token');
        localStorage.setItem('token', data.resp[0].login_token.token);
        var return_url = $.query.get("return_url");
        //window.location.href = '/';
        loginBack(return_url);
      } else if (data.code == 2011) {
        setTimeout(function () {
          common.toast("验证码不正确");
        }, 500)
      } else if (data.code == 1001) {
        setTimeout(function () {
          common.toast('网络异常');
        }, 500)
      } else {
        common.toast(data.msg);
      }
    },
    handler_ex: function (xhr) {
      console.log(xhr);
      common.toast('网络异常');
    }
  };
  common.ajaxRequest(request);
}
if (localStorage.getItem('reloginOrderId') != null) {
  var reloginOrderId = localStorage.getItem('reloginOrderId');
}
if (localStorage.getItem('reloginFollowId') != null) {
  var reloginFollowId = localStorage.getItem('reloginFollowId');
}
var LOGIN_BACK = {
  "home": "/",
  "basketballCuanguan": "/jingcai/c2c/basketballCuanguan.html",
  "chuanGuan": "/jingcai/c2c/basketballCuanguan.html",
  "template": "/jingcai/activity/receiveTemplate/index.html",
  "addLottery": "/activity/addLottery/index.html",
  "myCenter": "/jingcai/userCenter/myCenter.html",
  "orderList": "/jingcai/userCenter/orderList.html",
  "kaijiang": "/renren/views/allLotteryInfor.html?frompage=home",
  "Betting": "/jingcai/c2c/Betting.html",
  "buylistk3": "/renren/views/buyListK3.html",
  "buylistd11": "/renren/views/buyListD11.html",
  "buylist3D": "/renren/views/buyList3D.html",
  "buylist7Star": "/renren/views/buyList7Star.html",
  "buyCommon": "/renren/views/buyCommon.html",
  "withdrawCash": "/jingcai/userCenter/withdrawCash.html",
  "orderDetail": "/jingcai/c2c/orderDetail.html?order_id=ID" + reloginOrderId,
  "renOrderDetail": "/renren/views/numOrderDetail.html?orderId=' + reloginOrderId + '&gotoDetailren=1",
  "renFollowDetail": "/renren/views/chaseNumDetail.html?followId=' + reloginFollowId + '&gotoDetailren=1",
  "bettingActivity": "/activity/bettingActivity/index.html",
  "redPackets": "/activity/redPackets/index.html",
  "matchForecast": "/activity/matchForecast/index.html",
}

function loginBack(statereturn) {
  // 回调到需要登录过来的页面
  if (localStorage.getItem('activityLoginReturnUrl') != null) {
    // bannerLinkUrl 存在值
    var linkUrl = localStorage.getItem('activityLoginReturnUrl');
    localStorage.removeItem('activityLoginReturnUrl'); // 获取到值后清除
    window.location.href = linkUrl
  } else {
    for (key in LOGIN_BACK) {
      if (statereturn == key) {
        window.location.href = LOGIN_BACK[key];
      }
    }
  }
}
