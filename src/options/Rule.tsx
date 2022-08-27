import React from 'react';
import {
  Form, Button, Card, Row, Col,
} from 'react-bootstrap';
import { Rule as RuleSettings } from '../domain/Rule';

export interface RuleProps {
  rule: RuleSettings;
  removeRule(): void;
  setRule(rule: RuleSettings): void;
}

export interface RuleState {
  rule: Partial<RuleSettings>;
}

class Rule extends React.Component<RuleProps, RuleState> {
  constructor(props) {
    super(props);
    this.state = { rule: { ...props.rule } };
  }

  updateRule(event) {
    const { rule } = this.state;
    const { setRule } = this.props;
    setRule(rule as any as RuleSettings);
    console.log(rule);
    event.preventDefault();
  }

  render() {
    const { rule } = this.state;
    const { removeRule } = this.props;
    return (
      <Card>
        <Card.Body>
          <Form onSubmit={(e) => this.updateRule(e)}>
            <Row>
              <Col>
                <Form.Control placeholder="Domain" value={rule.domain} onChange={(e) => this.setState({ rule: { ...rule, domain: e.target.value } })} />
              </Col>
              <Col>
                <Form.Control placeholder="AuthStrategy" value={rule.authStrategy} onChange={(e) => this.setState({ rule: { ...rule, authStrategy: e.target.value } })} />
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
          <Card.Footer>
            <Button type="button" className="run" aria-label="Run" onClick={() => removeRule()}>Delete</Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }
}

export default Rule;
