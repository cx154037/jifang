<template>
    <div class="content">
        <div class="content-start content-item">
         <powerItem :datas="data1"></powerItem>
        </div>
        <div class="content-end content-item">
            <powerItem :datas="data2"></powerItem>
        </div>
    </div>
</template>                            
<script>
import powerItem from '@/components/PowerItem/index'
import {findTotalCircuit} from '@/api/power/index'
export default {
    components:{
          powerItem
    },
    data(){
        return {
               data1:{
                   name:'主路'
               },
               data2:{
                     name:'备路'
               }
        }
    },
    created(){
        findTotalCircuit({id:1}).then(res=>{
            console.log(res)
             
        })
    }
}
</script>
<style scoped lang="scss">
 .content{
     display: flex;
     width: 100%;
     min-height: calc(100vh - 85px);
     background: #e7e7e7d4;
     padding: 10px;
     justify-content: space-between;
 }
 .content-item{
     width:49.5%;
     //height: 50%;
 }
</style>