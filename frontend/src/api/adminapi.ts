import axios from "axios";
import { ReceivedDataType } from "../types/AdminTypes";

const Base_Url = "http://localhost:3000/api/admin";

interface AdminSingupInterface {
  username: string;
  password: string;
  name?: string;
}

interface adminCreateCourseInterface {
  title: string;
  body: string;
  image: string;
  seats: number;
}

export async function adminSignup(body: AdminSingupInterface) {
  // const data = useFetch({
  //   method: "POST",
  //   url: `${Base_Url}/signup`,
  //   data: body,
  //   headers: {},
  //   params: {},
  // });
  // return data;
  const res = await axios.post(`${Base_Url}/signup`, body);
  const data = res.data;
  return data;
}

export async function adminSignin(body: AdminSingupInterface) {
  // const data = useFetch({
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

export async function adminCreateCourse(
  body: adminCreateCourseInterface,
  token: string
) {
  // const data = useFetch({
  //   method: "POST",
  //   url: `${Base_Url}/createCourse`,
  //   data: body,
  //   headers: { Authorization: token },
  //   params: {},
  // });
  // return data;
  const res = await axios.post(`${Base_Url}/createCourse`, body, {
    headers: { Authorization: token },
  });
  const data: ReceivedDataType = res.data;
  return data;
}

export async function myCourses(token: string) {
  const res = await axios.get(`${Base_Url}/myCourse`, {
    headers: { Authorization: token },
  });
  const data: ReceivedDataType = res.data;
  return data;
}
export async function deleteCourse(courseId: string, token: string) {
  // const data = useFetch({
  //   method: "DELETE",
  //   url: `${Base_Url}/createCourse`,
  //   data: {},
  //   headers: { Authorization: token },
  //   params: { courseId: courseId },
  // });
  // return data;
  const res = await axios.delete(`${Base_Url}/deleteCourse/${courseId}`, {
    headers: { Authorization: token },
  });
  const data: ReceivedDataType = res.data;
  return data;
}
