import type { Ref } from "vue";
import { ref, reactive, watchEffect, computed, watch, onMounted } from "vue";
import clamp from "./clamp";
import { setSelectNone, removeSelectNone } from "./userSelect";
import {
  useWindowSize,
  useScreenSafeArea,
  useEventListener,
  useLocalStorage,
} from "@vueuse/core";
import pixelToNumber from "./pixelToNumber";

interface DevToolsFrameState {
  width: number;
  height: number;
  top: number;
  left: number;
  open: boolean;
  position: string;
  isFirstVisit: boolean;
  dialogTop: number;
  dialogLeft: number;
  dialogWidth: number;
  dialogHeight: number;
}

const state = useLocalStorage<DevToolsFrameState>(
  "__funi-devtools-frame-state__",
  {
    top: 0,
    left: 50,
    width: 0,
    height: 0,
    open: false,
    position: "bottom",
    isFirstVisit: true,
    dialogTop: 0,
    dialogLeft: 0,
    dialogWidth: 0,
    dialogHeight: 0,
  }
);
function updateState(value: Partial<DevToolsFrameState>) {
  state.value = {
    ...state.value,
    ...value,
  };
}

function snapToPoints(value: number) {
  const SNAP_THRESHOLD = 2;

  if (value < 5) return 0;
  if (value > 95) return 100;
  if (Math.abs(value - 50) < SNAP_THRESHOLD) return 50;
  return value;
}

export default function (panelEl: Ref<HTMLElement | undefined>) {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const isDragging = ref(false);
  const draggingOffset = reactive({ x: 0, y: 0 });
  const panelMargins = reactive({
    left: 10,
    top: 10,
    right: 10,
    bottom: 10,
  });
  const safeArea = useScreenSafeArea();
  watchEffect(() => {
    panelMargins.left = pixelToNumber(safeArea.left.value) + 10;
    panelMargins.top = pixelToNumber(safeArea.top.value) + 10;
    panelMargins.right = pixelToNumber(safeArea.right.value) + 10;
    panelMargins.bottom = pixelToNumber(safeArea.bottom.value) + 10;
  });
  watch(isDragging, (value) => {
    if (value) setSelectNone();
    else removeSelectNone();
  });

  const onPointerDown = (e: PointerEvent) => {
    isDragging.value = true;
    const { left, top, width, height } = panelEl.value!.getBoundingClientRect();
    draggingOffset.x = e.clientX - left - width / 2;
    draggingOffset.y = e.clientY - top - height / 2;
  };
  const isVertical = computed(() => {
    return state.value.position === "left" || state.value.position === "right";
  });
  useEventListener("pointerup", () => {
    isDragging.value = false;
  });
  useEventListener("pointerleave", () => {
    isDragging.value = false;
  });
  useEventListener("pointermove", (e) => {
    if (!isDragging.value) return;
    const centerX = windowWidth.value / 2;
    const centerY = windowHeight.value / 2;
    const x = e.clientX - draggingOffset.x;
    const y = e.clientY - draggingOffset.y;
    const deg = Math.atan2(y - centerY, x - centerX);
    const HORIZONTAL_MARGIN = 70;
    const TL = Math.atan2(0 - centerY + HORIZONTAL_MARGIN, 0 - centerX);
    const TR = Math.atan2(
      0 - centerY + HORIZONTAL_MARGIN,
      windowWidth.value - centerX
    );
    const BL = Math.atan2(
      windowHeight.value - HORIZONTAL_MARGIN - centerY,
      0 - centerX
    );
    const BR = Math.atan2(
      windowHeight.value - HORIZONTAL_MARGIN - centerY,
      windowWidth.value - centerX
    );
    updateState({
      position:
        deg >= TL && deg <= TR
          ? "top"
          : deg >= TR && deg <= BR
          ? "right"
          : deg >= BR && deg <= BL
          ? "bottom"
          : "left",
      left: snapToPoints((x / windowWidth.value) * 100),
      top: snapToPoints((y / windowHeight.value) * 100),
    });
  });

  onMounted(() => {
    updateState({
      width: panelEl?.value?.offsetWidth ?? 0,
      height: panelEl?.value?.offsetHeight ?? 0,
    });
    useEventListener(panelEl, "click", (e) => {
      updateState({
        open: !state.value.open,
      });
    });
  });

  const anchorPos = computed(() => {
    const halfWidth = panelEl.value?.clientWidth || 0;
    const halfHeight = panelEl.value?.clientHeight || 0;
    const left = (state.value.left * windowWidth.value) / 100;
    const top = (state.value.top * windowHeight.value) / 100;
    switch (state.value.position) {
      case "top":
        return {
          left: clamp(
            left,
            panelMargins.left,
            windowWidth.value - halfWidth - panelMargins.right
          ),
          top: panelMargins.top,
        };
      case "right":
        return {
          left: windowWidth.value - panelMargins.right - halfHeight,
          top: clamp(
            top,
            halfWidth + panelMargins.top,
            windowHeight.value - halfWidth - panelMargins.bottom
          ),
        };
      case "left":
        return {
          left: panelMargins.left,
          top: clamp(
            top,
            halfWidth + panelMargins.top,
            windowHeight.value - halfWidth - panelMargins.bottom
          ),
        };
      case "bottom":
      default:
        return {
          left: clamp(
            left,
            panelMargins.left,
            windowWidth.value - halfWidth - panelMargins.right
          ),
          top: windowHeight.value - panelMargins.bottom - halfHeight,
        };
    }
  });
  const anchorStyle = computed(() => {
    return {
      left: `${anchorPos.value.left}px`,
      top: `${anchorPos.value.top}px`,
    };
  });

  const dialogStyle = computed(() => {
    let {
      open,
      isFirstVisit,
      dialogTop,
      dialogLeft,
      dialogHeight,
      dialogWidth,
      width,
      height,
    } = state.value;
    if (open && isFirstVisit) {
      if (!isVertical.value) {
        dialogHeight = windowHeight.value * 0.6;
        dialogWidth = windowWidth.value * 0.8;
        dialogTop = -dialogHeight + 10;
        dialogLeft = width / 2 - dialogWidth / 2;
      } else {
        dialogHeight = windowHeight.value * 0.8;
        dialogWidth = windowWidth.value * 0.6;
        dialogTop = height / 2 - dialogHeight / 2;
        dialogLeft = -windowWidth + 10;
      }

      updateState({
        isFirstVisit: false,
        dialogTop,
        dialogLeft,
        dialogHeight,
        dialogWidth,
      });
    }
 
    return {
      display: open ? "block" : "none",
      top: `${dialogTop}px`,
      left: `${dialogLeft}px`,
      height: `${dialogHeight}px`,
      width: `${dialogWidth}px`,
    };
  });

  return {
    panelMargins,
    onPointerDown,
    anchorStyle,
    isVertical,
    dialogStyle,
  };
}
