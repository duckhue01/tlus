

const testAPI = async (token: string | null) : Promise<any[] | null> => {
   if (token !== null) {
    let data: any[] | null  = null;

    for await (const i of Array.from(new Array(20), (e, a) => 20 - a)) {
      const res = await fetch(
        `https://sinhvien.tlu.edu.vn:8099/education/api/semestersubjectexamroom/getListRoomByStudentByLoginUser/${i}/0/1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

export default testAPI;
