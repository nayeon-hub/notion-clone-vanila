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
        <div name="title" class="editor-title" contentEditable="true" placeholder="새페이지"></div>
        <div name="content" class="editor-content"contentEditable="true" placeholder="나만의 멋진 글을 작성해보세요!"></div>`;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.template = () => {};

  this.render = () => {
    $target.appendChild($editor);
    const { content, title } = this.state.post;

    const richContent = (content || "")
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

    $editor.querySelector("[name=title]").innerHTML = title;
    $editor.querySelector("[name=content]").innerHTML = richContent;
    (content || "").replace(/\n/g, "<br>");
  };

  this.render();

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    const nextState = {
      ...this.state,
      post: {
        ...this.state.post,
        title: e.target.innerHTML,
      },
    };

    onChangeTitle(nextState.post.title);
    onEditing(nextState);
  });

  $editor.querySelector("[name=content]").addEventListener("keyup", (e) => {
    let nextState = {
      ...this.state,
      post: {
        title: $editor.querySelector("[name=title]").innerHTML,
        content: e.target.innerText,
      },
    };

    onEditing(nextState);
  });

  $editor.querySelector("[name=title]").addEventListener("blur", (e) => {
    const nextState = {
      ...this.state,
      post: {
        ...this.state.post,
        title: e.target.innerHTML,
      },
    };

    this.setState(nextState);
  });

  $editor.querySelector("[name=content]").addEventListener("blur", (e) => {
    const nextState = {
      ...this.state,
      post: {
        title: $editor.querySelector("[name=title]").innerHTML,
        content: e.target.innerText,
      },
    };

    this.setState(nextState);
  });
}
