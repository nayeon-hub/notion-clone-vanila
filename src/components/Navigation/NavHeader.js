import { push } from "../../router.js";

export default function NavHeader({ $target, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.template = () => {
    const $header = document.createElement("div");
    $header.className = "header";
    $header.innerHTML = `
      <div class="user-profile"></div>
      <span>🧙🏻‍♀️</span>
      나연의 Notion
    `;

    $header.addEventListener("click", (evt) => {
      evt.preventDefault();
      push("/");
    });

    $target.appendChild($header);
  };

  this.render = () => {};

  this.init = () => {
    this.template();
    this.render();
  };

  this.init();
}
