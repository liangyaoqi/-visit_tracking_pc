import request from "../utils/axios";

const getBlacklist = () => request.get("/api/blacklist");

const addBlacklist = (data) => request.post("/api/blacklist/add", data);

const deleteBlacklist = (id) => request.delete(`/api/blacklist/delete/${id}`);

const searchBlacklist = (data) =>
  request.post("/api/blacklist/getBlacklist", data);

export { getBlacklist, addBlacklist, deleteBlacklist, searchBlacklist };
