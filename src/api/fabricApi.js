// =========================
// 원단 상세 조회
// =========================
export const getFabricDetail = async (id) => {

  const response = await axios.get(

    `${SERVER_URL}/fabric/${id}`
  );

  return response.data;
};

// =========================
// 원단 수정
// =========================
export const updateFabric = async (
  id,
  data
) => {

  const response = await axios.put(

    `${SERVER_URL}/fabric/${id}`,

    data
  );

  return response.data;
};