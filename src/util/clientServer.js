import { SUPABASE_URL, SUPABASE_KEY } from "../various.js";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export const getData = async () => {
  try {
    let { data: document, error } = await client
      .from("documents")
      // .insert({  documents: [] });
      .select("*");

    return await document;
  } catch (err) {
    console.log(err);
  }
};
