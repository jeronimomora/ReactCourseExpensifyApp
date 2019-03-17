import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

test('should setup removeExpense action object', () => {
	const result = removeExpense({ id: '123abc' })
	expect(result).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	})
})

test('should setup editExpense action object', () => {
	const result = editExpense('123abc', {})
	expect(result).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {}
	})
})

test('should add expense with non defaults', () => {
	const expenseData = {
		description: 'Rent',
		amount: 109500,
		createdAt: 1000,
		note: 'This was last months rent',
	}
	const result = addExpense(expenseData)
	expect(result).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String)
		}
	})
})

test('should add expense default', () => {
	const result = addExpense()
	expect(result).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			description: '',
			note: '', 
			amount: 0, 
			createdAt: 0,
			id: expect.any(String)
		}
	})
})