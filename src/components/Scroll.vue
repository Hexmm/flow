<script setup lang="ts">
import {ref} from "vue";
import {onMounted} from "@vue/runtime-core";


const list = [
  "Hello World",
  "hello",
  "Taycan",
  "Palamela",
  "Macant",
  "Model"
]

const pageSize = list.length

const renderList = ref(list)
let realWidth = ref(0);

onMounted(() => {
  realWidth.value = tabs.value.scrollWidth;
  tabs.value.scrollLeft = 60;
  console.log('onMounted do realWidth.value => ', realWidth.value)
})

const onscroll = (e) => {
  const scrollWidth = tabs.value.scrollWidth
  const scrollLeft = tabs.value.scrollLeft
  const clientWidth = tabs.value.clientWidth
  const shouldMoreRight = scrollWidth - (clientWidth + scrollLeft) < 50
  const shouldMoreLeft = scrollLeft < 50
  console.log('shouldMoreRight.value => res', scrollWidth - (clientWidth + scrollLeft))
  if (shouldMoreRight) {
    renderList.value = renderList.value.concat(list)
    console.log('shouldMoreRight.value => called', shouldMoreRight)
    if (renderList.value.length === (3 * pageSize)) {
      renderList.value = renderList.value.splice(0, pageSize)
    }
  }
  console.log('shouldMoreLeft.value => ', shouldMoreLeft)
  if (shouldMoreLeft) {

    renderList.value = list.concat(renderList.value)
    tabs.value.scrollLeft = realWidth.value + scrollLeft;
    if (renderList.value.length === (3 * pageSize)) {
      renderList.value.splice(renderList.value.length - pageSize, pageSize)
    }
    console.log('shouldMoreLeft.value => called')
    console.log('renderList.value.length => ', renderList.value.length)
  }
  console.log('scrollWidth => ', scrollWidth)
  console.log('scrollLeft => ', scrollLeft)
  console.log('clientWidth => ', clientWidth)
  console.log('realWidth => ', realWidth.value)
}

const tabs = ref(null)
</script>

<template>
  <a-button type="primary">Primary Button</a-button>
  <div class="wrapper">
    <div class="ul"
         @scroll="onscroll"
         ref="tabs"
    >
      <div class="li" v-for="item in renderList" :key="item">
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 450px;
  margin: 0 auto;
  border: 2px solid black;
  padding: 16px;

  .ul {
    display: flex;
    flex-direction: row;
    gap: 8px;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory; /* 水平方向的滚动吸附 */
    border: 1px solid blue;
  }

  .li {
    flex-shrink: 0;
    background-color: orange;
    scroll-snap-align: start; /* 吸附到容器的顶部 */
    word-break: keep-all;
    padding: 8px 16px;
    display: inline-block;
  }
}
</style>
