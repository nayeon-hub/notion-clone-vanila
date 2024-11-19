import { push } from "../router.js";
import { collectRoutesData } from "../util/processData.js";

export default function BreadCrumble({ $target, initialState }) {
  const $breadCrumble = document.createElement("div");
  $breadCrumble.className = "post-breadCrumble";
  $target.appendChild($breadCrumble);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.template = () => {
    const routesData = collectRoutesData(
      this.state.docList,
      this.state.selectedId
    );
    $breadCrumble.innerHTML = routesData
      .map(
        ({ id, title }, idx) =>
          `${
            idx ? `<span class="bar">/</span>` : ""
          }<span id=${id} class="breadCrumble-item">${
            title === "" ? "제목없음" : title
          }</span>`
      )
      .join("");
  };

  this.render = () => {
    this.template();
  };

  this.init = () => {
    this.render();
  };

  this.init();

  $breadCrumble.addEventListener("click", (evt) => {
    const { id: routeId } = evt.target;

    if (routeId) push(`/posts/${routeId}`);
  });
}
