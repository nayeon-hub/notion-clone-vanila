import PostEditor from "./PostEditor.js";
import { request } from "../util/api.js";

export default function PostEditPage({
  $target,
  initialState,
  onChangeTitle,
  // onDeleteUndecidedItem,
}) {
  const $page = document.createElement("div");

  this.state = initialState;

  let timer = null;

  const postEditor = new PostEditor({
    $target: $page,
    initialState: { title: "", content: "" },
    onEditing: async (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        const isNew = this.state.postId === "new";
        const { title, content } = post;
        if (isNew) {
          if (!title && !content) {
            onDeleteUndecidedItem();
            return;
          }

          const createdPost = await request("/", {
            method: "POST",
            body: JSON.stringify({
              title: title === "" ? "제목없음" : title,
              parent: this.state.parentId,
            }),
          });

          await request(`/${createdPost.id}`, {
            method: "PUT",
            body: JSON.stringify({
              title,
              content,
            }),
          });

          history.replaceState(null, null, `/posts/${createdPost.id}`);

          onChangeTitle(title);

          this.setState({
            ...this.state,
            postId: createdPost.id.toString(),
          });
        } else {
          const editedPost = await request(`/${this.state.postId}`, {
            method: "PUT",
            body: JSON.stringify({
              title: title === "" ? "제목없음" : title,
              content,
            }),
          });
          this.setState({
            ...this.state,
            post: editedPost,
            postId: editedPost.id.toString(),
          });
        }
      }, 2000);
    },
    onChangeTitle,
  });

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      // postId가 변경됨 - new
      this.state = nextState;

      if (this.state.postId === "new") {
        this.render();
        postEditor.setState({
          title: "",
          content: "",
        });
        // postId가 변경됨 - 다른 Id
      } else {
        await fetchPost();
      }

      return;
    }

    this.state = nextState;
    postEditor.setState(this.state.post);

    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };

  this.render();

  const fetchPost = async () => {
    const { postId } = this.state; // string

    if (postId !== "new") {
      const post = await request(`/${postId}`);
      this.setState({
        ...this.state,
        post,
      });
    }
  };
}
