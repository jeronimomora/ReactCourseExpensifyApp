import uuid from 'uuid'

export const addExpense = (
	{
		description = '',
		note = '', 
		amount = 0, 
		createdAt = 0 
	} = {}
) => ({
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt,
	},
	type: 'ADD_EXPENSE',
})

export const removeExpense = ({ id }) => ({
	type: 'REMOVE_EXPENSE',
	id
})

export const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id, 
	updates,
})