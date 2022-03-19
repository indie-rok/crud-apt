import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  getCompanies,
  createCompany,
  getCompanyMembers,
} from "../../helpers/api";

export function useCompanies() {
  const queryCompanies = useQuery("companies", getCompanies);

  return queryCompanies;
}

export function useCompanyMembers(companyId = 1) {
  const queryCompanies = useQuery(
    ["company_members", companyId],
    getCompanyMembers
  );

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
