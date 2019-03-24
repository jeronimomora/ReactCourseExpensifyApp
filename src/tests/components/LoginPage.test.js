import React from 'react'
import { shallow } from 'enzyme'
import { LoginPage } from '../../components/LoginPage'

test('should render login page correctly', () => {
	const wrapper = shallow(<LoginPage />)
	expect(wrapper).toMatchSnapshot()
})

test('should call startLogin page on button click', () => {
	const spy = jest.fn()
	const wrapper = shallow(<LoginPage startLogin={spy}/>)
	wrapper.find('button').simulate('click')
	expect(spy).toHaveBeenLastCalledWith()
})