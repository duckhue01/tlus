
// need to fix server does not allow invalid fetch semester
const test = async (token: string | null): Promise<any[] | null> => {
  if (token !== null) {
    let data: any[] | null = null;

    for await (const i of Array.from(new Array(20), (e, a) => 20 - a)) {
      const res = await fetch(
        `https://sinhvien.tlu.edu.vn:8082/education/api/semestersubjectexamroom/getListRoomByStudentByLoginUser/4/6/1`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(await res.json());

      if (res.ok) {
        const temp = await res.json();
        if (temp.length !== 0) {
          data = temp.reverse();
          break;
        }
      }
    }

    return data;
  } else {
    return null
  }



};

export default test;
