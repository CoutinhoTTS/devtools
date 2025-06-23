import { defineCustomElement } from "vue";
import css from "../.generated/css";
import Component from "./index.vue";

export const Entry = defineCustomElement(Component, {
  shadowRoot: true,
  styles: [css],
});

if (typeof window !== "undefined" && "customElements" in window) {
  customElements.define("funi-devtools", Entry);
}
