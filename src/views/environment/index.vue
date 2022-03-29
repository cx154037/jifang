<template>
  <div class="container">
    <div class="container-left">
      <div class="items-start">
        <Chart :chart="chart1" v-if="chart1.cabinets.length != 0" />
      </div>
      <div class="items-start">
        <Chart :chart="chart2" v-if="chart2.cabinets.length != 0" />
      </div>
    </div>
    <div class="container-right">
      <div class="container-title">状态信号</div>
      <div class="list-item">
        <div class="items-stretch">
          <div class="item" v-for="(item,key) in IOS" :key="key">
             <div class="left">{{item.sigName}}</div>
             <div class="right" v-if="item.id===1439||item.id===1440||item.id===1441||item.id===1443||item.id===1443||item.id===1446||item.id===1448||item.id===1451||item.id===1452||item.id===1454||item.id===1455||item.id===1456">{{((item.id===1439||item.id===1440||item.id===1441||item.id===1443||item.id===1443||item.id===1446||item.id===1450||item.id===1451||item.id===1452||item.id===1448)&&item.value===1)?'打开':"关闭"}}</div>
             <div class="right" v-if="item.id===1442||item.id===1447||item.id===1449||item.id===1450||item.id===1453||item.id===1457">{{item.value==1?'告警':"正常"}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "@/components/Chart/index";
import { findTAHIO } from "@/api/environment/index";
export default {
  components: {
    Chart,
  },
  data() {
    return {
      chart1: {
        id: "chart1",
        title: "机柜温度图示",
        cabinets: [],
        value: [],
      },
      chart2: {
        id: "chart2",
        title: "机柜湿度度图示",
        cabinets: [],
        value: [],
      },
      IOS: [],
    };
  },
  created() {
    findTAHIO(1).then((res) => {
      var { temperature, humidity, IO } = res.data;
      this.chart1.cabinets = temperature.map((item) => {
        return item.groupName;
      });
      this.chart1.value = temperature.map((item) => {
        return item.sigValue;
      });
      this.chart2.cabinets = humidity.map((item) => {
        return item.groupName;
      });
      this.chart2.value = humidity.map((item) => {
        return item.sigValue;
      });
      this.IOS = IO.filter((item) => {
        return item.sigName !== "预留";
      });
      console.log(this.IOS)
    });
  },
};
</script>
<style lang="scss" scoped>
.container {
  background: #e7e7e7d4;
  width: 100%;
  height: calc(100vh - 85px);
  padding: 10px;
  display: flex;
  &-left {
    width: 65%;
    height: 100%;
    margin-right: 1%;
  }
  &-right {
    width: 35%;
    height: 100%;
    background: white;
    border-radius: 5px;
    .container-title {
      width: 100%;
      height: 6.5%;
      // border-bottom: 1px solid #e4e4e4;
      display: flex;
      align-items: center;
      padding-left: 10px;
      font-weight: bold;
       border-bottom:1px solid #e4e4e4;
    }
    .items-stretch {
      display: flex;
      width: 100%;
      flex: 1;
       flex-wrap:wrap ;
      .item {
        display: flex;
        width: 50%;
        align-items: center;
        justify-content: space-around;
        font-size: 14px;
       border-bottom:1px solid #e4e4e4;
        &:nth-child(odd){
          border-right: 1px solid #e4e4e4;
          // border-top: 1px solid #e4e4e4;
        }
        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
  .items-start {
    height: 45%;
    width: 100%;
    background: white;
    border-radius: 5px;
    margin-bottom: 10px;
  }
}
.list-item {
  display: flex;
  flex-wrap: nowrap;
  flex-wrap: nowrap;
  flex-direction: column;
  height: 93.5%;
}
.active {
  background: #e6435e;
}
.left {
  color: #585454;
}
.right {
  font-weight: bold;
  font-size: 17px;
}
</style>