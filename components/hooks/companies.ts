import { useState } from "react";
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

export function useCompanyMembers() {
  const [companyId, setCompanyId] = useState(1);
  const queryCompanyMembers = useQuery(
    ["company_members", companyId],
    getCompanyMembers
  );

  return {queryCompanyMembers, setCompanyId};
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
