import axios from "axios";

export default class RestaurantService {
  getRestaurantCategoryList() {
    return axios.get("/api/v2/index_entry");
  }

  /**
     * |参数|是否必选|类型|说明|
  |:-----|:-------:|:-----|:-----|
  |latitude      |Y       |string  |纬度|
  |longitude      |Y       |string  |经度|
  |offset      |N       |int |跳过多少条数据，默认0|
  |limit      |N      |int |请求数据的数量，默认20|
  |restaurant_category_id      |N      |int |餐馆分类id|
  |order_by      |N       |int |排序方式id： 1：起送价、2：配送速度、3:评分、4: 智能排序(默认)、5:距离最近、6:销量最高|
  |delivery_mode      |N      |array |配送方式id|
  |support_ids      |N      |array |餐馆支持特权的id|
  |restaurant_category_ids      |N      |array |餐馆分类id|
    */
  getNearbyRestaurantList({
    latitude = "",
    longitude = "",
    offset = 0,
    limit = 20,
    restaurant_category_id = "",
    order_by = 4,
    delivery_mode = "",
    support_ids = "",
  }) {
    return axios.get(
      // `/api/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&offset=${offset}&limit=${limit}&restaurant_category_id=${restaurant_category_id}&order_by=${order_by}&delivery_mode=${delivery_mode}&support_ids=${support_ids}`
      `https://elm.cangdu.org/shopping/restaurants?latitude=24.436002&longitude=118.102693&offset=0&limit=20&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=`
    );
  }
}
