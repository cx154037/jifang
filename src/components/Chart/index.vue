<template>
  <div class="container-map">
    <div class="title">{{chart.title}}</div>
    <div class="mychart" :id="chart.id"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      option: {},
    };
  },
  props:{
      chart:{
        required:true,
        type:Object
      }
  },
  computed :{
        
  },
  methods: {
    init() {
      console.log(this.chart)
      this.option = {
        backgroundColor: "#e7faf8",
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "1%",
          right: "0",
          bottom: "1%",
          top:"10%",
          containLabel: true,
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: this.chart.cabinets,
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              //y轴
              show: false,
            },
            axisTick: {
              //刻度线
              show: false,
            },
            splitLine: {
              //网格线
              show: true,
            },
          },
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            //设置柱状图宽度
            barWidth: "13",
            data: this.chart.value,
            itemStyle: {
              normal: {
                //柱形图圆角，顺时针左上，右上，右下，左下）
                barBorderRadius: [12, 12, 12, 12],
                //设置柱状图颜色渐变
                color: {
                  type: "'linear'",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#f45c3d", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#f9bf6b", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
          },
        ],
      };
    },
  },
  mounted() {
    console.log(this.chart)
    this.init();
    var chartDom = document.getElementById(this.chart.id);
    var myChart = echarts.init(chartDom);
    myChart.setOption(this.option);
  },
};
</script>
<style lang="scss" scoped>
.container-map {
  width: 100%;
  height: 100%;
 
  .title {
    width: 100%;
    height: 15%;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-weight: bold;
  }
}
.mychart {
  width: 100%;
  height: 85%;
  //padding-top: 20px;
}
</style>