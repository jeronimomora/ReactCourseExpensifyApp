import moment from 'moment'

//get visible expenses
export default (expenses, {text, sortBy, startDate, endDate}) => {
	return expenses.filter((expense) => {
		const startDateMatch = startDate ? startDate.isSameOrBefore(moment(expense.createdAt), 'day') : true
		const endDateMatch = endDate ? endDate.isSameOrAfter(moment(expense.createdAt), 'day') : true
		const description = expense.description.toLowerCase()
		const textLower = text.toLowerCase()
		const textMatch = description.includes(textLower)

		return startDateMatch && endDateMatch && textMatch
	}).sort((a, b) => {
		if(sortBy === 'date'){
			return a.createdAt < b.createdAt ? 1 : -1
		}
		else if(sortBy === 'amount'){
			return a.amount < b.amount ? 1 : -1
		}
	})
}