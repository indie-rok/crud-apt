import { useCallback } from 'react';


import { useStaffMembers, useStaffMembersMutation } from '../components/hooks/staffMembers';
import { useCompanies } from '../components/hooks/companies';

export default function StaffMember() {
  const queryCompanies = useCompanies()
  const queryStaffMembers = useStaffMembers()

  const mutation = useStaffMembersMutation()

  const createStaffMemberHandler = useCallback((event) => {
    event.preventDefault();

    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const companyId = event.target.elements.companyId.value;

    mutation.mutate({ firstName, lastName, companyId })
  }, [mutation])

  if (queryCompanies.isLoading || queryStaffMembers.isLoading) {
    return <>...loading</>
  }

  if (queryCompanies.isError || queryStaffMembers.isError) {
    return <>Error loading the page</>
  }

  return (
    <div>
      <h4>Create staff member</h4>
      <form onSubmit={createStaffMemberHandler}>
        {(mutation.isError && mutation.error instanceof Error) ? <div>{mutation.error.message}</div> : null}
        <input type="text" name="firstName" placeholder='firstname' />
        <input type="text" name="lastName" placeholder='lastname' />
        <select name="companyId">
          {queryCompanies.data.map(({ id, name }) => (<option key={id} value={id}>{name}</option>))}
        </select>
        <input type="submit" value="Create staff member" />
      </form>

      <hr />

      <h4>All Staff members</h4>

      <ul>
        {queryStaffMembers.data.map(({ id, firstName, lastName }) => (
          <li key={id}>{firstName} {lastName}</li>
        ))}
      </ul>

    </div>
  )
}
