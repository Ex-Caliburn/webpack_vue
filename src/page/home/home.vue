<template>
  <div>
    <head-top headTitle='首页'></head-top>
    <div v-text="token">1111</div>
    <div v-text="userInfo && userInfo.nick_name" ref="item" @click="alert" aa="bbb">1111</div>
    <img :src="userInfo && userInfo.head_img_url ">
    <back-top></back-top>

    <!-- mt-ui  -->
    <!--<mt-cell-->
    <!--title="测试param跳转"-->
    <!--:to=" '/search/'+ (userInfo && userInfo.nick_name)+'/123123'"-->
    <!--is-link-->
    <!--value="带链接">-->
    <!--</mt-cell>-->
    <!--<router-link :to="'/search/'+ (userInfo && userInfo.nick_name)"  @click="search" >Go to Bar</router-link>-->

    <div>
      <router-link to="/detail">Go to Detail</router-link>
    </div>

    <div>
      <transition name="fade">
        <router-link :to="{ name: 'search1', params: { geohash: 123 }}">User</router-link>
      </transition>
    </div>


    <div @click="search">Go to Bar</div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <!--<mt-cell title="标题文字" icon="more" value="带 icon"></mt-cell>-->


    <transition name="fade">
      <!-- 子组件必须加 以下一行-->
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  import headTop from '../../components/head/head'
  import backTop from '../../components/footer/backTop'
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'

  //import {cityGuess, hotcity, groupcity} from '../../service/getData'

  export default {
    data(){
      return {}
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
//      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
//      '$route': 'fetchData'
    },
    mounted(){
      console.log(this);
//      this.countAdd({});
//      this.countAddBy(11);


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

    computed: {
      ...mapGetters(
        {
          'userInfo': 'getUserInfo',
          'token': 'getToken',
          'doneTodos': 'doneTodos',
          'getTodoById': 'getTodoById'
        }),
    },

    methods: {
      search(){
//        this.$router.push({path: '/msite', query: {geohash}})
//        this.$router.push({ name: 'search', params: { userId: 123 }});
        this.$router.push({path: "/search/11/111"})
      },
      ...mapMutations([]),
      ...mapActions([
        'countAdd', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
        'countAddBy'

        // `mapActions` 也支持载荷：
//        'countAddBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      ]),
      //点击图标刷新页面
      reload(){
        window.location.reload();
      },
      alert(){
        console.log(this.$refs.item.getAttribute('aa'));
      }
    },
  }

</script>

<style lang="scss" rel="stylesheet/scss">
  body {
    height: 2000px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
  {
    opacity: 0
  }

  /*.slide-fade-enter-active {*/
  /*transition: all .3s ease;*/
  /*}*/
  /*.slide-fade-leave-active {*/
  /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
  /*}*/
  /*.slide-fade-enter, .slide-fade-leave-to*/
  /*!* .slide-fade-leave-active for below version 2.1.8 *! {*/
  /*!*transform: translateX(10px);*!*/
  /*opacity: 0;*/
  /*}*/

</style>
