import { request } from "../../util/api.js";
import NavHeader from "./NavHeader.js";
import Actions from "./Actions.js";
import DocList from "./DocList.js";

export default function DocumentNav({ $target, initialState }) {
  // navigation
  const $nav = document.createElement("nav");
  $target.appendChild($nav);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    docList.setState(this.state);
  };

  new NavHeader({
    $target: $nav,
    initialState,
  });

  const docList = new DocList({
    $target: $nav,
    initialState,
    onValueChange: () => {
      fetchDocList();
    },
  });

  new Actions({
    $target,
    initialState,
  });

  this.template = () => {};

  const fetchDocList = async () => {
    let docList = await request("/");
    this.setState(docList);
  };

  this.render = () => {};

  this.init = () => {
    fetchDocList();
    this.template();
    this.render();
  };

  this.init();
}
