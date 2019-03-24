import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'
import { 
	startAddExpense, 
	addExpense, 
	editExpense, 
	removeExpense,
	startRemoveExpense,
	setExpenses,
	startSetExpenses,
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'

const createMockStore = configureMockStore([thunk])

beforeEach(async (done) => {
	const expensesData = {}

	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = {
			description,
			note,
			amount,
			createdAt
		}
	})

	await database.ref('expenses').set(expensesData)
	done()
})

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
	const result = addExpense(expenses[2])
	expect(result).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenses[2],
		}
	})
})

test('should add expense to detabase and store', async () => {

	const store = createMockStore({})

	const expenseData = {
		description: 'Mouse',
		amount: 3000,
		note: 'This one is better',
		createdAt: 1000
	}

	await store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		})

		return database.ref(`expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData)
	})
})

test('should add expense with defaults to detabase and store', async () => {
	const store = createMockStore({})

	const expenseData = {
		description: '',
		amount: 0,
		note: '',
		createdAt: 0
	}

	await store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		})

		return database.ref(`expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData)
	})	
})

test('should set up set expense action object with data', () => {
	const action = setExpenses(expenses)

	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	})
})

test('should fetch data from firebase', (done) => {

	const store = createMockStore({})

	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		})
	})

	done()

})

test('should remove expense from firebase', (done) => {
	const store = createMockStore({})

	const id = expenses[2].id

	store.dispatch(startRemoveExpense({ id })).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		})

		return database.ref(`expenses/${id}`).once('value')

	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy()
		done()
	})

})