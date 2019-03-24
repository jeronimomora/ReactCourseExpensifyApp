import React from 'react'
import { shallow } from 'enzyme'
import { Header } from '../../components/Header'

test('should render header correctly', () => {
	const wrapper = shallow(<Header startLogout={() => {}}/>)
	expect(wrapper).toMatchSnapshot()
})

// should call startLogout on button click
test('should call startLogout on button click', () => {
	const spy = jest.fn()
	const wrapper = shallow(<Header startLogout={spy}/>)
	wrapper.find('button').simulate('click')
	expect(spy).toHaveBeenLastCalledWith()
})

