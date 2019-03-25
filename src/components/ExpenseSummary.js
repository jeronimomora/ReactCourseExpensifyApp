import React from 'react'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import getExpenseTotal from '../selectors/expense-total'
import getVisibleExpenses from '../selectors/expenses'

export const ExpenseSummary = (props) => {
	const expensesTotal = numeral(props.expensesTotal/100).format('$0,0.00')
	const expensesWord = props.expensesCount > 1 ? 'expenses' : 'expense'
	return (
		<div className="page-header">
		<div className="content-container">
	{
			props.expensesCount > 0 ?
		(
			<h1 className="page-header__title">Viewing <span>{props.expensesCount}</span> {` ${expensesWord} totalling `}<span>{expensesTotal}</span></h1>
		)
		 : (<h1>Viewing 0 expenses totalling $0.00</h1>)
		
	}
		<div className="page-header__actions">
			<Link className="button" to="/create">Add Expense</Link>
		</div>
	</div>
	</div>)
}

const mapStateToProps = (state) => {
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
	return {
		expensesCount: visibleExpenses.length,
		expensesTotal: getExpenseTotal(visibleExpenses)
	}
}

export default connect(mapStateToProps)(ExpenseSummary)