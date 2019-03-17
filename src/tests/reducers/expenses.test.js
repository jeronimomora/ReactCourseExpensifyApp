import moment from 'moment'
import expenses from '../fixtures/expenses'
import expensesReducer from '../../reducers/expenses'

test('should setup default expenses values',() => {
	const state = expensesReducer(undefined,{ type: '@@INIT' })
	expect(state).toEqual([])
})

test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[2].id
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([expenses[0], expenses[1]])
})

test('should not remove expenses if id not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([expenses[0], expenses[1], expenses[2]])
})

test('should add expense', () => {
	const expense = {
		id: '4',
		description: 'affito',
		note: '',
		amount: 109500,
		createdAt: moment(0).subtract(5,'days').valueOf()
	}
	const action = {
		type: 'ADD_EXPENSE',
		expense
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([expenses[0], expenses[1], expenses[2], expense])
})

test('should edit expense', () => {
	const expense = expenses[0]
	const note = 'testing editting'
	expense.note = note
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[0].id,
		updates: {
			note
		}
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([expense, expenses[1], expenses[2]])
})

test('should not edit expense if not found', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: '-1',
		updates: {
			note: 'yeet'
		}
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([expenses[0], expenses[1], expenses[2]])
})
