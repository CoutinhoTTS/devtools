<script setup lang="ts">
import { ref } from "vue";
import usePosition from "./../hooks/position";
import Logo from "./Logo/idnex.vue";
import DiaLog from "./Dialog/index.vue";
const panel = ref<HTMLElement | undefined>();
const pushpin = ref<HTMLElement | undefined>();
const { onPointerDown, anchorStyle, isVertical } = usePosition(pushpin);
</script>
<template>
  <div
    ref="panel"
    :style="anchorStyle"
    class="funi-devtools__panel position-fixed select-none"
  >
    <div
      ref="pushpin"
      class="funi-devtools__pushpin p-[2px] color-[var(--el-color-primary,#007fff)] pos-relative bg-#fff b-rd-full border-base shadow b-1 cursor-pointer z-1"
      @pointerdown="onPointerDown"
    >
      <Logo class="font-size-[1.4rem]" />
    </div>
    <DiaLog :isVertical="isVertical"></DiaLog>
  </div>
</template>
