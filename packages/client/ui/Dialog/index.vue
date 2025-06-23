<script setup lang="ts">
import { getCurrentInstance } from "vue";
const props = defineProps<{ isVertical: boolean }>({
  isVertical: false,
});

const H_STYLE = {
  height: "11px",
  width: "calc(100% - 30px)",
  left: "15px",
  "border-radius": "6px",
  cursor: "ns-resize",
};
const V_STYLE = {
  height: "calc(100% - 30px)",
  width: "11px",
  top: "15px",
  "border-radius": "6px",
  cursor: "ew-resize",
};
const C_STYLE = {
  width: "15px",
  height: "15px",
  "border-radius": "50%",
};
const resizeList = [
  {
    name: "TOP",
    type: "horizontal",
    style: {
      top: "-6px",
      ...H_STYLE,
    },
  },
  {
    name: "BOTTOM",
    type: "horizontal",
    style: {
      bottom: "-6px",
      ...H_STYLE,
    },
  },
  {
    name: "LEFT",
    type: "vertical",
    style: {
      left: "-6px",
      ...V_STYLE,
    },
  },
  {
    name: "RIGHT",
    type: "vertical",
    style: {
      right: "-6px",
      ...V_STYLE,
    },
  },

  {
    name: "TOP-RIGHT",
    type: "corner",
    style: {
      ...C_STYLE,
      top: "-7px",
      right: "-7px",
      cursor: "nesw-resize",
    },
  },
  {
    name: "TOP-LEFT",
    type: "corner",
    style: {
      ...C_STYLE,
      top: "-8px",
      left: "-8px",
      cursor: "nwse-resize",
    },
  },
  {
    name: "BOTTOM-RIGHT",
    type: "corner",
    style: {
      ...C_STYLE,
      bottom: "-8px",
      right: "-8px",
      cursor: "nwse-resize",
    },
  },
  {
    name: "BOTTOM-LEFT",
    type: "corner",
    style: {
      ...C_STYLE,
      bottom: "-8px",
      left: "-8px",
      cursor: "nesw-resize",
    },
  },
];
console.log("dialog", getCurrentInstance());
</script>
<template>
  <div
    :isVertical="props.isVertical"
    class="b-1 border-base w-[300px] h-[300px] b-rd-10px pos-absolute top-[-290px] bg-#fff"
  >
    <div
      v-for="item in resizeList"
      :style="{ ...item.style }"
      class="pos-absolute hover-bg-gray-200/70 transition-colors"
      :key="item.name"
    ></div>
    <div>
      {{ props.isVertical }}
    </div>
  </div>
</template>
