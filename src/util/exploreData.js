function backTracking(data, routesData, targetId) {
  routesData.push({ id: data.id, title: data.title });

  if (data.id === targetId) return true;

  for (let i = 0; i < data.documents.length; i++) {
    const flag = backTracking(data.documents[i], routesData, targetId);

    if (flag) return true;

    routesData.pop();
  }

  return false;
}

export function exploreData(documents, targetId) {
  const routesData = [];

  if (!targetId) return routesData;

  for (let i = 0; i < documents.length; i++) {
    const value = backTracking(documents[i], routesData, parseInt(targetId));
    if (value) return routesData;
    routesData.pop();
  }

  return routesData;
}
