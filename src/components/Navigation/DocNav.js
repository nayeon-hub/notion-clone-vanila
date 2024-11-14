import NavHeader from "./NavHeader.js";
import Actions from "./Actions.js";
import DocList from "./DocList.js";

export default function DocumentNav({
  $target,
  initialState,
  onDocListItemSelect,
}) {
  // navigation
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
    $target,
    initialState,
  });

  const docList = new DocList({
    $target,
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

  this.template = () => {};

  this.render = () => {};

  this.init = () => {
    this.template();
    this.render();
  };

  this.init();
}
