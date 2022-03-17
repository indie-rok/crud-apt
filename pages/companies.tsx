import { useCallback } from 'react';

import { useCompanies, useCompanyMutation } from '../components/hooks/companies';

export default function Companies() {
  const { isLoading, error, data: companies } = useCompanies()
  const mutation = useCompanyMutation()

  const createCompanyHandler = useCallback((event) => {
    event.preventDefault()
    const companyName = event.target.elements.companyName.value;
    mutation.mutate(companyName)
  }, [mutation])

  if (isLoading) {
    return <>...loading</>
  }

  return (
    <div>
      {error && <div>Error getting the companies</div>}

      <h4>Create a company</h4>
      <form onSubmit={createCompanyHandler}>
        {(mutation.isError && mutation.error instanceof Error) ? <div>{mutation.error.message}</div> : null}
        <input type="text" name="companyName" />
        <input type="submit" value="Create company" />
      </form>

      <hr />

      <h4>All companies</h4>

      <ul>
        {companies.map(({ id, name }) => { return <li key={id}>{name}</li> })}
      </ul>

    </div>
  )
}
