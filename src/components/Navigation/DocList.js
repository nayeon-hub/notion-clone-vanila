import { readDocs, createDoc, deleteDoc } from "../../util/api.js";
import DocListItem from "./DocListItem.js";

export default function DocList({ $target, initialState, onValueChange }) {
  const $ul = document.createElement("ul");
  $target.appendChild($ul);

  this.state = initialState;

  const docListItem = new DocListItem({
    $target: $ul,
    initialState: {
      doc: this.state,
      depth: 1,
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    docListItem.setState({
      doc: this.state,
      depth: 1,
    });
  };

  this.render = () => {};

  $ul.addEventListener("click", async (evt) => {
    evt.preventDefault();

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
      const parentId = parentNode.id;
      const doc = await createDoc("/", {
        body: JSON.stringify({
          title: "",
          parent: parentId,
        }),
      });

      let $childUlNode = parentNode.querySelector("ul");
      const $li = document.createElement("li");

      $li.id = doc.id;

      if (!$childUlNode) {
        const $ul = document.createElement("ul");
        parentNode.appendChild($ul);
        $childUlNode = parentNode.querySelector("ul");
      }

      $childUlNode.className = "";
      $ul.style.paddingLeft = `${(this.state.depth + 1) * 14}px`;

      new DocListItem({
        $target: $childUlNode,
        initialState: { doc: [{ ...doc, documents: [] }] },
      });
    }

    if (evt.target.className.includes("del__btn")) {
      const currentId = evt.target.closest("li").id;
      await deleteDoc(`/${currentId}`);
    }
  });

  this.init = () => {
    this.render();
  };

  this.init();
}
