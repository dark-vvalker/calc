import { RES } from "../components/constants";
import client from "./client";

const endpoint =
  "/offers?limit=50&include=product&page=1&sort=id&filter[product_id]=2,3,4,7,8,9,10,11";

const getData = async () => {
  return await {
    data: JSON.parse(RES),
  };
};

const getOffers = () => {
  return getData();
  return client.get(endpoint);
};

const methods = {
  getOffers,
};

export default methods;
