import React from 'react'
import numeral from 'numeral'
import { connect } from 'react-redux'
import getExpenseTotal from '../selectors/expense-total'
import getVisibleExpenses from '../selectors/expenses'

export const ExpenseSummary = (props) => {
	return (<div>
	{
			props.expensesCount > 0 ?
		(
			<h1>Viewing {props.expensesCount} {' '}
			{props.expensesCount > 1 ? 'expenses' : 'expense'} totalling {' '}
			{numeral(props.expensesTotal/100).format('$0,0.00')}</h1>
		)
		 : (<h1>Viewing 0 expenses totalling $0.00</h1>)
		
	}</div>)
}

const mapStateToProps = (state) => {
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
	return {
		expensesCount: visibleExpenses.length,
		expensesTotal: getExpenseTotal(visibleExpenses)
	}
}

export default connect(mapStateToProps)(ExpenseSummary)