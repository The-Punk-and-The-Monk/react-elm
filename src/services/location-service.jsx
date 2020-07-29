import axios from "axios";

class locationService {
  guessCity() {
    return axios.get("/proxyapi/v1/cities?type=guess");
  }

  getHotCities() {
    return axios.get("/proxyapi/v1/cities?type=hot");
  }

  getAllCity() {
    return axios.get("/proxyapi/v1/cities?type=group");
  }

  searchAddr(cityId, keyword) {
    return axios.get(
      `/proxyapi/v1/pois?city_id=${cityId}&keyword=${keyword}&type=search`
    );
  }
}

export default locationService;
