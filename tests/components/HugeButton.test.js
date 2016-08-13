import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import HugeButton from '../../app/components/HugeButton';

test('some test', t => {
  const wrapper = shallow(<HugeButton>Test</HugeButton>);

  t.is(wrapper.name(), 'View');
  t.is(wrapper.children().length, 1);
  t.is(wrapper.children().first().name(), 'Text');
});
