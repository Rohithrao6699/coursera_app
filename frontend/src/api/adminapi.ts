import { useFetch } from "../hooks/useFetch";

const Base_Url = "http://localhost:3000/api/user";

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

export function adminSignup(body: AdminSingupInterface) {
  const data = useFetch({
    method: "POST",
    url: `${Base_Url}/signup`,
    data: body,
    headers: {},
    params: {},
  });
  return data;
}

export function adminSignin(body: AdminSingupInterface) {
  const data = useFetch({
    method: "POST",
    url: `${Base_Url}/signin`,
    data: body,
    headers: {},
    params: {},
  });
  return data;
}

export function adminCreateCourse(
  body: adminCreateCourseInterface,
  token: string
) {
  const data = useFetch({
    method: "POST",
    url: `${Base_Url}/createCourse`,
    data: body,
    headers: { Authorization: token },
    params: {},
  });
  return data;
}

export function deleteCourse(courseId: string, token: string) {
  const data = useFetch({
    method: "DELETE",
    url: `${Base_Url}/createCourse`,
    data: {},
    headers: { Authorization: token },
    params: { courseId: courseId },
  });
  return data;
}
