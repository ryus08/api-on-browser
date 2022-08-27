import React from 'react';
import {
  Button, Container, Row,
} from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup';
import { Rule as RuleSettings } from '../domain/Rule';
import useChromeStorage from '../hooks/useChromeStorage';
import Rule from './Rule';

export default function Rules() {
  const [rules, setRules] = useChromeStorage<RuleSettings[]>('rules', []);
  return (
    <div>
      <CardGroup>
        <Container>
          {rules.map((rule) => (
            <Row key={rule.id}>
              <Rule
                rule={{ ...rule }}
                removeRule={() => setRules(rules.filter((x) => x.id !== rule.id))}
                setRule={(updatedRule) => setRules(rules.map((x) => {
                  if (x.id !== rule.id) {
                    return x;
                  }
                  return { ...updatedRule };
                }))}
              />
            </Row>
          ))}
          <Row>
            <Button onClick={() => {
              const nextId = Array.from({ length: rules.length + 1 }, (_, i) => i + 1)
                .find((i) => !rules.map((x) => x.id).includes(i));
              return setRules([...rules, { id: nextId, authStrategy: '', urlFilter: '' }]);
            }}
            >
              <i className="bi bi-plus-circle" />
            </Button>
          </Row>
        </Container>
      </CardGroup>
    </div>
  );
}
