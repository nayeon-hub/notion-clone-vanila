import { push } from "../router.js";
import { request } from "../util/api.js";

export default function PostEditor({
  $target,
  initialState,
  onEditing,
  onChangeTitle,
}) {
  const $editor = document.createElement("div");
  $editor.className = "editor";

  this.state = initialState;

  $editor.innerHTML = `
        <div name="title" class="editor-title" contentEditable="true"></div>
        <div name="content" class="editor-content"contentEditable="true"></div>
        <button>삭제</button>`;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.template = () => {};

  this.render = () => {
    $target.appendChild($editor);

    const richContent = (this.state.content || "")
      .split("\n")
      .map((line) => {
        if (line.indexOf("# ") === 0) {
          return `<h1>${line.substring(2)}</h1>`;
        } else if (line.indexOf("## ") === 0) {
          return `<h2>${line.substring(3)}</h2>`;
        } else if (line.indexOf("### ") === 0) {
          return `<h3>${line.substring(4)}</h3>`;
        }
        return line;
      })
      .join("<br>");

    $editor.querySelector("[name=title]").innerHTML =
      this.state.title === "" ? "제목없음" : this.state.title;
    $editor.querySelector("[name=content]").innerHTML = richContent;
    (this.state.content || "").replace(/\n/g, "<br>");
  };

  this.render();

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    const nextState = {
      ...this.state,
      title: e.target.innerHTML,
    };

    onChangeTitle(e.target.innerHTML);
    onEditing(nextState);
  });

  $editor.querySelector("[name=content]").addEventListener("keyup", (e) => {
    let nextState = {
      ...this.state,
      title: $editor.querySelector("[name=title]").innerHTML,
      content: e.target.innerText,
    };

    onEditing(nextState);
  });

  $editor.querySelector("[name=title]").addEventListener("blur", (e) => {
    const nextState = {
      ...this.state,
      title: e.target.innerHTML,
    };

    this.setState(nextState);
  });

  $editor.querySelector("[name=content]").addEventListener("blur", (e) => {
    const nextState = {
      ...this.state,
      title: $editor.querySelector("[name=title]").innerHTML,
      content: e.target.innerText,
    };

    this.setState(nextState);
  });

  $editor.querySelector("button").addEventListener("click", async () => {
    const { pathname } = window.location;
    const [, , id] = pathname.split("/");

    if (confirm("해당 게시글을 삭제하시겠습니까?")) {
      await request(`/${id}`, {
        method: "DELETE",
      });
      push("/");
    }
  });
}
