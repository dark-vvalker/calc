import { AsyncStorageStatic } from "react-native";
import moment from "moment";

const PREFIX = "cache";
const EXPIRED_IN_MINUTES = 5;

const set = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorageStatic.setItem(PREFIX + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timestamp);

  return now.diff(storedTime, "minutes") > EXPIRED_IN_MINUTES;
};

const get = async (key) => {
  try {
    const value = await AsyncStorageStatic.getItem(PREFIX + key);
    const item = JSON.parse(value);

    if (!item) return null;

    if (isExpired(item)) {
      await AsyncStorageStatic.removeItem(PREFIX + key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.log(error);
  }
};

export default {
  set,
  get,
};
