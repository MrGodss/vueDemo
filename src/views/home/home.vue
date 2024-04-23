<template>
  <div class="home" ref="homeRef">
    <imgtest></imgtest>
    <HomeNavBar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <homeSearchBox :hot-suggests="hotSuggests"></homeSearchBox>
    <HomeCategories> </HomeCategories>
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="'09.19'" :end-date="'09.20'" />
    </div>
    <HomeContent></HomeContent>
  </div>
</template>

<script setup>
import HomeNavBar from "@/views/home/cpns/home-nav-bar.vue";
import homeSearchBox from "./cpns/home-search-box.vue";
import useHomeStore from "@/stores/modules/home";
import HomeCategories from "@/views/home/cpns/home-categories.vue";
import HomeContent from "@/views/home/cpns/home-content.vue";
import imgtest from "./cpns/imgtest.vue";

import { onActivated, ref, watch } from "vue";
import useScroll from "@/hooks/useScroll";
import { computed } from "@vue/reactivity";
import searchBar from "@/components/search-bar/search-bar.vue";

const homeRef = ref();
//发送热门请求
const hotSuggests = ref([]);

const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
homeStore.fetchCategoriesData();
homeStore.fetchHouselistData();

//监听window窗口滚动

const { isReachBottom, scrollTop } = useScroll(homeRef);
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false;
    });
  }
});

const isShowSearchBar = computed(() => {
  return scrollTop.value >= 350;
});

onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value,
  });
});
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
}
.banner {
  img {
    width: 100%;
  }
}
.search-bar {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>
