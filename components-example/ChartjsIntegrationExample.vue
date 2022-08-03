<template>
  <div class="chart-area">
    <div class="chart-container">
      <canvas id="balance-chart" />
    </div>
    <div id="balance-chart-legend" />
  </div>
</template>

<script>
import {
  Chart,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  LinearScale,
  TimeSeriesScale,
  Legend,
  Tooltip
} from 'chart.js'

import annotationPlugin from 'chartjs-plugin-annotation'
import 'chartjs-adapter-date-fns'

Chart.register(
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  LinearScale,
  TimeSeriesScale,
  Legend,
  Tooltip,
  annotationPlugin
)

export default {
  props: {
    chartData: {
      type: Object,
      default: () => {}
    },
    chartOptions: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  watch: {
    chartData: function (newData) {
      if (window.chartInstance) {
        window.chartInstance.data = newData
        window.chartInstance.update()
      }
    },
    chartOptions: function (newOptions) {
      if (window.chartInstance) {
        window.chartInstance.options = newOptions
        window.chartInstance.update()
      }
    }
  },
  mounted() {
    const getOrCreateLegendList = (chart, id) => {
      const legendContainer = document.getElementById(id)
      let listContainer = legendContainer.querySelector('ul')

      if (!listContainer) {
        listContainer = document.createElement('ul')
        listContainer.style.display = 'flex'
        listContainer.style.flexDirection = 'row'
        listContainer.style.margin = 0
        listContainer.style.padding = 0

        legendContainer.appendChild(listContainer)
      }

      return listContainer
    }
    const htmlLegendPlugin = {
      id: 'htmlLegend',
      afterUpdate(chart, args, options) {
        const ul = getOrCreateLegendList(chart, options.containerID)
        ul.style.justifyContent = 'center'
        ul.style.paddingTop = '20px'

        // Remove old legend items
        while (ul.firstChild) {
          ul.firstChild.remove()
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart)

        const renderedGroups = []
        items.forEach((item) => {
          const itemLegend = chart.data.datasets[item.datasetIndex]['legend']
          const legendGroup = itemLegend['group']
          const legendImage = itemLegend['image']

          // Legend Item Image
          const img = document.createElement('img')
          img.style.height = '22px'
          img.style.marginRight = '10px'
          img.src = `/img/chart-legend/${legendImage}`

          // Legend Item Text
          const textContainer = document.createElement('p')
          textContainer.style.color = '#918D96'
          textContainer.style.margin = 0
          textContainer.style.padding = 0
          textContainer.style.textDecoration = item.hidden ? 'line-through' : ''
          const text = document.createTextNode(item.text)
          textContainer.appendChild(text)

          const legendItemDiv = document.createElement('div')
          legendItemDiv.style.display = 'flex'
          legendItemDiv.style.margin = '10px'
          legendItemDiv.appendChild(img)
          legendItemDiv.appendChild(textContainer)

          let groupDiv = null
          if (renderedGroups.includes(legendGroup)) {
            groupDiv = document.getElementById(legendGroup)
          } else {
            groupDiv = document.createElement('div')
            groupDiv.id = legendGroup
            groupDiv.style.display = 'flex'
            groupDiv.style.flexDirection = 'column'
            const groupNameSpan = document.createElement('span')
            groupNameSpan.style.display = 'flex'
            groupNameSpan.style.justifyContent = 'center'
            groupNameSpan.style.fontWeight = 'bold'
            groupNameSpan.style.fontFamily = 'Manrope'
            groupNameSpan.style.color = '#918D96'
            const groupNameTextElement = document.createTextNode(legendGroup)
            groupNameSpan.appendChild(groupNameTextElement)
            groupDiv.appendChild(groupNameSpan)

            const legendItemsContainer = document.createElement('div')
            legendItemsContainer.style.display = 'flex'
            groupDiv.appendChild(legendItemsContainer)
          }
          groupDiv.children[1].appendChild(legendItemDiv)

          if (!renderedGroups.includes(legendGroup)) {
            const li = document.createElement('li')
            li.style.display = 'flex'
            li.style.flexDirection = 'column'
            li.style.margin = '10px'
            li.appendChild(groupDiv)
            ul.appendChild(li)
            renderedGroups.push(legendGroup)
          }
        })
      }
    }
    const balanceChartCanvas = document.getElementById('balance-chart')
    balanceChartCanvas.height = 500
    window.chartInstance = new Chart(balanceChartCanvas, {
      type: 'bar',
      data: this.chartData || {},
      options: this.chartOptions || {},
      plugins: [htmlLegendPlugin]
    })
    balanceChartCanvas.onclick = (evt) => {
      const points = window.chartInstance.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true)
      if (points.length) {
        const firstPoint = points[0]
        const label = window.chartInstance.data.labels[firstPoint.index]
        const value = window.chartInstance.data.datasets[firstPoint.datasetIndex].data[firstPoint.index]
        this.$emit('element-click', { firstPoint, label, value })
      }
    }
  }
}
</script>