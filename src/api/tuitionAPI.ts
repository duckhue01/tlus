const tuitionAPI = async (token: string | null) : Promise<any | null>=> {
  if (token !== null) {
    const res = await fetch(
      "https://sinhvien.tlu.edu.vn:8099/education/api/student/viewstudentpayablebyLoginUser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

export default tuitionAPI;
