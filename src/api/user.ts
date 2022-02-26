const user = async (token: string): Promise<UserInfo | null> => {

  const res = await fetch(
    "https://sinhvien.tlu.edu.vn:8082/education/api/student/getstudentbylogin",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    const data = await res.json();

    return {
      name: data.displayName,
      id: data.studentCode,
      class: data.enrollmentClass.classCode,
    };
  } else {
    return null;
  }

};

export default user;
