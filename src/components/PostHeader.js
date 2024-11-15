import BreadCrumble from "./BreadCrumble.js";
import { getItem, setItem } from "../util/storage.js";
import { deleteDoc } from "../util/clientServer.js";
import { push } from "../router.js";

export default function PostHeader({ $target, initialState, onDeleteItem }) {
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
    const $button = document.createElement("button");
    $button.className = "post-delete-button";
    $button.innerText = "삭제";
    $postHeader.appendChild($button);
  };

  this.init = () => {
    this.template();
  };

  this.init();

  $postHeader.querySelector("button").addEventListener("click", async () => {
    const { pathname } = window.location;
    const [, , id] = pathname.split("/");
    const {
      post: { parentId },
    } = this.state;

    const listStyle = getItem("listStyle", {});
    delete listStyle[id];
    setItem("listStyle", listStyle);

    if (confirm("해당 게시글을 삭제하시겠습니까?")) {
      await deleteDoc(id);
      onDeleteItem(parentId);
      if (parentId) push(`/posts/${parentId}`);
      else push("/");
    }
  });
}
