import { useMutation, useQuery, useQueryClient } from "react-query";

import { getStaffMemebrs, createStaffMember } from "../../helpers/api";

export function useStaffMembers() {
  const queryStaffMembers = useQuery("staff_members", getStaffMemebrs);

  return queryStaffMembers;
}

export function useStaffMembersMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation(createStaffMember, {
    onSuccess: () => {
      queryClient.invalidateQueries("staff_members");
    },
  });

  return mutation;
}
