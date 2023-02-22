import client from "./client";

const endpoint = "/order";

const addOrder = (order) => {
  return client.post(endpoint, order);
};

export default addOrder;
