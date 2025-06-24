<script setup lang="ts">
import { ref } from "vue";
import usePosition from "./../hooks/position";
import Logo from "./Logo/idnex.vue";
import DiaLog from "./Dialog/index.vue";
const panel = ref<HTMLElement | undefined>();
const pushpin = ref<HTMLElement | undefined>();
const dialog = ref<InstanceType<typeof DiaLog> | undefined>();
const { onPointerDown, anchorStyle, isVertical, dialogStyle, state } =
  usePosition(pushpin, dialog);
</script>
<template>
  <div
    ref="panel"
    :style="anchorStyle"
    class="funi-devtools__panel position-fixed select-none"
  >
    <div
      ref="pushpin"
      class="funi-devtools__pushpin w-26px h-26px flex justify-center items-center color-[var(--el-color-primary,#007fff)] pos-relative bg-#fff b-rd-full border-base shadow b-1 cursor-pointer z-1"
      @pointerdown="onPointerDown"
    >
      <Logo class="font-size-[1.4rem]" />
    </div>
    <DiaLog
      ref="dialog"
      :style="dialogStyle"
      :isVertical="isVertical"
      :state="state"
    ></DiaLog>
  </div>
</template>
