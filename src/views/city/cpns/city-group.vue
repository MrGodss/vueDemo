<template>
<div class="city-group">
  <van-index-bar  :index-list="indexList">
    <van-index-anchor index="热门" />
    <div class="list">
        <template v-for="(city,index) in groupData.hotCities">
          <div class="hotCity" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
    </div>

    <template v-for="( group,index) in groupData.cities" :key="index">
      <van-index-anchor :index="group.group" />
          <template v-for="(city,indey) in group.cities" :key="indey">
              <van-cell :title="city.cityName " @click="cityClick(city)" />
          </template>
    </template>
  </van-index-bar>
</div>
</template>

<script setup>
import {computed} from "vue"
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city"
const props = defineProps({
  groupData:{
    type:Object,
    default:() => ({})
  }
})

const indexList = computed(() => {
 const list =  props.groupData.cities.map(item => item.group)
 list.unshift("#")
 return list
})

const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
   cityStore.currentCity = city
   router.back()
}
</script>

<style lang="less" scoped>
.list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 20px;
   .hotCity{
    width: 70px;
    height: 28pxx;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 6px 0;
  }
}
</style>