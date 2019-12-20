<template>
  <div>
    <div id="myChart" :style="{width: '800px', height: '400px'}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Charts',
  created(){
    this.$echarts = echarts
  },
  mounted(){
            var myChart = this.$echarts.init(document.getElementById('myChart'));
            // 绘制图表
            myChart.setOption({
                //提示框组件，专门配置提示框的。
                tooltip: {
                    trigger:'axis',
                    // 坐标轴指示器配置项。
                    axisPointer:{
                        type:'cross', //指示器样试
                    }
                },
                //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
                toolbox:{
                    feature:{
                        // 动态类型切换,切换图表
                        magicType: {
                            type: ['line', 'bar', ]
                        },
                        //数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
                        dataView:{
                            show:true,  //是否显示 数据示图
                            readOnly:false, //是否 直接可以编辑数据。
                        },
                        //保存为图片的配置
                        saveAsImage: {
                            show: true
                        },
                        //配置项还原
                        restore: {show: true},
                    }
                },
                //图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
                legend:{
                    data:['switch'] //对应的是name
                },
                //配置X轴
                xAxis: {
                    //坐标轴类型
                    type:'category',
                    //配置类目名称。 可以逐一设置，具体看文档
                    data: ['2019-12-08', '2019-12-08', '2019-12-08', '2019-12-08', ],
                    //配置 鼠标移入时显示的 阴影指示器'line' 直线指示器 'shadow' 阴影指示,器  'none' 无指示器
                    axisPointer: {
                        show:true, //show 必须写，开关的作用
                        type: 'shadow'
                    }
                },
                //配置Y轴
                yAxis: [
                    {
                        type: 'value', //坐标轴类型
                        name: '人数', //名称
                        axisLabel: {  //坐标轴刻度标签的相关设置。
                            formatter: '{value}人'  //字符串模板
                        }
                    },
                ],
                //系列列表。每个系列通过 type 决定自己的图表类型,一个对象表示一个列表
                series: [
                    {
                        name: 'switch',
                        type: 'line',
                        data: [45, 54, 66, 50,]
                    }
                ],
                //图表的颜色
                color:['#CCC','#AFA', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
          })  
  },
}
</script>

<style>

</style>