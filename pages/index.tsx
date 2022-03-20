import 'bootstrap/dist/css/bootstrap.min.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import type { NextPage } from 'next'
import { useCallback } from 'react';

import { useCompanies, useCompanyMembers } from '../components/hooks/companies';
import { useStaffMembers } from '../components/hooks/staffMembers';
import { useAppoinments, useAppoinmentMutation } from '../components/hooks/appoinments';

const Home: NextPage = () => {

  const queryCompanies = useCompanies()
  const queryStaffMembers = useStaffMembers()
  const queryApoinments = useAppoinments()
  const apoinmentMutation = useAppoinmentMutation()

  const { queryCompanyMembers, setCompanyId } = useCompanyMembers()

  const calculateCalendar = useCallback(() => {
    return queryApoinments.data.map(apt => {
      return { title: `Apt for: ${apt.company.name}`, start: apt.startDate, end: apt.endDate }
    })
  }, [queryApoinments])

  const onCompanyChangeHandler = useCallback((event) => {
    setCompanyId(event.target.value)
  }, [setCompanyId])

  const createApoinmentHandler = useCallback((event) => {
    event.preventDefault()

    const startDate = new Date(event.target.elements.startDate.value).toISOString();
    const endDate = new Date(event.target.elements.endDate.value).toISOString();
    const companyId = event.target.elements.companyId.value;
    const staffMemberId = event.target.elements.staffMemberId.value;

    apoinmentMutation.mutate({ startDate, endDate, companyId, staffMemberId })
  }, [apoinmentMutation])

  if (queryApoinments.isLoading || queryCompanies.isLoading || queryStaffMembers.isLoading) {
    return <>Loading..</>
  }

  if (queryApoinments.isError || queryStaffMembers.isError || queryCompanies.isError) {
    return <>Error getting the data</>
  }


  return (
    <div>
      <h1>Home</h1>

      <h4>Create an apoinment</h4>
      <form onSubmit={createApoinmentHandler}>
        {(apoinmentMutation.isError && apoinmentMutation.error instanceof Error) ? <div>{apoinmentMutation.error.message}</div> : null}
        <input type="datetime-local" defaultValue="2022-03-01T08:30" name="startDate" onChange={() => { }} />
        <input type="datetime-local" defaultValue="2022-03-01T09:30" name="endDate" onChange={() => { }} />
        <select name="companyId" onChange={onCompanyChangeHandler}>
          {queryCompanies.data.map(({ id, name }) => (<option key={id} value={id}>{name}</option>))}
        </select>

        <select name="staffMemberId">
          {queryCompanyMembers.status === "loading" && <>Loading..</>}
          {queryCompanyMembers.status === "success" && queryCompanyMembers.data.map(
            ({ firstName, lastName, id }) => (<option key={id} value={id}>{firstName} {lastName}</option>)
          )}
        </select>

        <input type="submit" value="Create" />

      </form>


      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={calculateCalendar()}
      />

    </div>
  )
}

export default Home
