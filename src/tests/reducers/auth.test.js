import authReducer from '../../reducers/auth'

test('should login', () => {
	const state = {}
	const uid = 2
	const action = {
		type: 'LOGIN',
		uid
	}
	const result = authReducer(state, action)
	expect(result).toEqual({
		uid
	})
})

test('should logout', () => {
	const state = {}
	const action = {
		type: 'LOGOUT'
	}
	const result = authReducer(state, action)
	expect(result).toEqual({})
})