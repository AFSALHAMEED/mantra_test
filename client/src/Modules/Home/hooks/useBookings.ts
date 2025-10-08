import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "./home.api";

export const useBookings = ({ email }: { email: string }) => {
  const { data } = useQuery({
    queryKey: ["myBookings", email],
    queryFn: () => getMyBookings({ email }),
    enabled: !!email,
  });

  return { data };
};
