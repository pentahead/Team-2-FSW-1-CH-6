import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createOption } from '../../service/option'
import Protected from '../../components/Auth/Protected'

export const Route = createLazyFileRoute('/options/create')({
  component: () => (
    <Protected roles={[1]}>
      <CreateOption />
    </Protected>
  ),
})

function CreateOption() {
  const navigate = useNavigate()

  const [optionName, setOptionName] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    const request = {
      optionName,
    }
    const result = await createOption(request)
    if (result?.success) {
      navigate({ to: '/options' })
      return
    }

    alert(result?.message)
  }

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Create Option</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="option_name">
                <Form.Label column sm={3}>
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={optionName}
                    onChange={(event) => {
                      setOptionName(event.target.value)
                    }}
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Create Option
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  )
}
