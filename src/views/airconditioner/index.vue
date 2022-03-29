<template>
    <div class="container">
        <div>
            空调1
        </div>
       <div class="top">
           <div class="top-1 top-item">
              <mapItem :map="map1"></mapItem>
           </div>
         <div class="top-1 top-item">
              <mapItem :map="map2"></mapItem>
           </div>
           <div class="top-1 top-item">
              <mapItem :map="map3"></mapItem>
           </div>
           <div class="top-1 top-item">
              <mapItem :map="map4"></mapItem>
           </div>
       </div>
    </div>
</template>
<script>
import mapItem from '@/components/Map/index'
export default {
    components:{
        mapItem
    },
    data(){
        return {
            map1:{
               id:'map-1',
               name:'平均出风温度'
            },
            map2:{
                id:'map-2',
               name:'平均回风风温度' 
            },
            map3:{
                 id:'map-3',
               name:'平均出风湿度'
            },
            map4:{
                 id:'map-4',
               name:'平均回风湿度'
            }
         
        }
    }
}
</script>
<style lang="scss" scoped>
.container{
     background: #e7e7e7d4;
     width: 100%;
    height: calc(100vh - 85px);
}
.top{
    height: 40%;
    display: flex;
    &-item{
        width: 25%;
        height: 100%;
        background: white;
    }
}
</style>