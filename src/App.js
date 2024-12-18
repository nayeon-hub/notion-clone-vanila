import DocumentNav from "./components/Navigation/DocNav.js";
import PostEditPage from "./components/PostEditPage.js";
import { getDocuments } from "./util/clientServer.js";
import { initRouter } from "./router.js";

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
      docList: this.state.docList,
      selectedId: this.state.selectedId,
    });
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
      docList: this.state.docList,
    },
    onChangeTitle: (title) => {
      const { pathname } = window.location;
      const [, , id] = pathname.split("/");
      const $nav = document.querySelector(".sidebar").querySelector("nav");
      const $navLi = $nav.querySelector(`[id='${id}']`);
      const $title = $navLi.querySelector(".item-title").querySelector(".text");
      $title.innerHTML = title;

      const $postHeader = document.querySelector(".post-header");
      const $postBread = $postHeader.querySelector(".post-breadCrumble");
      const $breadItem = $postBread.querySelector(`[id='${id}']`);
      $breadItem.innerHTML = title;
    },
    onDeleteItem: async (parentId) => {
      const documents = await getDocuments();
      this.setState({
        ...this.state,
        selectedId: parentId,
        docList: documents,
      });
    },
    onSelectId: (selectedId) => {
      this.setState({
        ...this.state,
        selectedId,
      });
    },
  });

  const fetchAllData = async () => {
    const documents = await getDocuments();

    this.setState({
      ...this.state,
      docList: documents,
    });
  };

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      $contentPage.innerHTML = "";
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , id] = pathname.split("/");
      postEditPage.setState({
        ...postEditPage.state,
        selectedId: id,
      });
    }
  };

  const init = async () => {
    await fetchAllData();
  };

  init();
  this.route();
  initRouter(() => this.route());
  window.addEventListener("popstate", () => this.route());
}
