import moment from 'moment'
import filtersReducer from '../../reducers/filters'

test('should setup default filter values',() => {
	const state = filtersReducer(undefined,{ type: '@@INIT' })
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month'),
	})
})

test('should set sortby to amount', () => {
	const state = filtersReducer(undefined,{ type: 'SORT_BY_AMOUNT' })
	expect(state.sortBy).toBe('amount')
})

test('should set sortby to date', () => {
	const state = { sortBy: 'test' }
	const result = filtersReducer(state,{ type: 'SORT_BY_DATE' })
	expect(result.sortBy).toBe('date')
})

test('should set text filter', () => {
	const state = filtersReducer(undefined,{ type: 'SET_TEXT_FILTER', text: 'r' })
	expect(state.text).toBe('r')
})

test('should set start date filter', () => {
	const date = moment()
	const state = filtersReducer(undefined,{ type: 'SET_START_DATE', startDate: date })
	expect(state.startDate).toBe(date)
})

test('should set end date filter', () => {
	const date = moment()
	const state = filtersReducer(undefined,{ type: 'SET_END_DATE', endDate: date })
	expect(state.endDate).toBe(date)
})