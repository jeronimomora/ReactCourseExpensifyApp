import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let wrapper, startEditExpense, startRemoveExpense, history

beforeEach(() => {
	history = { push: jest.fn() }
	startEditExpense = jest.fn()
	startRemoveExpense = jest.fn()
	wrapper = shallow(<EditExpensePage 
		expense={expenses[0]}
		history = {history}
		startEditExpense={startEditExpense}
		startRemoveExpense={startRemoveExpense}
		/>)
})

test('should render EditExpensePage correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should handle startEditExpense', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
	expect(history.push).toHaveBeenLastCalledWith('/')
	expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0])
})

test('should handle startRemoveExpense', () => {
	wrapper.find('button').simulate('click')
	expect(history.push).toHaveBeenLastCalledWith('/')
	expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[0].id})
})