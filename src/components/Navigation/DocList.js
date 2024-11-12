import { deleteDoc } from "../../util/api.js";
import { postCreateDoc } from "../../util/clientServer.js";
import DocListItem from "./DocListItem.js";
import { push } from "../../router.js";
import { setItem, getItem } from "../../util/storage.js";

export default function DocList({
  $target,
  initialState,
  onDocListItemSelect,
  onDocList,
}) {
  const $ul = document.createElement("ul");
  $target.appendChild($ul);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    docListItem.setState({
      docs: this.state.docList,
      depth: 1,
    });
  };

  const docListItem = new DocListItem({
    $target: $ul,
    initialState: {
      docs: this.state.docList,
      depth: 1,
    },
  });

  this.render = () => {};

  $ul.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const listStyle = getItem("listStyle", {});

    if (evt.target.className === "text") {
      const { id } = evt.target.closest("li");
      onDocListItemSelect(id);
      history.pushState(null, null, `/posts/${id}`);
    }

    if (evt.target.className.includes("arrow__btn")) {
      const currentNode = evt.target.closest("li");

      const { id } = currentNode;

      if (evt.target.className.includes("rotated")) {
        evt.target.className = "material-icons arrow__btn noRotated";
        listStyle[id] = false;
        setItem("listStyle", listStyle);
      } else {
        evt.target.className = "material-icons arrow__btn rotated";
        listStyle[id] = true;
        setItem("listStyle", listStyle);
      }

      const selectedNode = evt.target.closest(".item-text");
      const listItemNode = selectedNode.closest(".list-item");
      const listItemChildDiv = listItemNode.querySelector(".no-child");
      const listItemChildUl = listItemNode.querySelector("ul");

      if (listItemChildUl) {
        listItemChildUl.className =
          listItemChildUl.className === "not__show" ? "" : "not__show";
      } else {
        listItemChildDiv.className =
          listItemChildDiv.className === "no-child not__show"
            ? "no-child"
            : "no-child not__show";
      }
    }

    if (evt.target.className.includes("add__btn")) {
      const parentNode = evt.target.closest("li");
      const parentDepth = parentNode.dataset.depth;
      const { id: parentId } = parentNode;

      const doc = await postCreateDoc(parentId);

      history.replaceState(null, null, `/post/${doc.id}`);

      let $childUlNode = parentNode.querySelector("ul");

      const listStyle = getItem("listStyle", {});
      listStyle[id] = false;
      setItem("listStyle", listStyle);

      if (!$childUlNode) {
        const noShowDiv = evt.target.closest(".item-title").nextSibling;
        noShowDiv.className = "no-children not__show";

        const $ul = document.createElement("ul");
        $ul.style.paddingLeft = "28px";
        parentNode.appendChild($ul);
        $childUlNode = parentNode.querySelector("ul");
      } else {
        const $li = document.createElement("li");
        $li.className = "list-item";
        $li.id = doc.id;
        $target.appendChild($li);
        const $title = document.createElement("div");
        $title.className = "item-title";
        $title.innerHTML = `
            <div class="item-text" style="display : flex;">
              <button class="material-icons arrow__btn noRotated">play_arrow</button>
              <span class="text" style="width : ${
                165 - parseInt(parentDepth) * 28
              }px;">
                제목 없음
              </span>
            </div>
            <div class="item-actions">
              <button class="material-icons add__btn">add</button>
              <button class="material-icons del__btn">delete</button>
            </div>`;
        $li.dataset.depth = parseInt(parentDepth) + 1;
        $li.appendChild($title);
        $childUlNode.appendChild($li);
      }

      $childUlNode.className = "";
    }

    if (evt.target.className.includes("del__btn")) {
      let $clickedUl = evt.target.closest("ul");
      let clickedUlChildNodes = $clickedUl.childNodes;

      let $clickedLi = evt.target.closest("li");
      const currentId = $clickedLi.id;
      await deleteDoc(`/${currentId}`);
      $clickedLi.remove();

      if (clickedUlChildNodes.length === 0) {
        const noShowDiv = $clickedUl.previousSibling;
        noShowDiv.className = "";
        $clickedUl.remove();
      }
    }
  });

  this.init = () => {
    this.render();
  };

  this.init();
}
