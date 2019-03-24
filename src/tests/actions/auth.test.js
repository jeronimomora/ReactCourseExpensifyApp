import { login, logout } from '../../actions/auth'

test('should generate login action correctly', () => {
	const uid = 2
	const result = login(uid)
	expect(result).toEqual({
		type: 'LOGIN',
		uid
	})
})

test('should generate logout action correctly', () => {
	const result = logout()
	expect(result).toEqual({
		type: 'LOGOUT',
	})
})