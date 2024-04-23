import HYRequest from '@/services/request/index'

export function getDetailInfo(houseId){
  return HYRequest.get({
    url:"/detail/infos",
    params:{
      houseId
    }
  })
}