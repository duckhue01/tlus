const tuition = async (token: string | null): Promise<any | null> => {
  if (token !== null) {
    const res = await fetch(
      "https://sinhvien.tlu.edu.vn:8082/education/api/student/viewstudentpayablebyLoginUser",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      return await res.json();
    }
    return null;
  }
  return null;
};

export default tuition;
