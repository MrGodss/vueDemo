<template>
<div class="search-box">
  <div class="location">
        <span class="city"  @click="cityClick">
          {{currentCity.cityName}}
        </span>
        <div class="position">
          <span class="text">我的位置</span>
          <img src="@/assets/img/home/icon_location.png" alt="">
        </div>
  </div>
 <div class="section date-range bottom-gray-line" @click="showCalender = true">
  <div class="start">
    <div class="date">
    <span class="tip">入住</span>
    <span class="time">{{ startDateStr }}</span>
    </div>
    <div class="stay">
    共{{ stayCount }}晚
    </div>
  </div>
  <div class="end">
    <div class="date">
      <span class="tip">商店</span>
      <span class="time">{{ endDateStr }}</span>
    </div>
  </div>
 </div>
 <van-calendar 
 v-model:show="showCalender" 
 type="range" 
 @confirm="onConfirm" 
 color="#ff9854"
 :round="false"
 />

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>
    <!--热门建议-->
    <div class="section hot-suggest">
      <template v-for="(item,index) in hotSuggests" :key="index">
        <div 
        class="item"
        :style="{color:item.tagText.color,background:item.tagText.background.color}"
        >
        {{ item.tagText.text }}
        </div>
      </template>
    </div>
    <!--搜索按钮-->
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useCityStore from "@/stores/modules/city"
import { storeToRefs } from 'pinia'; 
import{formatMonthDay , getDiffDays} from "@/utils/format_date"
import useHomeStore from "@/stores/modules/home";
import { ref ,computed} from 'vue';
import useMainStore from '@/stores/modules/main';

const router = useRouter();

// defineProps({
//   hotSuggests:{
//      type:Array,
//      default:() =>[]
//   }
// })

const cityClick = () => {
  router.push("/city")
}
const cityStore = useCityStore()
const {currentCity} = storeToRefs(cityStore)

//日期
const mainStore = useMainStore()
const{ startDate,endDate } = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))
const stayCount = ref(getDiffDays(startDate.value,endDate.value))

const showCalender = ref(false)
const onConfirm = (value) => {
 const selectStartDate = value[0]
 const selectEndDate = value[1]
 mainStore.startDate = selectStartDate
 mainStore.endDate = selectEndDate
 stayCount.value = getDiffDays(selectStartDate,selectEndDate)
 showCalender.value = false
}

const homeStore = useHomeStore()
const {hotSuggests} = storeToRefs(homeStore)
//搜索按钮
const searchBtnClick = () => {
 router.push({
  path:"/search",
  query:{
    startDate:startDate.value,
    endDate:endDate.value,
    currentCity:currentCity.value.cityName
  }
 })
}
</script>

<style lang="less" scoped>
.search-box{
  --van-calendar-popup-height : 100%;
}
.location{ 
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  .city{
    flex:1;
    color: #333;
    font-size: 15px;
  }

  .position{
     width: 74px;
    display: flex;
    align-items: center;
     .text{
        position: relative;
        top: 1.5px;
        font-size: 12px;
        color: #666;
     }

     img{
      margin-left: 5px;
        height: 18px;
        height: 18px;
     }
  }
}
.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid var(--line-color);
  }
}
.hot-suggest{
  height: auto;
  margin: 10px 0;
  .item{
    padding: 4px 8px;
    border-radius:14px;
    margin: 8px 4px;
    font-size: 12px;
    line-height: 1px;
  }
}

.search-btn {
  .btn {
    margin: auto;
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
</style>