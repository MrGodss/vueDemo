import { onMounted,onUnmounted } from 'vue'
import { ref } from 'vue'
import {throttle} from 'underscore'
export default function useScroll(elRef){
  let el = window
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  const isReachBottom = ref(false)
  const maxHeight = ref(0)
  const scrollListenerHandler = throttle( () => {
    if(el === window){
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    }else{
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    if(clientHeight.value + scrollTop.value + 1 >= scrollHeight.value){
      isReachBottom.value = true
      maxHeight.value = scrollTop.value 
    }
   },100)
   onMounted(() => {
    if(elRef){
      el = elRef.value
    }
     el.addEventListener("scroll" , scrollListenerHandler)
     
   })
   onUnmounted(() => {
     el.removeEventListener("scroll" , scrollListenerHandler)
    
   })

   return { isReachBottom,clientHeight,scrollTop,scrollHeight,maxHeight}
}