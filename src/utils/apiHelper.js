// export const getList = (res) => {
//   return res?.data?.content || res?.data?.data || res?.data || [];
// };

// export const getCount = (res) => {
//   const data = res?.data;

//   if (Array.isArray(data)) return data.length;
//   if (data?.content) return data.content.length;
//   if (data?.totalElements) return data.totalElements;
//   if (data?.data) return data.data.length;

//   return 0;
// };
export const getList = (res) => {
  return res?.data?.content || res?.data?.data || res?.data || [];
};

export const getCount = (res) => {
  const data = res?.data;

  if (Array.isArray(data)) return data.length;
  if (data?.content) return data.content.length;
  if (data?.totalElements) return data.totalElements;
  if (data?.data) return data.data.length;

  return 0;
};