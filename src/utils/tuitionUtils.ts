export const extractTuitionData = (data: any): TuitionModel => {
  
    const receivedDtosTemp = data.receiveAbleDtos?.map(
      (e: {
        semester: {
          semesterCode: string;
        };
        amountAfterBalance: number;
        details: { note: string; totalAmount: number }[];
      }): {
        name: string;
        total: number;
        details: { name: string; total: number }[];
      } => {
        return {
          name: e.semester.semesterCode,
          total: e.amountAfterBalance,
          details: e.details.map((i) => {
            return {
              name: i.note,
              total: i.totalAmount,
            };
          }),
        };
      }
    );

    const receiveAbleNotCompleteDtosTemp = data.receiveAbleNotCompleteDtos?.map(
      (e: {
        semester: {
          semesterCode: string;
        };
        amountAfterBalance: number;
        details: { note: string; totalAmount: number }[];
      }): {
        name: string;
        total: number;
        details: { name: string; total: number }[];
      } => {
        return {
          name: e.semester.semesterCode,
          total: e.amountAfterBalance,
          details: e.details.map((i: any) => {
            return {
              name: i.note,
              total: i.totalAmount,
            };
          }),
        };
      }
    );

    return {
      totalReceiveAble: data.totalReceiveAble ? data.totalReceiveAble : 0,
      totalReceiveAbleNotComplete: data.totalReceiveAbleNotComplete
        ? data.totalReceiveAbleNotComplete
        : 0,
      totalReceived: data.totalReceived ? data.totalReceived : 0,
      receiveAbleDtos: receivedDtosTemp ? receivedDtosTemp : [],
      receiveAbleNotCompleteDtos: receiveAbleNotCompleteDtosTemp
        ? receiveAbleNotCompleteDtosTemp
        : [],
    };
 
};
