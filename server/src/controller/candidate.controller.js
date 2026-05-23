import { searchCandidate } from "../services/db/candidate.service.js";
import { successResponse } from "../util/response.js";

export const searchCandidateController = async (req, res) => {
  const { search } = req.query;

  try {
    const result = await searchCandidate(search);

    return successResponse(res, "Fetch successfully", result);
  } catch (err) {
    return err;
  }
};
