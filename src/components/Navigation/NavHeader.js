export default function NavHeader({ $target, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.template = () => {
    // header
    const $header = document.createElement("div");
    $header.className = "header";
    $header.innerHTML = `
      <div class="user-profile"></div>
      Yeon's Notion
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
