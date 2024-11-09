import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getTransmission } from '../../service/transmission'
import TransmissionItem from '../../components/Transmission/TransmissionItem'

export const Route = createLazyFileRoute('/transmissions/')({
  component: Transmission,
})

function Transmission() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [transmissions, setTransmissions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getTransmissionData = async () => {
      setIsLoading(true)
      const result = await getTransmission()
      if (result.success) {
        setTransmissions(result.data)
      }
      setIsLoading(false)
    }

    if (token) {
      getTransmissionData()
    }
  }, [token])

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">
            Please login first to get Transmission data!
          </h1>
        </Col>
      </Row>
    )
  }

  if (isLoading) {
    return (
      <Row className="mt-4">
        <h1>Loading...</h1>
      </Row>
    )
  }

  return (
    <>
      {/* Add a button to redirect to /specs/create */}
      <Row className="mt-4">
        <Col>
          <button
            onClick={() => navigate({ to: '/Transmissions/create' })}
            className="btn btn-primary"
          >
            Add New Transmission
          </button>
        </Col>
      </Row>

      <Row className="mt-4">
        {transmissions.length === 0 ? (
          <h1>Transmissions not found!</h1>
        ) : (
          transmissions.map((transmission) => (
            <TransmissionItem
              transmission={transmission}
              key={transmission?.id}
            />
          ))
        )}
      </Row>
    </>
  )
}
