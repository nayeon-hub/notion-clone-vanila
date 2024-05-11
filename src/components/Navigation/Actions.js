import { push } from "../../router.js";

export default function Actions({ $target, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.template = () => {
    const $actions = document.createElement("div");
    $actions.className = "create-actions-box";
    $actions.innerHTML = `
      <div class="create-action">
        <span class="material-icons">add</span> 새로운 페이지
      </div>
    `;

    $actions.addEventListener("click", (evt) => {
      evt.preventDefault();
      push("/posts/new");
    });

    $target.appendChild($actions);
  };

  this.render = () => {};

  this.init = () => {
    this.template();
    this.render();
  };

  this.init();
}
