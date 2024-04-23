<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control 
    class="tabs"
    v-if="showTabControl"
    :titles="names"
    @tabItemClick = "tabClick"
    ref="tabControlRef"
    />
    <van-nav-bar
    title="房屋详情"
    left-text="旅途"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="main" v-if="mainPart" v-memo="[mainPart]">
    <detailSwipe :swipe-data="mainPart.topModule.housePicture.housePics"></detailSwipe>
    <DetailInfos name="描述" :ref="getSectionRef" :topInfos="mainPart.topModule"></DetailInfos>
    <Detailfacility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"></Detailfacility>
    <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>
    <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
    <detail-notice  name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
    <detail-map name="地图" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"></detail-map>
    <detail-intro :price-intro="mainPart.introductionModule"/>
    <action-bar :current-house="currentHouse"/>
  </div>
  <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import{getDetailInfo}from"@/services/index"
import { ref,computed, watch, onMounted } from 'vue';
import detailSwipe from"@/views/detail/cpns/detail_01_swipe.vue"
import DetailInfos from "@/views/detail/cpns/detail_02_infos.vue"
import Detailfacility from './cpns/detail_03_facility.vue'
import detailLandlord from './cpns/detail_04_landlord.vue'
import detailComment from'./cpns/detail_05_comment.vue'
import detailNotice from './cpns/detail_06_notice.vue'
import detailMap from './cpns/detail_07_map.vue'
import detailIntro from './cpns/detail_08-intro.vue'
import TabControl from'@/components/tab-control/tab-control.vue'
import useScroll from '@/hooks/useScroll';
import ActionBar from './cpns/action-bar.vue'
 
const router = useRouter()
const route = useRoute()
const houseId = route.params.id

const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfo(houseId).then(res => {
    detailInfos.value = res.data
})

const onClickLeft = () => {
  router.back()
}
const detailRef = ref()
//顶部导航栏
const {scrollTop,maxHeight} = useScroll(detailRef)
const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
const getSectionRef = (value) => {
  if(!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}
const showTabControl = computed(() => {
  return scrollTop .value > 300
})
let isClick = false
let currentDistance = ref(-1)
let demoIndex = ref(0)
const tabClick = (index) => {
  demoIndex.value = index
  isClick = true
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let instance = el.offsetTop
  if(index !== 0){
    instance = instance - 44
  }
  
  currentDistance.value = instance
  detailRef.value.scrollTo({
    top:instance,
    behavior:"smooth"
  })
}
const currentHouse = computed(() => detailInfos.value?.currentHouse)

//页面滚动匹配
const tabControlRef = ref()
let tooHeight = false
watch(scrollTop,(newValue) => {


  //console.log(newValue , maxHeight.value)
  // if(newValue >= maxHeight.value && maxHeight.value != 0 ){
  //     isClick = false
  //     console.log("到底了"+isClick)
  // //     tooHeight = true
  // //     console.log(tooHeight)
  // //   if(tabControlRef.value)
  // // {
  // //   console.log("kkk")
  // //     tabControlRef.value.currentIndex = demoIndex.value
  // //   }
  // }


    //console.log(newValue , maxHeight.value)
  if(parseInt(newValue) == parseInt(currentDistance.value)){isClick = false}
  // console.log(isClick)
  if(isClick) return
    const els = Object.values(sectionEls.value)
    const values = els.map(el => el.offsetTop)

    let index = values.length - 1
    for(let i=0;i<values.length;i++){
    if(values[i] > newValue + 44){
      index = i-1
      break
    }
  }
  if(tabControlRef.value)
  {
    tabControlRef.value.currentIndex = index
    // console.log("里面"+tabControlRef.value.currentIndex)
  }
 
  // tabControlRef.value?. getCurrentIndex(index)
  
  
 
}) 


</script>n

<style lang="less" scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
} 
.tabs{
  position:fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}
</style>