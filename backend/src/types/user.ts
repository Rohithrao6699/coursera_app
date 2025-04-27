interface userBody {
  username: string;
  password: string;
  name?: string;
  role?: string;
}

type courses = {
  title: string;
  body: string;
  image?: string;
  seats: number;
};
interface resCourseBody {
  success: boolean;
  courses: courses[];
}
