import { LocaleConfig } from "react-native-calendars";

// convert timestamp to date string
const timeStamp2String = (date: number) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const formatDate = (date: Date) => {
  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const month = monthNames[date.getMonth()];
  let day = "" + date.getDate();
  if (day.length < 2) day = "0" + day;

  return [day, month].join(" ");
};

export interface Extracted {
  name: string;
  courseSection: [
    {
      date: string[];
      endHour: object;
      room: object;
      startHour: object;
    }
  ];
}

// take in  raw data and return needed data
const extractingData = (data: any): Extracted[] => {
  const getDatesOfCourse = (start: number, end: number, weekIndex: number) => {
    weekIndex = weekIndex - 1; // due to api not compatible
    let realStart;
    let realEnd;
    let dates = [];

    if (weekIndex > 0 && weekIndex < 7) {
      realStart = new Date(start + 86400000 * (weekIndex - 1));
      realEnd = new Date(end - 86400000 * (7 - weekIndex));

      for (
        let week_day = realStart.getTime();
        week_day <= realEnd.getTime();
        week_day += 86400000 * 7
      ) {
        const date = timeStamp2String(week_day);
        dates.push(date);
      }
    }

    return dates;
  };

  const extracted :Extracted[] = data.map((course: any) => ({
    name: course.courseSubject.semesterSubject.subject.subjectName,
    courseSection: course.courseSubject.timetables.map((section: any) => ({
      startHour: section.startHour,
      endHour: section.endHour,
      room: section.room,
      dates: getDatesOfCourse(
        section.startDate,
        section.endDate,
        section.weekIndex
      ),
    })),
  }));

  return extracted;
};

export interface CalendarData {
  [date: string]: [
    {
      end: {
        name: string;
        string: string;
      };
      name: string;
      room: string;
      start: {
        name: string;
        string: string;
      };
      startTimeStamp: number;
    }
  ];
}

// take in need data that is refactored and return calendar format data
const refactoringData = (extracted: any): CalendarData => {
  let refactored: any = {};
  extracted.forEach((course: any) => {
    course.courseSection.forEach((section: any) => {
      section.dates.forEach((date: any) => {
        let exist: any[] = [];
        if (refactored[date] !== undefined) {
          exist = [...refactored[date]];
        }

        return (refactored = {
          ...refactored,
          [date]: [
            ...exist,
            {
              name: course.name,
              room: section.room.name,
              start: {
                string: section.startHour.startString,
                name: section.startHour.name,
                startTimeStamp: section.startHour.start
              },
              end: {
                string: section.endHour.endString,
                name: section.endHour.name,
              },
              
            },
          ].sort((e1, e2) => e1.start.startTimeStamp - e2.start.startTimeStamp),
        });
      }); // dates
    }); //section
  }); // date

  return refactored;
};


LocaleConfig.locales["vi"] = {
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  monthNamesShort: [
    "Thg 1",
    "Thg 2",
    "Thg 3",
    "Thg 4",
    "Thg 5",
    "Thg 6",
    "Thg 7",
    "Thg 8",
    "Thg 9",
    "Thg 10",
    "Thg 11",
    "Thg 12",
  ],
  dayNames: [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ],
  dayNamesShort: ["CN", "Th2", "Th3", "Th4", " Th5", "Th6", "Th7"],
  today: "Hôm nay",
};
LocaleConfig.defaultLocale = "vi";




export { timeStamp2String, refactoringData, extractingData, formatDate };
