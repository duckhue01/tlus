import { getToken } from "../api/authentication";
import score from "../api/score";
import { convertSemester } from "../utils/scoreUtils";

export type MarkStats = {
  numberOfMark: number;
  numberOfCredit: number;
  percent: number;
  details: any[],
};

export default class ScoreService {
  private static score: ScoreModel[] | undefined = undefined;

  static getScore = async (): Promise<ScoreModel[] | null> => {
    if (ScoreService.score) {
      return ScoreService.score;
    } else {
      const token = await getToken();
      const data = await score(token);

      if (token !== null && data !== null) {
        const extracted: ScoreModel[] = data.map((e: any) => {
          const semester = e.semester
            ? convertSemester(e.semester.semesterCode)
            : 0;
          return {
            subject: e.subject.subjectName,
            numberOfCredit: e.subject.numberOfCredit,
            procedure: e.markQT,
            test: e.markTHI,
            final: e.mark,
            id: e.id,
            mark: e.charMark,
            semester: semester,
          };
        });

        ScoreService.score = extracted;
        return extracted;
      }
      return null;
    }
  };

  static getStatsByMark = async (): Promise<{
    [key: string]: MarkStats;
  } | null> => {
    const data = await ScoreService.getScore();

    let stats: {
      [key: string]: MarkStats;
    } = {
      ["a"]: {
        numberOfMark: 0,
        numberOfCredit: 0,
        percent: 0,
        details: []
      },
      ["b"]: {
        numberOfMark: 0,
        numberOfCredit: 0,
        percent: 0,
        details: []
      },
      ["c"]: {
        numberOfMark: 0,
        numberOfCredit: 0,
        percent: 0,
        details: []
      },
      ["d"]: {
        numberOfMark: 0,
        numberOfCredit: 0,
        percent: 0,
        details: []
      },
      ["f"]: {
        numberOfMark: 0,
        numberOfCredit: 0,
        percent: 0,
        details: []
      },
    };

    if (data !== null) {
      data.forEach((e: any) => {
        const current = stats[e.mark.toLowerCase()];
        const data = {
          numberOfMark: current.numberOfMark + 1,
          numberOfCredit: current.numberOfCredit + e.numberOfCredit,
          percent: 1,
          details: [
            ...stats[e.mark.toLowerCase()].details,
            {
              subject: e.subject,
              credit: e.numberOfCredit,
              final: e.final,
            },
          ]
        };

        stats[e.mark.toLowerCase()] = data;
      });

      Object.keys(stats).forEach((e) => {
        if (data.length !== 0) {
          stats[e].percent = (stats[e].numberOfMark / data.length) * 100;
        }
      });
      return stats;
    } else {
      return null;
    }
  };

  static getAverageAndNumberOfCredit = async (): Promise<
    [number, number] | null
  > => {
    const data = await ScoreService.getScore();
    let creditXMark = 0;
    let numberOfCredit = 0;

    if (data !== null) {
      data.forEach((e: any) => {
        numberOfCredit += e.numberOfCredit;
        creditXMark += e.final * e.numberOfCredit;
      });

      try {
        return [creditXMark / numberOfCredit, numberOfCredit];
      } catch (error) {
        throw new Error(" chia 0");
      }
    } else {
      return null;
    }
  };

  static getStatsBySemester = async (): Promise<{
    [key: string]: any;
  } | null> => {
    const data = await ScoreService.getScore();
    let stats: {
      [key: string]: any;
    } = {
      "0": {
        sumOfCredit: 0,
        finalXCredit: 0,
        detail: [],
      },
    };
    if (data !== null) {
      data.forEach((e) => {
        const sumOfCredit = stats[e.semester]
          ? stats[e.semester].sumOfCredit + e.numberOfCredit
          : e.numberOfCredit;
        const finalXCredit = stats[e.semester]
          ? e.final * e.numberOfCredit + stats[e.semester].finalXCredit
          : e.final * e.numberOfCredit;

        const detail = stats[e.semester]
          ? [
            ...stats[e.semester].detail,
            {
              subject: e.subject,
              credit: e.numberOfCredit,
              final: e.final,
            },
          ]
          : [
            {
              subject: e.subject,
              credit: e.numberOfCredit,
              final: e.final,
            },
          ];
        stats = {
          ...stats,
          [e.semester]: {
            sumOfCredit: sumOfCredit,
            finalXCredit: finalXCredit,
            detail: detail,
          },
        };
      });
      return stats;
    } else {
      return null;
    }
  };

  static deleteScore = () => {
    ScoreService.score = undefined;
  };
}
