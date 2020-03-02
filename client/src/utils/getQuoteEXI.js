import axios from "axios";

const quote = async sym => {
  try {
    const response = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${sym}/quote?token=pk_605188193e7f43949de64f3be974e5c5`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export default quote;
//https://cloud.iexapis.com/undefined/stock/AAPL/quote?token=undefined
