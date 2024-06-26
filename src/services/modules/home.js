import hyRequest from '../request'
export function getHomeHotSuggests(){
  return hyRequest.get({
    url:"/home/hotSuggests"
  })
}
export function getCategoriesData(){
  return hyRequest.get({
    url:"/home/categories"
  })
}
export function getHomeHouselist(currentPage){
  return hyRequest.get({
    url:"/home/houselist",
    params:{
      page:currentPage
    }
  })
}