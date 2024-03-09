import DocumentList from "./components/Navigation/DocNav.js";
// import PostEditPage from "./components/PostEditPage.js";
// import { initRouter } from "./router.js";

export default function App({ $target }) {
  // $target.style.display = "flex";
  // const $sidebar = document.createElement("div");
  // $sidebar.className = "sidebar";
  // $target.appendChild($sidebar);

  // const $contentPage = document.createElement("div");
  // $contentPage.className = "contentPage";
  // $target.appendChild($contentPage);

  const documentList = new DocumentList({
    $target: $target,
    initialState: [],
    // onClick: (id) => {
    //   postEditPage.setState({
    //     ...postEditPage.state,
    //     parentId: id,
    //   });
    // },
  });

  // const postEditPage = new PostEditPage({
  //   $target: $contentPage,
  //   initialState: {
  //     postId: "new",
  //     post: { title: "", content: "" },
  //     parentId: null,
  //   },
  //   onChangeTitle: (title) => {
  //     documentList.editDocItemTitle(title);
  //   },
  //   onDeleteUndecidedItem: () => {
  //     documentList.deleteUndecidedDocItem();
  //   },
  // });

  // this.route = () => {
  //   $contentPage.innerHTML = "";
  //   const { pathname } = window.location;

  //   if (pathname.indexOf("/posts/") === 0) {
  //     const [, , id] = pathname.split("/");
  //     postEditPage.setState({
  //       ...postEditPage.state,
  //       postId: id,
  //     });
  //   } else if (pathname === "/") {
  //     $contentPage.innerHTML = "";
  //   }
  // };
  // this.route();
  // initRouter(() => this.route());

  // window.addEventListener("popstate", () => this.route());
}
