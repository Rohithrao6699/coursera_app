import axios from "axios";
import { ReceivedDataType, UserSingUpInterface } from "../types/UserTypes";

const Base_Url = "http://localhost:3000/api/user";

export async function userSignup(body: UserSingUpInterface) {
  // const data = fetch({
  //   method: "POST",
  //   url: `${Base_Url}/signup`,
  //   data: body,
  //   headers: {}, // Add your token here
  //   params: {}, // if needed
  // });
  // return data;
  const res = await axios.post(`${Base_Url}/signup`, body);
  const data = res.data;
  return data;
}

export async function userSignin(body: UserSingUpInterface) {
  // const data = fetch({
  //   method: "POST",
  //   url: `${Base_Url}/signin`,
  //   data: body,
  //   headers: {},
  //   params: {},
  // });
  // return data;
  const res = await axios.post(`${Base_Url}/signin`, body);
  const data = res.data;
  return data;
}

export async function userContent(token: string) {
  const res = await axios.get(`${Base_Url}/content`, {
    headers: { Authorization: token },
  });
  const data: ReceivedDataType = res.data;
  return data;
}

export async function userPurchaseCourse(token: string, courseId: number) {
  // const data = fetch({
  //   method: "POST",
  //   url: `${Base_Url}/purchase`,
  //   data: {},
  //   headers: { Authorization: token },
  //   params: { courseId: courseId },
  // });
  // return data;
  const res = await axios.post(`${Base_Url}/purchase`, {
    headers: { Authorization: token },
    params: { courseId: courseId },
  });
  const data: ReceivedDataType = res.data;
  return data;
}

export async function userGetmyContent(token: string) {
  // const data = fetch({
  //   method: "POST",
  //   url: `${Base_Url}/mycontent`,
  //   data: {},
  //   headers: { Authorization: token },
  //   params: {},
  // });
  // return data;
  const res = await axios.post(`${Base_Url}/mycontent`, {
    headers: { Authorization: token },
  });
  const data: ReceivedDataType = res.data;
  return data;
}
