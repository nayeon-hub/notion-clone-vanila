export default function NavHeader({ $target, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.template = () => {
    // header
    const $header = document.createElement("div");
    $header.className = "header";
    $header.style.height = "27px";
    $header.style.fontSize = "17px";
    $header.style.fontWeight = "600";
    $header.innerHTML = `
      <div class="user-profile"></div>
      나연's Notion
    `;

    $target.appendChild($header);
  };

  this.render = () => {};

  this.init = () => {
    this.template();
    this.render();
  };

  this.init();
}
