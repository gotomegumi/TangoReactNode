import http from "../http-common";
class TangoDataService {
    getQuez(section) {
        return http.get(`/test/getquez/${section}`);
    }
}
export default new TangoDataService();