import { SUPABASE_URL, SUPABASE_KEY } from "../various.js";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function dfs(visited, data, idx, currentDocuments) {
  currentDocuments.push(data[idx]);
  for (let i = 0; i < data.length; i++) {
    if (!visited[i] && data[i].parent === data[idx].id) {
      visited[i] = true;
      dfs(
        visited,
        data,
        i,
        currentDocuments[currentDocuments.length - 1].documents
      );
      visited[i] = false;
    }
  }
}

export const getData = async () => {
  try {
    let { data: document, error } = await client
      .from("documents")
      //   .insert({
      //   parent: 26,
      //   documents: [],
      //   title: "최상위다큐먼트 예시",
      // });
      .select("*");

    const data = await document;
    const madeDocuments = [];

    const visited = new Array(data.length).fill(false);

    for (let i = 0; i < data.length; i++) {
      if (!visited[i] && !data[i].parent) {
        visited[i] = true;
        dfs(visited, data, i, madeDocuments);
        visited[i] = false;
      }
    }
    return madeDocuments;
  } catch (err) {
    console.log(err);
  }
};
