import ExampleComponent from "./component/demo.vue";
import { createApp } from "vue";
export const injectDiv = (elementId: string) => {
  let element = document.getElementById(elementId);
  if (!element) {
    element = document.createElement("div");
    element.id = elementId;
    document.body.appendChild(element);
  }
  createApp(ExampleComponent).mount(element);
};
