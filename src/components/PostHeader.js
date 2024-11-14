import BreadCrumble from "./BreadCrumble.js";

export default function PostHeader({ $target, initialState }) {
  const $postHeader = document.createElement("div");
  $postHeader.className = "post-header";
  $target.appendChild($postHeader);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    breadCrumble.setState({
      ...breadCrumble.state,
      docList: this.state.docList,
      selectedId: this.state.selectedId,
    });
  };

  const breadCrumble = new BreadCrumble({
    $target: $postHeader,
    initialState: {
      docList: this.state.docList,
      selectedId: this.state.selectedId,
    },
  });

  this.template = () => {
    const $header = document.createElement("div");
    $header.className = "post-header";
  };
}
