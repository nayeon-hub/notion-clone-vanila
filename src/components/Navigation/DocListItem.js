// test
export default function DocListItem({ $target, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.template = () => {
    this.state.doc.map(({ id, title, documents }) => {
      const $li = document.createElement("li");
      $li.id = id;
      $target.appendChild($li);

      const $title = document.createElement("div");
      $title.style.height = "26px";
      $title.style.display = "flex";
      $title.style.alignItems = "center";
      $title.className = "title";
      $title.innerHTML = ` 
          <span class="material-icons arrow__btn">play_arrow</span>
          <span class="text" style="display : block; text-overflow : ellipsis; white-space : nowrap; width : ${
            165 - (this.state.depth - 1) * 28
          }px; overflow : hidden;">
            ${title || "제목 없음"}
          </span>
          <div class="actions">
            <span class="material-icons add__btn">add</span>
            <span class="material-icons del__btn">delete</span>
          </div>`;
      $li.dataset.depth = this.state.depth;
      $li.appendChild($title);

      const $noChildren = document.createElement("div");
      $noChildren.className = "no-children not__show";
      $noChildren.innerText = "하위 메세지 없음";
      $noChildren.style.paddingLeft = "28px";
      $noChildren.style.height = "26px";
      $noChildren.style.lineHeight = "26px";

      $li.appendChild($noChildren);

      if (documents.length > 0) {
        const $ul = document.createElement("ul");
        $li.appendChild($ul);
        $ul.className = "not__show";
        $ul.style.paddingLeft = "28px";

        new DocListItem({
          $target: $ul,
          initialState: {
            doc: documents,
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
