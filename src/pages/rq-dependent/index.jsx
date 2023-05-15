import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};
const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

// This is in case that we want the queries to execute secuentialy (one after the other)
export default function Index({ email = "daniroa.js@gmail.com" }) {
  const {
    data: user,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByEmail(email),
  });

  const channelId = user?.data.channelId;

  const {
    data: channel,
    isLoading: channelIsLoading,
    isError: channelIsError,
  } = useQuery({
    queryKey: ["courses", channelId],
    queryFn: () => fetchCoursesByChannelId(channelId),
    enabled: !!channelId, //converts the value to a boolean which is what the enabled property expects
  });
  console.log(channel);
  return (
    <div>
      {channelIsLoading ? (
        <div style={{ color: "orange" }}>LOADING CHANNELS...</div>
      ) : channelIsError ? (
        <div style={{ color: "red" }}>ERROR...</div>
      ) : null}
      {channel?.data.courses.map((e, i) => (
        <div key={i}>{e}</div>
      ))}
    </div>
  );
}
