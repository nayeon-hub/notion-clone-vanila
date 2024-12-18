import { postCreateDoc, deleteDoc } from "../../util/clientServer.js";
import DocListItem from "./DocListItem.js";
import { push } from "../../router.js";
import { setItem, getItem } from "../../util/storage.js";
import {
  findTargetData,
  collectIdsData,
  closeDocData,
} from "../../util/processData.js";
export default function DocList({
  $target,
  initialState,
  onDocListItemSelect,
}) {
  const $nav = document.createElement("nav");
  $target.appendChild($nav);
  const $ul = document.createElement("ul");
  $nav.appendChild($ul);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    docListItem.setState({
      selectedId: this.state.selectedId,
      docs: this.state.docList,
      depth: 1,
    });
  };


  const docListItem = new DocListItem({
    $target: $ul,
    initialState: {
      docs: this.state.docList,
      selectedId: this.state.selectedId,
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
      push(`/posts/${id}`);
    }

    if (evt.target.className.includes("arrow__btn")) {
      const currentNode = evt.target.closest("li");

      const { id } = currentNode;

      if (evt.target.className.includes("rotated")) {
        evt.target.className = "material-icons arrow__btn noRotated";

        const targetedData = findTargetData(id, this.state.docList);
        const listStyle = closeDocData(targetedData);
        setItem("listStyle", listStyle);
        this.setState(this.state);
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
      const { id: parentId } = parentNode;
      const parentBtn = parentNode
        .querySelector(".item-title")
        .querySelector("button");

      const doc = await postCreateDoc(parentId);

      onDocListItemSelect(`${doc.id}`);
      push(`/posts/${doc.id}`);

      listStyle[doc.parentId] = true;
      listStyle[doc.id] = false;
      setItem("listStyle", listStyle);
      parentBtn.className = "material-icons arrow__btn rotated";
    }

    if (evt.target.className.includes("del__btn")) {
      if (confirm("해당 게시글을 삭제하시겠습니까?")) {
        let clickedUlNode = evt.target.closest("ul");
        let clickedUlChildNodes = clickedUlNode.childNodes;

        const parentNode = clickedUlNode.closest(".list-item");
        let parentId = null;

        if (parentNode) {
          parentId = parentNode.id;
        }

        const clickedLiNode = evt.target.closest("li");
        const currentId = clickedLiNode.id;

        const deletedDataObj = findTargetData(currentId, this.state.docList);
        const collectedIdArr = collectIdsData(deletedDataObj);

        await deleteDoc(collectedIdArr);

        if (currentId === this.state.selectedId) {
          if (parentId) push(`/posts/${parentId}`);
          else push("/");
        }

        if (clickedUlChildNodes.length === 1) {
          const noChildDivNode = clickedUlNode.previousSibling;
          noChildDivNode.className = "no-child";

          clickedUlNode.remove();

          delete listStyle[currentId];
          setItem("listStyle", listStyle);
        } else {
          clickedLiNode.remove();
        }
      }
    }
  });

  this.init = () => {
    this.render();
  };

  this.init();
}
