import DocumentNav from "./components/Navigation/DocNav.js";
import PostEditPage from "./components/PostEditPage.js";
import { getDocuments } from "./util/clientServer.js";
import { getDocument } from "./util/clientServer.js";

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
  };

  this.setState = (nextState) => {
    this.state = nextState;

    documentNav.setState({
      docList: this.state.docList,
    });

    this.render();
  };

  const documentNav = new DocumentNav({
    $target: $sidebar,
    initialState: {
      docList: this.state.docList,
    },
    onDocListItemSelect: async (id) => {
      await fetchSelectedDoc(id);
    },
  });

  const postEditPage = new PostEditPage({
    $target: $contentPage,
    initialState: {
      selectedId: null,
      selectedData: {},
    },
    onChangeTitle: (title) => {
      documentNav.editDocItemTitle(title);
    },
    onDeleteUndecidedItem: () => {
      documentNav.deleteUndecidedDocItem();
    },
  });

  const fetchSelectedDoc = async (id) => {
    if (id) {
      const data = await getDocument(id);
      postEditPage.setState({
        ...postEditPage.state,
        selectedId: id,
        selectedData: data[0],
      });
    }
  };

  const fetchAllData = async () => {
    const documents = await getDocuments();

    this.setState({
      ...this.state,
      docList: documents,
    });
  };

  this.render = () => {};

  const init = () => {
    fetchAllData();
  };

  init();
  // this.route();
  // initRouter(() => this.route());
  // window.addEventListener("popstate", () => this.route());
}
