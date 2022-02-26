import {
  extractingData,
  CalendarData,
  refactoringData,
} from "../utils/dateUtils";

export interface calendar {
  name: string;
  timetable: [any];
}
// need to fix server does not allow invalid fetch semester
const calendar = async (
  token: string | null
): Promise<CalendarData | null> => {
  if (token !== null) {
    let data: CalendarData | null = null;

    for await (const i of Array.from(new Array(20), (e, a) => 20 - a)) {
      const res = await fetch(
        `https://sinhvien.tlu.edu.vn:8082/education/api/StudentCourseSubject/studentLoginUser/6`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        const temp = await res.json();

        if (temp.length !== 0) {
          const extracted = extractingData(temp);
          data = refactoringData(extracted);
          break;
        }
      }
    }
    return data;
  }
  return null;
};

export default calendar;
