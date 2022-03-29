<template>
  <div :id="map.id" class="maps"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      option: [],
    };
  },
  props:{
     map:{
       type:Object,
       required:true
     } 
  },
  methods: {
    init() {
      this.option = {
        series: [
          {
            type: "gauge",
            radius: "100%",
            center: ["50%", "60%"],
            startAngle: 180,
            endAngle: -0,
            splitNumber:5,
            min: 0,
            max: 50,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.25, "#FF6E76"],
                  [0.5, "#FDDD60"],
                  [0.75, "#58D9F9"],
                  [1, "#7CFFB2"],
                ],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
           
          },
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 50,
            radius: "85%",
            center: ["50%", "60%"],
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                width: 6,
              },
            },
            progress: {
              show: true,
              roundCap: true,
              width: 7,
              itemStyle: {
                color: "#000000",
              },
            },
            pointer: {
              show:false,
              icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
              length: "12%",
              width: 20,
              offsetCenter: [0, "-60%"],
              itemStyle: {
                color: "auto",
              },
            },
            axisTick: {
              show: false,
              length: 12,
              lineStyle: {
                color: "auto",
                width: 2,
              },
            },
            splitLine: {
              show: false,
              length: 20,
              lineStyle: {
                color: "auto",
                width: 5,
              },
            },
            axisLabel: {
              show: false,
            },
            title: {
              show: true,
              offsetCenter: [0, "-20%"],
              fontSize: 10,
            },
            detail: {
              fontSize: 20,
              offsetCenter: [0, "0%"],
              valueAnimation: true,
              formatter: "{value}℃",
              color: "auto",
            },
            data: [
              {
                value: 20,
                name:this.map.name
              },
            ],
          },
        ],
      };
    },
  },

  mounted() {
    this.init();
    this.option.series[1].progress.itemStyle.color = "#2379d2";
    var chartDom = document.getElementById(this.map.id);
    var myChart = echarts.init(chartDom);
    myChart.setOption(this.option);
  },
};
</script>
<style lang="scss" scoped>
.maps {
  width: 100%;
  height: 100%;
  padding-top: 20px;
}
</style>