import { getItem } from "../../util/storage.js";

export default function DocListItem({ $target, initialState }) {
  this.state = initialState;

  let $li = null;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.template = () => {
    $target.innerHTML = "";

    this.state.docs.map(({ id, title, documents }) => {
      $li = document.createElement("li");
      $li.className = "list-item";
      $li.id = id;
      $target.appendChild($li);

      const listStyle = getItem("listStyle", {});

      const $title = document.createElement("div");
      $title.className = "item-title";
      $title.innerHTML = ` 
          <div class="item-text" style="display : flex;">
            <button class="material-icons arrow__btn ${
              listStyle[id] ? "rotated" : "noRotated"
            }">play_arrow</button>
            <span class="text" style="width : ${
              165 - (this.state.depth - 1) * 28
            }px;">
              ${title || "제목 없음"}
            </span>
          </div>
          <div class="item-actions">
            <button class="material-icons add__btn">add</button>
            <button class="material-icons del__btn">delete</button>
          </div>`;
      $li.dataset.depth = this.state.depth;
      $li.appendChild($title);

      const $noChildNode = document.createElement("div");
      $noChildNode.className =
        documents.length > 0
          ? "no-child not__show"
          : listStyle[id]
          ? "no-child"
          : "no-child not__show";

      $noChildNode.innerText = "하위 메세지 없음";
      $noChildNode.style.paddingLeft = "28px";
      $noChildNode.style.height = "26px";
      $noChildNode.style.lineHeight = "26px";

      $li.appendChild($noChildNode);

      if (documents && documents.length > 0) {
        const $ul = document.createElement("ul");
        $li.appendChild($ul);
        $ul.className = listStyle[id] ? "" : "not__show";
        $ul.style.paddingLeft = "28px";

        new DocListItem({
          $target: $ul,
          initialState: {
            docs: documents,
            depth: this.state.depth + 1,
          },
        });
      }
    });
  };

  this.render = () => {
    this.template();
  };

  this.init = () => {
    this.render();
  };

  this.init();
}
