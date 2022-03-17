import { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';

export default function Menu() {
  return (
    <div>
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} href="/companies">Companies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} href="/staff_members">Staff Members</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}
