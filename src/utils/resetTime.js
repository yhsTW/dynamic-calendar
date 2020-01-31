import moment from "moment";

export const resetTime = date => {
    return moment(date).set({ hour : 0, minute : 0, second : 0 });
};