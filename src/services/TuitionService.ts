import { extractTuitionData } from "../utils/tuitionUtils";
import tuition from "../api/tuition";
import { getToken } from "../api/authentication";

export class TuitionService {
  constructor() { }

  fetchTuition = async () => {
    try {
      const token = await getToken();
      const data = await tuition(token);
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
