export default function Actions({ $target, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.template = () => {
    const $actions = document.createElement("div");
    $actions.innerHTML = `
      <div class="action">
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
}
