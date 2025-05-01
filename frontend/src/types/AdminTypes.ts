export type ReceivedDataType = {
  success: boolean;
  message?: string;
  token?: string;
  content?: CourseType[] | CourseType;
};

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
