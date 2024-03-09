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
      $title.className = "title";
      $title.innerHTML = ` 
          <span class="material-icons arrow__btn">play_arrow</span>
          <span class="text">
            ${title || "제목 없음"}
          </span>
          <div class="actions">
            <span class="material-icons add__btn">add</span>
            <span class="material-icons del__btn">delete</span>
          </div>`;
      $li.dataset.depth = this.state.depth;
      $li.appendChild($title);

      if (documents.length > 0) {
        const $ul = document.createElement("ul");
        $li.appendChild($ul);
        $ul.className = "not__show";
        $ul.style.paddingLeft = `${(this.state.depth + 1) * 14}px`;

        new DocListItem({
          $target: $ul,
          initialState: {
            doc: documents,
            depth: this.state.depth + 1,
          },
        });
      } else {
        const $noChildren = document.createElement("div");
        $noChildren.className = "no-children not__show";
        $noChildren.innerText = "하위 메세지가 없습니다.";

        $li.appendChild($noChildren);
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
