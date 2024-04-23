<template>
<div class="city top-page">
  <div class="top">
    <van-search 
    v-model="searchValue" 
    shape="round"
    placeholder="城市/区域/位置" 
    show-action
    @cancel="cancelClick"
    />
    <van-tabs v-model:active="tabActive" color="#ff9854">
      <template v-for="(value,key,index) in allCities" :key="key">
        <van-tab :title="value.title" :name="key"></van-tab>
      </template>
   
  </van-tabs>
  </div>
  <div class="content">
    <template v-for="(value,key,index) in allCities">
      <cityGroup v-show="tabActive === key" :group-data="value"></cityGroup>
    </template>
  </div>
</div>
</template>

<script setup>

import {ref,computed} from "vue"
import{useRouter} from "vue-router"
import useCityStore from "@/stores/modules/city"
import { storeToRefs } from "pinia";

import cityGroup from "@/views/city/cpns/city-group.vue"
const searchValue = ref("")
const router = useRouter()

const cancelClick = () => {
     router.back()
}

const tabActive = ref() 

const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const{ allCities } = storeToRefs(cityStore)

</script>

<style lang="less" scoped>
.city{
.top{
  position: relative;
  z-index: 9;
}
.content{
  height: calc(100vh - 98px);
  overflow-y: auto;
}
}
</style>