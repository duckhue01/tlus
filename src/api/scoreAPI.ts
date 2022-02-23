const scoreAPI = async (token: string | null) : Promise<any | null> => {
  if (token !== null) {
    const res = await fetch(
      "https://sinhvien.tlu.edu.vn:8099/education/api/studentsubjectmark/getListStudentMarkBySemesterByLoginUser/0",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export default scoreAPI;
