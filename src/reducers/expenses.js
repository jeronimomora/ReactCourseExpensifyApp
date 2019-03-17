const expensesReducerDefaultState = []

//expenses reducer
export default (state = expensesReducerDefaultState, action) => {
	switch(action.type){
		case 'ADD_EXPENSE':
			return [...state, action.expense]
		case 'REMOVE_EXPENSE':
			return state.filter((expense)=>{
				return expense.id != action.id
			})
		case 'EDIT_EXPENSE':
			return state.map((expense) => {
				if(expense.id == action.id){
					return {...expense, ...action.updates}
				}
				return expense
			})
		default:
			return state
	}
}