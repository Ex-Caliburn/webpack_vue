<template>
  <div>
    <head-top headTitle='首页'></head-top>
    <div v-text="geohash"></div>
    <div v-text="id"></div>
    <router-link to="/search/111">Go to 111</router-link>
  </div>

</template>

<script>
  //  import headTop from '../../components/header/head'
  //  import footGuide from '../../components/footer/footGuide'
  //  import {searchRestaurant} from '../../service/getData'
  //  import {imgBaseUrl} from '../../config/env'
  //  import {getStore, setStore} from '../../config/mUtils'

  import headTop from '../../components/head/head'


  export default {
    data(){
      return {
        id: '',
        geohash: '', // msite页面传递过来的地址信息
        searchValue: '', // 搜索内容
        restaurantList: [], // 搜索返回的结果
//        imgBaseUrl, // 图片域名地址
        searchHistory: [], // 搜索历史记录
        showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
        emptyResult: false, // 搜索结果为空时显示
      }
    },
    created(){

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': function () {
        console.log(1111);
      }
    },
    mounted(){
      this.geohash = this.$route.params.geohash;
      this.id = this.$route.params.id;
      //获取搜索历史记录
//      if (getStore('searchHistory')) {
//        this.searchHistory = JSON.parse(getStore('searchHistory'));
//      }
    },
    components: {
      headTop,
//      footGuide,
    },
    methods: {
      //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
//      async searchTarget(historyValue){
//        if (historyValue) {
//          this.searchValue = historyValue;
//        } else if (!this.searchValue) {
//          return
//        }
//        //隐藏历史记录
//        this.showHistory = false;
//        //获取搜索结果
//        this.restaurantList = await
//          searchRestaurant(this.geohash, this.searchValue);
//        this.emptyResult = !this.restaurantList.length;
//        /**
//         * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
//         * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
//         */
//        let history = getStore('searchHistory');
//        if (history) {
//          let checkrepeat = false;
//          this.searchHistory = JSON.parse(history);
//          this.searchHistory.forEach(item = > {
//            if (item == this.searchValue
//        )
//          {
//            checkrepeat = true;
//          }
//        })
//          if (!checkrepeat) {
//            this.searchHistory.push(this.searchValue)
//          }
//        } else {
//          this.searchHistory.push(this.searchValue)
//        }
//        setStore('searchHistory', this.searchHistory)
//      },
      //搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
      checkInput(){
        if (this.searchValue === '') {
          this.showHistory = true; //显示历史记录
          this.restaurantList = []; //清空搜索结果
          this.emptyResult = false; //隐藏搜索为空提示
        }
      },
      //点击删除按钮，删除当前历史记录
      deleteHistory(index){
        this.searchHistory.splice(index, 1);
//        setStore('searchHistory', this.searchHistory);
      },
      //清除所有历史记录
      clearAllHistory(){
        this.searchHistory = [];
//        setStore('searchHistory', this.searchHistory);
      }
    }
  }

</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '../../style/mixin';

  .search_page {
    margin-bottom: 2rem;
  }

  .search_form {
    background-color: #fff;
    padding: 0.5rem;
    display: flex;

    input {
      height: 1.5rem;
    }

    .search_input {
      flex: 4;
      border: 0.025rem solid $bc;
      @include sc(0.65rem, #333);
      border-radius: 0.125rem;
      background-color: #f2f2f2;
      font-weight: bold;
      padding: 0 0.25rem;
    }

    .search_submit {
      flex: 1;
      border: 0.025rem solid $blue;
      margin-left: .2rem;
      @include sc(0.65rem, #fff);
      border-radius: 0.125rem;
      background-color: $blue;
      font-weight: bold;
      padding: 0 0.25rem;
    }

  }

  .title_restaurant {
    font-size: 0.6rem;
    line-height: 2rem;
    text-indent: 0.5rem;
    font-weight: bold;
    color: #666;
  }

  .list_container {
    background-color: #fff;
  }

  .list_li {
    display: flex;
    justify-content: 'center';
    padding: 0.5rem;
    border-bottom: 0.025rem solid $bc;

    .item_left {
      margin-right: 0.25rem;

      .restaurant_img {
        @include wh(1.7rem, 1.7rem);
      }

    }
    .item_right {
      font-size: 0.55rem;
      flex: 1;

      .item_right_text {
        padding-bottom: 0.25rem;
        border-bottom: 0.025rem solid $bc;

        p {
          line-height: .9rem;
        }

        .pay_icon {
          margin-bottom: -0.08rem;
        }

      }
      .item_right_detail {
        margin-top: 0.25rem;

        li {
          font-size: 0;

          span {
            font-size: .5rem;
            vertical-align: middle;
            display: inline-block;
            margin-bottom: 0.2rem;
          }

          .activities_icon {
            @include sc(.5rem, #fff);
            font-weight: bold;
            padding: .04rem;
            border-radius: 0.15rem;
            margin-right: 0.125rem;
          }

          .only_phone {
            color: #FF6000;
          }

        }
      }
    }
  }

  .search_history {

    .history_list {
      background-color: #fff;
      border-bottom: 0.025rem solid $bc;
      @include font(0.7rem, 2rem);
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .history_text {
        display: inline-block;
        width: 80%;
      }

      .delete_icon {
        @include wh(1rem, 1rem);
      }

    }
    .clear_history {
      background-color: #fff;
      color: $blue;
      @include font(.7rem, 2rem);
      font-weight: bold;
      text-align: center;
    }

  }

  .search_none {
    margin: 0 auto;
    @include font(0.65rem, 1.75rem);
    color: #333;
    background-color: #fff;
    text-align: center;
    margin-top: 0.125rem;
  }
</style>
