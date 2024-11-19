import { getItem } from "./storage";

function findDfs(data, targetId) {
  if (data.id === targetId) return data;

  for (let i = 0; i < data.documents.length; i++) {
    const targetData = findDfs(data.documents[i], targetId);
    if (targetData) return targetData;
  }

  return null;
}

export function findTargetData(targetId, documents) {
  let targetData = null;

  for (let i = 0; i < documents.length; i++) {
    targetData = findDfs(documents[i], parseInt(targetId));

    if (targetData) return targetData;
  }
}

function collectDfs(data, collectData) {
  collectData.value.push(data.id.toString());

  for (let i = 0; i < data.documents.length; i++) {
    collectDfs(data.documents[i], collectData);
  }
}

export function collectIdsData(data) {
  const collectData = { value: [] };

  collectDfs(data, collectData);

  return collectData.value;
}

function exploreDfs(data, routesData, targetId) {
  routesData.push({ id: data.id, title: data.title });

  if (data.id === targetId) return true;

  for (let i = 0; i < data.documents.length; i++) {
    const flag = exploreDfs(data.documents[i], routesData, targetId);

    if (flag) return true;

    routesData.pop();
  }

  return false;
}

export function collectRoutesData(documents, targetId) {
  const routesData = [];

  if (!targetId) return routesData;

  for (let i = 0; i < documents.length; i++) {
    const value = exploreDfs(documents[i], routesData, parseInt(targetId));
    if (value) return routesData;
    routesData.pop();
  }

  return routesData;
}

function closeStyleDfs(data, styleData) {
  styleData.value[data.id] = false;

  for (let i = 0; i < data.documents.length; i++) {
    closeStyleDfs(data.documents[i], styleData);
  }
}

export function closeDocData(data) {
  const listStyle = getItem("listStyle", []);
  const styleData = { value: listStyle };
  styleData.value[data.id] = false;

  for (let i = 0; i < data.documents.length; i++) {
    closeStyleDfs(data.documents[i], styleData);
  }

  return styleData.value;
}
