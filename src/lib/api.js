import axios from "axios";

export const fetchContracts = async () => {
  // GET /contracts
  const res = await axios.get("/contracts.json");
  return res.data;
};

export const fetchContractById = async (id) => {
  const res = await axios.get(`/contracts/${id}.json`);
  return res.data;
};
