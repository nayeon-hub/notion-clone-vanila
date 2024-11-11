import PostEditor from "./PostEditor.js";
import { postEditDoc } from "../util/clientServer.js";
import { getDocument } from "../util/clientServer.js";

export default function PostEditPage({
  $target,
  initialState,
  onChangeTitle,
  onDeleteUndecidedItem,
}) {
  const $postEditLayout = document.createElement("div");
  $target.appendChild($postEditLayout);

  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;

    postEditor.setState({
      ...postEditor.state,
      title: this.state.selectedData.title,
      content: this.state.selectedData.content,
    });

    this.render();
  };

  const postEditor = new PostEditor({
    $target: $postEditLayout,
    initialState: { title: "", content: "" },
    onEditing: async ({ title, content }) => {
      postEditDoc(this.state.selectedId, title, content);
    },
    onChangeTitle,
  });

  this.render = () => {};

  this.render();
}
