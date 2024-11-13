import { push } from "../../router.js";
import { postCreateDoc } from "../../util/clientServer.js";

export default function Actions({
  $target,
  initialState,
  onDocListItemSelect,
}) {
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

    $target.appendChild($actions);
  };

  this.render = () => {};

  this.init = () => {
    this.template();
    this.render();
  };

  this.init();

  const $createAction = $target.querySelector(".create-action");

  $createAction.addEventListener("click", async () => {
    const doc = await postCreateDoc(null);
    push(`/posts/${doc.id}`);
    onDocListItemSelect(`${doc.id}`);
  });
}
