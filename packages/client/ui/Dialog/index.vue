<script setup lang="ts">
import { computed, ref } from "vue";
import Logo from "./../Logo/idnex.vue";
import { Icon } from "@iconify/vue";
import type { DevToolsFrameState } from "../../hooks/position";
const dialog = ref<HTMLElement | undefined>();
const props = defineProps({
  isVertical: {
    type: Boolean,
    default: false,
  },
  state: Object,
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
const resizeList = computed(() => {
  return [
    {
      name: "TOP",
      type: "horizontal",
      disabled: ["top"].includes(position.value),
      style: {
        top: "-6px",
        ...H_STYLE,
      },
    },
    {
      name: "BOTTOM",
      type: "horizontal",
      disabled: ["bottom"].includes(position.value),
      style: {
        bottom: "-6px",
        ...H_STYLE,
      },
    },
    {
      name: "LEFT",
      type: "vertical",
      disabled: ["left"].includes(position.value),
      style: {
        left: "-6px",
        ...V_STYLE,
      },
    },
    {
      name: "RIGHT",
      type: "vertical",
      disabled: ["right"].includes(position.value),
      style: {
        right: "-6px",
        ...V_STYLE,
      },
    },

    {
      name: "TOP-RIGHT",
      type: "corner",
      disabled: ["top", "right"].includes(position.value),
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
      disabled: ["top", "left"].includes(position.value),
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
      disabled: ["bottom", "right"].includes(position.value),
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
      disabled: ["bottom", "left"].includes(position.value),
      style: {
        ...C_STYLE,
        bottom: "-8px",
        left: "-8px",
        cursor: "nesw-resize",
      },
    },
  ];
});
const menuConfig = {
  page: [
    {
      name: "页面",
      icon: "qlementine-icons:page-setup-16",
    },
    {
      name: "应用",
      icon: "streamline-logos:microsoft-windows-logo-3",
    },
    {
      name: "服务",
      icon: "fluent:app-title-24-regular",
    },
  ],
  auth: [
    {
      name: "角色",
      icon: "carbon:user-role",
    },
    {
      name: "用户",
      icon: "la:user-solid",
    },
  ],
  ai: [
    {
      name: "ai",
      icon: "ri:anthropic-line",
    },
  ],
};

const position = computed(() => {
  const state = props.state as DevToolsFrameState;
  return state?.position ?? "bottom";
});

defineExpose({ dialog });
</script>
<template>
  <div
    ref="dialog"
    :isVertical="props.isVertical"
    class="b-1 border-base b-rd-10px absolute bg-#fff"
  >
    <div class="absolute inset-0 overflow-hidden b-rd-10px">
      <div
        class="left-menu w-50px b-r-1 border-base h-full flex flex-col justify-start items-center"
      >
        <div
          class="devtools-logo w-full h-50px flex justify-center items-center b-b-1 border-base"
        >
          <div
            class="w-40px h-40px font-size-40px cursor-pointer b-rd-5px hover:bg-gray-100/70 hover:color-[var(--el-color-primary,#007fff)] transition-colors duration-300"
          >
            <Logo></Logo>
          </div>
        </div>
        <div
          class="w-full h-[calc(100% - 50px)] overflow-hidden flex flex-col justify-start items-center"
        >
          <div
            v-for="(types, key) in menuConfig"
            :key="key"
            class="menu-config flex flex-col justify-start items-center gap-10px py-10px px-2px w-max b-b-1 border-base"
          >
            <div
              v-for="item in types"
              :key="item.name"
              class="w-35px h-35px font-size-23px flex justify-center items-center cursor-pointer b-rd-5px hover:bg-gray-100/70 transition-colors duration-300"
            >
              <Icon :icon="item.icon"></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="item in resizeList"
      :style="{
        ...item.style,
        cursor: item.disabled ? 'auto' : item.style.cursor,
      }"
      :class="{ 'hover-bg-gray-200/70': !item.disabled }"
      class="absolute transition-colors"
      :key="item.name"
    ></div>
  </div>
</template>
