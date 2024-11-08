import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Protected from '../components/Auth/Protected'

export const Route = createLazyFileRoute('/dashbord')({
  component: () => (
    <Protected roles={[1]}>
      <Admindashbord />
    </Protected>
  ),
})

function Admindashbord() {
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token) {
    }
  }, [token])

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">Please login first to get Model data!</h1>
        </Col>
      </Row>
    )
  }

  return (
    <Row className="mt-4">
      <h1>test</h1>
    </Row>
  )
}
