import DocumentNav from "./components/Navigation/DocNav.js";
import PostEditPage from "./components/PostEditPage.js";
import { getDocuments } from "./util/clientServer.js";
import { setItem } from "./util/storage.js";

export default function App({ $target }) {
  const $sidebar = document.createElement("div");
  $sidebar.className = "sidebar";
  $target.style.display = "flex";
  $target.appendChild($sidebar);

  const $contentPage = document.createElement("div");
  $contentPage.className = "contentPage";
  $target.appendChild($contentPage);

  this.state = {
    docList: [],
    selectedId: null,
    parentId: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;

    documentNav.setState({
      docList: this.state.docList,
      selectedId: this.state.selectedId,
    });

    postEditPage.setState({
      ...postEditPage.state,
      selectedId: this.state.selectedId,
    });

    this.render();
  };

  const documentNav = new DocumentNav({
    $target: $sidebar,
    initialState: {
      docList: this.state.docList,
      selectedId: this.state.selectedId,
    },
    onDocListItemSelect: async (selectedId) => {
      const documents = await getDocuments();
      this.setState({
        ...this.state,
        selectedId,
        docList: documents,
      });
    },
  });

  const postEditPage = new PostEditPage({
    $target: $contentPage,
    initialState: {
      selectedId: this.state.selectedId,
      selectedData: {},
    },
    onChangeTitle: (title) => {
      documentNav.editDocItemTitle(title);
    },
    onDeleteUndecidedItem: () => {
      documentNav.deleteUndecidedDocItem();
    },
  });

  const fetchAllData = async () => {
    const documents = await getDocuments();

    this.setState({
      ...this.state,
      docList: documents,
    });
  };

  this.render = () => {};

  const init = async () => {
    await fetchAllData();
  };

  init();
  // this.route();
  // initRouter(() => this.route());
  // window.addEventListener("popstate", () => this.route());
}
