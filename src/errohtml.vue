<template>
  <div class="in1" style="padding-top: 250px;">
    <div class="head404"></div>
    <div class="txtbg404">
      <div class="txtbox">
        <p style="margin: 0px 5px;line-height: 100px;">您请求的页面不存在、或已被删除、或暂时不可用</p>
       <!-- <p><a href="#" @click="index" style="color: #2e9de2;">返回网站首页</a></p> -->
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    method: {
      index() {
        this.$router.push({
          path: '/'
        })
      }

    }
  }
</script>
<style>
 .head404{ width:580px; height:234px; margin:10px auto 0 auto; background:url(../static/img/erro.png) no-repeat; }

 .txtbg404{background-color: #434343;height: 100px;}
  .txtbg404 .txtbox {
    text-align: center;
    color: #eee;
    font-size: 13px;
  }
</style>
