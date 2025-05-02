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

export async function userPurchaseCourse(token: string, courseId: string) {
  const res = await axios.post(
    `${Base_Url}/purchase/${courseId}`,
    {},
    {
      headers: { Authorization: token },
    }
  );
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
  const res = await axios.get(`${Base_Url}/mycontent`, {
    headers: { Authorization: token },
  });
  const data: ReceivedDataType = res.data;
  return data;
}

// userRouter.post("/addtocart", auth, addToCart);
// userRouter.get("/cartcourses", auth, getCartCourses);

export async function addToCart(token: string, body: { courseId: string }) {
  const res = await axios.post(`${Base_Url}/addtocart`, body, {
    headers: { Authorization: token },
  });
  const data: ReceivedDataType = res.data;
  return data;

  //res.status(200).json({
  //   success: true,
  //   content: addedToCart, //single document
  //   message: "succesfully added to cart",
  // });
}

export async function getCartCourses(token: string) {
  const res = await axios.get(`${Base_Url}/cartcourses`, {
    headers: { Authorization: token },
  });
  const data = res.data;
  return data;

  //res.status(200).json({ success: true, content: cartCourses });//content is array
}
