import { get } from "../../../utils/request";
export const OrdersServices = {
  async getOrdersData(unauthorizedCallback, id) {
    const token = JSON.parse(localStorage.getItem("user")).token;
    try {
      const data = await get(
        `http://localhost:3000/api/order/${id}`,
        token,
        unauthorizedCallback
      );

      return data;
    } catch (error) {
      console.log(error);
      unauthorizedCallback();
    }
  },

  getAllUsers(unauthorizedCallback) {
    return this.getUsersData(unauthorizedCallback);
  },
};
