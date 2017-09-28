/**
 * Merges PNC response payload with normal $http response
 * to flatten and simplify handling.
 * @param {Object} res The raw $http response.
 * @return {Object} Flattened response structure.
 */
export function responseMap(res) {
  const { data, config, status, statusText } = res;
  const pncData = data.data;
  const pncStatus = data.status;
  return {
    data: {
      ...pncData
    },
    status: {
      ...pncStatus,
      status,
      statusText
    },
    config
  };
}
