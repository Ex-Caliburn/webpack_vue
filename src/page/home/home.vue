<template>
  <div>
    <head-top headTitle='首页'></head-top>

    <back-top></back-top>
  </div>
</template>

<script>
  import headTop from '../../components/head/head'
  import backTop from '../../components/footer/backTop'
  //import {cityGuess, hotcity, groupcity} from '../../service/getData'

  export default {
    data(){
      return {}
    },

    mounted(){
//        // 获取当前城市
//        cityGuess().then(res => {
//            this.guessCity = res.name;
//            this.guessCityid = res.id;
//        })
//
//        //获取热门城市
//        hotcity().then(res => {
//            this.hotcity = res;
//        })
//
//        //获取所有城市
//        groupcity().then(res => {
//            this.groupcity = res;
//        })
    },

    components: {
      headTop,
      backTop
    },

    computed: {},

    methods: {
      //点击图标刷新页面
      reload(){
        window.location.reload();
      }
    },
  }

</script>

<style lang="scss" rel="stylesheet/scss">
  body {
    height: 2000px;
  }


</style>
