import 'bootstrap/dist/css/bootstrap.min.css';

import { useCallback, useState } from 'react';

import type { NextPage } from 'next'

import { useCompanies, useCompanyMembers } from '../components/hooks/companies';
import { useStaffMembers } from '../components/hooks/staffMembers';
import { useAppoinments, useAppoinmentMutation } from '../components/hooks/appoinments';

import { useQuery } from "react-query";

import {
  getCompanyMembers,
} from "../helpers/api";

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


const Home: NextPage = () => {
  const [companyId, setCompanyId] = useState(1);

  const queryCompanies = useCompanies()
  const queryStaffMembers = useStaffMembers()
  const queryApoinments = useAppoinments()
  const apoinmentMutation = useAppoinmentMutation()

  const companyMembers = useQuery(['company_members', companyId], () => getCompanyMembers(companyId))



  if (queryApoinments.isLoading || queryCompanies.isLoading || queryStaffMembers.isLoading) {
    return <>Loading..</>
  }

  if (queryApoinments.isError || queryStaffMembers.isError || queryCompanies.isError) {
    return <>Error getting the data</>
  }

  const createApoinmentHandler = (event) => {
    event.preventDefault()



    const startDate = new Date(event.target.elements.startDate.value).toISOString();
    const endDate = new Date(event.target.elements.endDate.value).toISOString();
    const companyId = event.target.elements.companyId.value;
    const staffMemberId = event.target.elements.staffMemberId.value;

    // console.log({ startDate, endDate, companyId, staffMemberId })
    apoinmentMutation.mutate({ startDate, endDate, companyId, staffMemberId })
  }

  const onCompanyChangeHandler = (event) => {
    setCompanyId(event.target.value)
  }

  const calculateCalendar = () => {
    return queryApoinments.data.map(apt => {
      return { title: `Apt for: ${apt.company.name}`, start: apt.startDate, end: apt.endDate }
    })
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
          {companyMembers.status === "loading" && <>Loading..</>}
          {companyMembers.status === "success" && companyMembers.data.map(
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
