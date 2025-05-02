export interface UserSingUpInterface {
  username: string;
  password: string;
  name?: string;
}
export type CourseType = {
  title: string;
  body: string;
  image: string;
  seats: number;
  tagLine: string;
  level: string;
  skills: string;
  _id: string;
};

export type ReceivedDataType = {
  success: boolean;
  message?: string;
  content?: CourseType[] | CourseType;
  token?: string;
};

export type CourseBlogContentType = {
  filteredcourse: CourseType;
};
