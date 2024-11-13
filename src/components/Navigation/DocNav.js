import { request } from "../../util/api.js";
import NavHeader from "./NavHeader.js";
import Actions from "./Actions.js";
import DocList from "./DocList.js";

export default function DocumentNav({
  $target,
  initialState,
  onDocListItemSelect,
}) {
  // navigation
  const $nav = document.createElement("nav");
  $target.appendChild($nav);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    docList.setState({
      ...docList.state,
      docList: this.state.docList,
      selectedId: this.state.selectedId,
    });
    actions.setState(this.state.docList);
  };

  new NavHeader({
    $target: $nav,
    initialState,
  });

  const docList = new DocList({
    $target: $nav,
    initialState: {
      docList: this.state.docList,
      selectedId: this.state.selectedId,
    },
    onDocListItemSelect,
  });

  const actions = new Actions({
    $target,
    initialState,
    onDocListItemSelect,
  });

  this.editDocItemTitle = (title) => {
    const { pathname } = window.location;
    const [, , id] = pathname.split("/");
    const $navLi = document.getElementById(`${id}`);
    const $title = $navLi.querySelector(".item-title").querySelector(".text");
    $title.innerHTML = title;
  };

  this.template = () => {};

  this.render = () => {};

  this.init = () => {
    this.template();
    this.render();
  };

  this.init();
}
