import PostEditor from "./PostEditor.js";
import { postEditDoc } from "../util/clientServer.js";
import { getDocument } from "../util/clientServer.js";
import { push } from "../router.js";
import PostHeader from "./PostHeader.js";

export default function PostEditPage({
  $target,
  initialState,
  onChangeTitle,
  onDeleteItem,
  onSelectId,
}) {
  const $postEditLayout = document.createElement("div");
  $postEditLayout.className = "post-edit-layout";

  this.state = initialState;

  let timer = null;

  this.setState = async (nextState) => {
    this.state = nextState;

    if (Boolean(this.state.selectedId)) {
      const data = await getDocument(this.state.selectedId);
      const post = data[0];

      postEditor.setState({
        ...postEditor.state,
        post,
      });

      postHeader.setState({
        ...postHeader.state,
        docList: this.state.docList,
        selectedId: this.state.selectedId,
        post,
      });
    }

    this.render();
  };

  const postHeader = new PostHeader({
    $target: $postEditLayout,
    initialState: {
      docList: this.state.docList,
      selectedId: this.state.selectedId,
      post: this.state.selectedData,
    },
    onDeleteItem,
    onSelectId,
  });

  const postEditor = new PostEditor({
    $target: $postEditLayout,
    initialState: {
      post: this.state.selectedData,
    },
    onEditing: async ({ post: { title, content } }) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        const isNew = this.state.selectedId === "new";

        if (isNew) {
          const doc = await postEditDoc(this.state.selectedId, title, content);
          push(`/posts/${doc.id}`);
        } else {
          await postEditDoc(this.state.selectedId, title, content);
        }
      }, 1000);
    },
    onChangeTitle,
  });

  this.render = () => {
    if (this.state.selectedId) {
      $target.appendChild($postEditLayout);
    }
  };

  this.render();
}
