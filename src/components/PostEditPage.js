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

  let timer = null;

  this.setState = async (nextState) => {
    this.state = nextState;
    console.log(this.state.selectedId);

    if (this.state.selectedId) {
      const data = await getDocument(this.state.selectedId);
      const { title, content } = data[0];

      postEditor.setState({
        ...postEditor.state,
        title,
        content,
      });
    }

    this.render();
  };

  const postEditor = new PostEditor({
    $target: $postEditLayout,
    initialState: {
      title: this.state.selectedData.title,
      content: this.state.selectedData.content,
    },
    onEditing: async ({ title, content }) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        const isNew = this.state.selectedId === "new";

        if (isNew) {
          const doc = await postEditDoc(this.state.selectedId, title, content);
          history.replaceState(null, null, `/post/${doc.id}`);
        } else {
          await postEditDoc(this.state.selectedId, title, content);
        }
      }, 2000);
    },
    onChangeTitle,
  });

  this.render = () => {};

  this.render();
}
