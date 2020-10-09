<template>
  <section class="app-main scroll_content">
    <transition name="fade-transform" mode="out-in">
      <!--<router-view :key="key" class="box" />-->
      <keep-alive :include="cachedViews">
        <router-view class="box" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped lang="scss">
  .app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .fixed-header+.app-main {
    padding-top: 50px;
  }
  .hasTagsView {
    .app-main {
      /* 84 = navbar + tags-view = 50 + 34 */
      /*min-height: calc(100vh - 84px);*/
      min-height: 100vh;
    }

    .fixed-header+.app-main {
      /*padding-top: 84px;*/
      padding: 99px 15px 15px;
      background: #f4f7f9;
      .box {
        background: #fff;
        min-height: calc(100vh - 114px);;
      }
    }
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>
