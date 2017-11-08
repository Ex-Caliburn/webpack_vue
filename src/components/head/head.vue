<template>

  <div class="app-bar text-center position-relative">
    <a @click="$router.go(-1)">
      <i class="iconfont icon-back"></i>
    </a>
    <div class="app-bar-title color-fff" v-text="headTitle"></div>
  </div>

</template>

<script>
  export default {
    name: 'headTop',
    data () {
      return {}
    },
    props: {
      "headTitle": {
        type: String,
        default: '彩票'
      }
    },
    methods: {},
    mounted: function () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  body {
    padding-top: .4rem;
  }

  .app-bar {
    background-color: #2f2f2f;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /*bottom: -webkit-calc(100% - 40px);*/
    /*bottom: -moz-calc(100% - 40px);*/
    /*bottom: calc(100% - 40px);*/
    z-index: 100;
  }

  .app-bar-title {
    margin: 0 auto;
    line-height: .4rem;
    font-size: .18rem;
  }

  .icon-back {
    position: absolute;
    top: 50%;
    left: 0;
    font-size: .22rem;
    line-height: .22rem;
    color: #fff;
    padding: .09rem;
    box-sizing: border-box;
    transform: translateY(-50%);
  }

</style>
