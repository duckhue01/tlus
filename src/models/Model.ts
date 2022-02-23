interface Subject {
  name: string;
  start: {
    string: string;
    name: string;
  };
  end: {
    string: string;
    name: string;
  };
  room: string;
}

interface ScoreModel {
  id: number;
  subject: string;
  numberOfCredit: number;
  procedure: number;
  test: number;
  final: number;
  mark: string;
  semester: string;
}

interface TestModel {
  name: string;
  NoC: number;
  testDate: string;
  testTime: String;
  testCode: number;
  roomCode: string;
  testRound: string;
  status: number;
  id: number;
  startTimeStamp: number;
  remindID: string | null;
}

interface TuitionModel {
  totalReceiveAble: number;
  totalReceiveAbleNotComplete: number;
  totalReceived: number;
  receiveAbleDtos: [
    {
      name: string;
      total: number;
      details: [
        {
          name: string;
          total: number;
        }
      ];
    }
  ];
  receiveAbleNotCompleteDtos: [
    {
      name: string;
      total: number;
      details: [
        {
          name: string;
          total: number;
        }
      ];
    }
  ];
}

interface UserInfo {
  name: string;
  id: number;
  class: string;
}

interface FirebaseInfo {
  name: string;
  id: number;
  class: string;
  score: number;
  numberOfCredit: number;
}
