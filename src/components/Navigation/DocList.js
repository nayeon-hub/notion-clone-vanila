import { readDocs, createDoc, deleteDoc } from "../../util/api.js";
import DocListItem from "./DocListItem.js";

export default function DocList({
  $target,
  initialState,
  onTitleClick,
  onValueChange,
}) {
  const $ul = document.createElement("ul");
  $target.appendChild($ul);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    docListItem.setState({
      doc: this.state,
      depth: 1,
    });
  };

  const docListItem = new DocListItem({
    $target: $ul,
    initialState: {
      doc: this.state,
      depth: 1,
    },
  });

  this.render = () => {};

  $ul.addEventListener("click", async (evt) => {
    evt.preventDefault();

    if (evt.target.className === "text") {
      const { id } = evt.target.closest("li");
      onTitleClick(id);
    }

    if (evt.target.className.includes("arrow__btn")) {
      const $ul = evt.target.closest("li").querySelector("ul");

      if ($ul) {
        $ul.className = $ul.className === "not__show" ? "" : "not__show";
      } else {
        const noShowDiv = evt.target.closest(".title").nextSibling;
        noShowDiv.className =
          noShowDiv.className === "no-children not__show"
            ? ""
            : "no-children not__show";
      }
    }

    if (evt.target.className.includes("add__btn")) {
      const parentNode = evt.target.closest("li");
      const parentDepth = parentNode.dataset.depth;
      const parentId = parentNode.id;
      const doc = await createDoc("/", {
        body: JSON.stringify({
          title: "",
          parent: parentId,
        }),
      });

      let $childUlNode = parentNode.querySelector("ul");

      if (!$childUlNode) {
        const noShowDiv = evt.target.closest(".title").nextSibling;
        noShowDiv.className = "no-children not__show";

        const $ul = document.createElement("ul");
        $ul.style.paddingLeft = "28px";
        parentNode.appendChild($ul);
        $childUlNode = parentNode.querySelector("ul");
      }

      $childUlNode.className = "";

      new DocListItem({
        $target: $childUlNode,
        initialState: {
          doc: [{ ...doc, documents: [] }],
          depth: parseInt(parentDepth) + 1,
        },
      });
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
