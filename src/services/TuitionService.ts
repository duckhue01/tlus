import { extractTuitionData } from "../utils/tuitionUtils";
import tuitionAPI from "../api/tuitionAPI";
import { getTokenAPI } from "../api/authenticationAPI";

export class TuitionService {
  constructor() {}

  fetchTuition = async () => {
   
    try {
      const token = await getTokenAPI();
      const data = await tuitionAPI(token);
      if (token !== null && data !== null) {
        const extracted = extractTuitionData(data);
        return extracted;
      }
      return null;
    } catch (e) { 
      return null;
    }
  };
}
