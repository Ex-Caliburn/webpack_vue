var config = {
  base: {
    client: 4,
    ticket_type: '001',
    end1: '2017/01/27  00:00:00',
    end2: '2017/02/02  23:59:59'
  },
  url: {
    api: "/get_api_post_data/",
    home_json: '/cache/home.json',
    football_json: '/cache/football.json',
    basketball_json: '/cache/basketball.json',
    payment: "https://cashier.caiqr.com",
    domain: window.location.hostname,
    domain_mobile: "mobile.caiqr.com",
    second_domain: ".caiqr.com",
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
