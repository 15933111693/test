<template>
  <div class="hello">
      <van-button type="primary" to="index">路由跳转</van-button>
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
      />
      <van-progress :percentage="50" />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  van-button{
    width: 100rem;
    height: 100rem;
  }
</style>
