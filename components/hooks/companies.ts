import { useMutation, useQuery, useQueryClient } from "react-query";

import { getCompanies, createCompany } from "../../helpers/api";

export function useCompanies() {
  const queryCompanies = useQuery("companies", getCompanies);

  return queryCompanies;
}

export function useCompanyMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation(createCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries("companies");
    },
  });

  return mutation;
}
