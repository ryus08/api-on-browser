import React from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import { Rule as RuleSettings } from '../domain/Rule';
import useChromeStorage from '../hooks/useChromeStorage';
import Rule from './Rule';

export default function Rules() {
  const [rules, setRules] = useChromeStorage<RuleSettings[]>('rules', [{ id: 1, domain: '', authStrategy: '' }]);
  const rule = rules[0];
  return (
    <div>
      <CardGroup>
        {rule && (
        <Rule
          // key={rule.id} // Getting id into storage seems to break the storage loading into the component
          rule={{ ...rule }}
          removeRule={() => setRules([{ id: 1, domain: '', authStrategy: '' }])}
          setRule={(updatedRule) => setRules([{ ...updatedRule }])}
        />
        )}

      </CardGroup>
    </div>
  );
}
