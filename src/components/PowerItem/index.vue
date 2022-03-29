<template>
  <div class="item">
    <div class="title">{{ datas.name }}</div>
    <div class="list-item" v-for="(item, key) in table" :key="key">
      <div class="list-item-start font">{{ item.name }}</div>
      <div class="list-circle">
        <div
          class="list-circle-item font"
          v-for="(value, keys) in item.datas"
          :key="keys"
        >
          {{ value.value }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    datas:{
      type:Object,
      required:true
    }
  },
  data() {                           
    return {
      table: [
        {
          name: "类型",
          datas: [
            {
              value: "A相",
            },
            {
              value: "B相",
            },
            {
              value: "C相",
            },
            {
              value: "总",
            },
          ],
        },
      ],
    };
  },
  computed:{
      datass:function(){
           
      }
  }
};
</script>
<style lang="scss" scoped>
.item {
  background: white;
}
.title {
  padding-left: 10px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e4e4e4;
}
.list-item {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  &-start {
    width: 20%;
    padding-left: 10px;
  }
}
.list-circle {
  display: flex;
  width: 80%;
  justify-content: space-between;
  &-item {
    width: 25%;
    text-align: center;
  }
}
.font {
  font-size: 14px;
  color: #928c8cd4;
}
</style>