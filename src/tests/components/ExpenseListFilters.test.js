import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import expenses from '../fixtures/expenses'
import { filters, altFilters } from '../fixtures/filters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(()=>{
	setTextFilter = jest.fn()
	sortByDate = jest.fn()
	sortByAmount = jest.fn()
	setStartDate = jest.fn()
	setEndDate = jest.fn()
	wrapper = shallow(
		<ExpenseListFilters
			filters={filters}
			setTextFilter={setTextFilter}
			sortByDate={sortByDate}
			sortByAmount={sortByAmount}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
		/>)
})

test('should render ExpenseListFilters default filters',()=>{
	expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilters default filters',()=>{
	wrapper.setProps({
		filters: altFilters
	})
	expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
	const e = {target: {value: 'My new value'}}
	wrapper.find('input').simulate('change', e)
	expect(setTextFilter).toHaveBeenLastCalledWith(e.target.value)
})

test('should handle sort by date', () => {
	const e = {target: {value: 'date'}}
	wrapper.find('select').simulate('change', e)
	expect(sortByDate).toHaveBeenLastCalledWith()
})

test('should handle sort by amount', () => {
	const e = {target: {value: 'amount'}}
	wrapper.find('select').simulate('change', e)
	expect(sortByAmount).toHaveBeenLastCalledWith()
})

test('should handle date change', () => {
	const startDate = moment(0)
	const endDate = startDate.add(3, 'days')
	wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate})
	expect(setStartDate).toHaveBeenLastCalledWith(startDate)
	expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('should handle date focus change', () => {
	const focused = 'endDate'
	wrapper.find('DateRangePicker').prop('onFocusChange')(focused)
	expect(wrapper.state('calendarFocused')).toEqual(focused)
})