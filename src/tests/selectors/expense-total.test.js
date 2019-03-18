import getExpenseTotal from '../../selectors/expense-total.js'
import expenses from '../fixtures/expenses'

test('should return 0 if no expenses', () => {
	expect(getExpenseTotal([])).toEqual(0)
})

test('should correctly add up single expense', () => {
	expect(getExpenseTotal([expenses[0]])).toEqual(expenses[0].amount)
})

test('should correctly add up multiple expenses', () => {
	const expenseTest = [{
		amount: 1
	},{
		amount: 2
	},{
		amount: 3
	}]

	expect(getExpenseTotal(expenseTest)).toEqual(6)
})