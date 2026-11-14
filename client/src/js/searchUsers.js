import axios from "axios";

let cachedResults = {};
function createCancellableSearch() {
  let cancelSource;

  return async function (query) {
    if (cancelSource) cancelSource.cancel();

    cancelSource = axios.CancelToken.source();

    try {
      if (cachedResults[query]) return cachedResults[query];
      const res = await axios(query, { cancelToken: cancelSource.token });
      const result = res.data.documents;
      cachedResults[query] = result;
      return result;
    } catch (error) {
      if (axios.isCancel(error)) console.log("Request cancelled");
      else console.log("Error   ");
    }
  };
}

export const searchUsers = createCancellableSearch();
