import {
  extractingData,
  CalendarData,
  refactoringData,
} from "../utils/dateUtils";

export interface calendar {
  name: string;
  timetable: [any];
}

const calendarAPI = async (
  token: string | null
): Promise<CalendarData | null> => {
  if (token !== null) {
    let data: CalendarData | null = null;

    for await (const i of Array.from(new Array(20), (e, a) => 20 - a)) {
      const res = await fetch(
        `https://sinhvien.tlu.edu.vn:8099/education/api/StudentCourseSubject/studentLoginUser/${i}`,
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

export default calendarAPI;
