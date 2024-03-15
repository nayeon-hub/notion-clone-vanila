import DocumentNav from "./components/Navigation/DocNav.js";
import PostEditPage from "./components/PostEditPage.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
  const $sidebar = document.createElement("div");
  $sidebar.className = "sidebar";
  $sidebar.style.padding = "10px";
  $sidebar.style.width = "26%";
  $sidebar.style.backgroundColor = "lavender";
  $target.style.display = "flex";
  $target.appendChild($sidebar);

  const $contentPage = document.createElement("div");
  $contentPage.className = "contentPage";
  $contentPage.style.width = "100%";
  $contentPage.style.backgroundColor = "#DEDAE3";
  $target.appendChild($contentPage);

  const postEditPage = new PostEditPage({
    $target: $contentPage,
    initialState: {
      postId: "new",
      post: { title: "", content: "" },
      parentId: null,
    },
    // onChangeTitle: (title) => {
    //   documentNav.editDocItemTitle(title);
    // },
    // onDeleteUndecidedItem: () => {
    //   documentNav.deleteUndecidedDocItem();
    // },
  });

  new DocumentNav({
    $target: $sidebar,
    initialState: [],
    onTitleClick: (id) => {
      postEditPage.setState({
        ...postEditPage.state,
        postId: id,
      });
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      $contentPage.innerHTML = "";
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , id] = pathname.split("/");
      // postEditPage.setState({
      //   ...postEditPage.state,
      //   postId: id,
      // });
    }
  };

  this.route();
  initRouter(() => this.route());

  // window.addEventListener("popstate", () => this.route());
}
