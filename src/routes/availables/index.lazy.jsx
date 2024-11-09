import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getAvailables } from '../../service/availables'
import AvailableItem from '../../components/Available/AvailableItem'

export const Route = createLazyFileRoute('/availables/')({
  component: Available,
})

function Available() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [availables, setAvailables] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getAvailableData = async () => {
      setIsLoading(true)
      const result = await getAvailables()
      if (result.success) {
        setAvailables(result.data)
      }
      setIsLoading(false)
    }

    if (token) {
      getAvailableData()
    }
  }, [token])

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">
            Please login first to get Available data!
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
            onClick={() => navigate({ to: '/availables/create' })}
            className="btn btn-primary"
          >
            Add New Available
          </button>
        </Col>
      </Row>

      <Row className="mt-4">
        {availables.length === 0 ? (
          <h1>Availables not found!</h1>
        ) : (
          availables.map((available) => (
            <AvailableItem
              available={available}
              key={available?.id}
            />
          ))
        )}
      </Row>
    </>
  )
}
