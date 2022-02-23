export const extractTestData = (data: Array<any>): Array<TestModel> => {
  return data.map((e) => {
    return {
      name: e.subjectName,
      NoC: e.studentCourseSubject?.courseSubject?.numberOfCredit,
      testDate: e.examRoom?.examDateString,
      testTime: `${e.examRoom?.examHour.startString} - ${e.examRoom?.examHour.endString}`,
      testCode: e.examCodeNumber,
      roomCode: e.examRoom?.room.code,
      testRound: e.examRoom?.examHour.name,
      status: e.status,
      id:e.id,
      startTimeStamp: e.examRoom.examHour.start,
      remindID: null
    };
  });
};
