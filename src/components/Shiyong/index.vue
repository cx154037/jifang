<template>
    <div id="shiyong"></div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    data() {
        return {
            option: []
        }
    },
    methods: {
        init() {
            this.option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                    }
                ]
            };

        }
    },
    mounted() {
        var chartDom = document.getElementById('shiyong');
        var myChart = echarts.init(chartDom);
        this.init()
        myChart.setOption(this.option);
    }
}
</script>
<style lang="scss" scoped>
</style>