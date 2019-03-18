import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseSummary } from '../../components/ExpenseSummary'
import expenses from '../fixtures/expenses'

test('snapshot for one expense', () => {
	const wrapper = shallow(<ExpenseSummary expensesCount={1} expensesTotal={10000}/>)
	expect(wrapper).toMatchSnapshot()
})

test('snapshot for two expenses', () => {
	const wrapper = shallow(<ExpenseSummary expensesCount={2} expensesTotal={20000}/>)
	expect(wrapper).toMatchSnapshot()
})