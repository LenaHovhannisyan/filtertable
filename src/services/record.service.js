import http from "../http-common";

class RecordDataService {
    getAll() {
        return http.get("/records");
    }

    create(data) {
        return http.post("/add_record", data);
    }
}

export default new RecordDataService();