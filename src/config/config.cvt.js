var config = {
  base: {
    client: 4,
    ticket_type: '001',
    end1: '2017/01/24 03:00:00',
    end2: '2017/01/24 05:00:00'
  },
  url: {
    api: "/get_api_post_data/",
    home_json: '/cache/home.json',
    football_json: '/cache/football.json',
    basketball_json: '/cache/basketball.json',
    payment: "https://cashier.caiqr.cn",
    domain: window.location.hostname,
    domain_mobile: "mobile.caiqr.cn",
    second_domain: ".caiqr.cn",
  },
  CONSUME_CONTENT: "消费",
  LOTTERY_BTN: true,
  client: {
    "bojinshuju": "14",
    "meizuh5": "24",
    "fenxiao": '34',
    "wap": '44',
    "lingshengcaijiandashi01": '54',
    "dkqianbao": '64',
    "tuniu": '74',
    "lexiaoqian": '84',
    "h5_bfb": '94',
    "mengfu": '104',
    "tuniu_wx": '114'
  },
};

var channel = "wap";

export  {config, channel}
