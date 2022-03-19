import { useMutation, useQuery, useQueryClient } from "react-query";

import { getAppoinments, createAppoinment } from "../../helpers/api";

export function useAppoinments() {
  const queryAppoinments = useQuery("appoinments", getAppoinments);

  return queryAppoinments;
}

export function useAppoinmentMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation(createAppoinment, {
    onSuccess: () => {
      queryClient.invalidateQueries("appoinments");
    },
  });

  return mutation;
}
