import axios from "axios";
import { useEffect, useState } from "react";

type UseFetchDataType = {
  name?: string;
  username?: string;
  password?: string;
  title?: string;
  body?: string;
  image?: string;
  seats?: number;
};

interface UseFetchInterface {
  method: string;
  url: string;
  data: UseFetchDataType | {};
  headers: { Authorization: string } | {};
  params: { courseId: string } | {};
}

export async function fetch(props: UseFetchInterface) {
  const [data, setData] = useState<{
    success: boolean;
    message?: string;
    content?: {};
    token?: string;
  } | null>(null);

  async function fetchData() {
    try {
      const res = await axios({
        method: props.method,
        url: props.url,
        params: props.params,
        data: props.data,
        headers: props.headers,
      });
      const data = res.data;
      setData(data);
    } catch (error) {
      console.log(`Error is from useFetch ${error}`);
    }
  }

  useEffect(
    function () {
      fetchData();
    },
    [props.url]
  );

  return data;
}
