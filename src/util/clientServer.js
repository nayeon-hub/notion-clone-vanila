// import { SUPABASE_URL, SUPABASE_KEY } from "../various.js";
// import dotenv from "dotenv";

// dotenv.config();

// const { SUPABASE_URL, SUPABASE_KEY } = process.env;

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function dfs(visited, data, idx, currentDocuments) {
  currentDocuments.push({ ...data[idx], style: false });
  for (let i = 0; i < data.length; i++) {
    if (!visited[i] && data[i].parentId === data[idx].id) {
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

export const getDocuments = async () => {
  try {
    let { data: document } = await client
      .from("documents")
      .select("*")
      .order("createdAt", { ascending: true });

    const data = await document;
    const madeDocuments = [];

    const visited = new Array(data.length).fill(false);

    for (let i = 0; i < data.length; i++) {
      if (!visited[i] && !data[i].parentId) {
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

export const getDocument = async (id) => {
  try {
    let { data: document } = await client
      .from("documents")
      .select()
      .eq("id", id.toString());
    return document;
  } catch (err) {
    console.log(err);
  }
};

export const postEditDoc = async (id, title, content) => {
  try {
    let { data: document } = await client
      .from("documents")
      .update({ title: title, content: content })
      .eq("id", id.toString());

    return document;
  } catch (err) {
    console.log(err);
  }
};

export const postCreateDoc = async (parentId) => {
  try {
    let { data: document } = await client
      .from("documents")
      .insert([{ parentId: parentId, documents: [] }])
      .select();

    return document[0];
  } catch (err) {
    console.log(err);
  }
};

export const deleteDoc = async (id) => {
  try {
    const { data: document } = await client
      .from("documents")
      .delete()
      .eq("id", id.toString());

    return document;
  } catch (err) {
    console.log(err);
  }
};
