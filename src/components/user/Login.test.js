import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";

it("Error handler check", () => {
    const wrapper = shallow(<Login />);

    //login button click simulation
    const loginButton = wrapper.find("#loginButton");
    loginButton.simulate('click', {
        preventDefault: () => {
        }
    });

    const errorMessage = wrapper.find('#errorMessage');
    const result = errorMessage.text();

    expect(result).toBe("Fields cannot be empty!");
});


it("Change Values and check", () => {
    const wrapper = shallow(<Login />);

    //email and password field references
    let emailInput = wrapper.find("#emailInputId");
    let passwordInput = wrapper.find("#inputPassword");

    //add values to inputs
    emailInput.simulate('change', { target: { value: 'fyugma@gmail.com' } })
    //get the updated wrapper
    emailInput = wrapper.find("#emailInputId");

    //add values to inputs
    passwordInput.simulate('change', { target: { value: 'password123' } })
    //get the updated wrapper
    passwordInput = wrapper.find("#inputPassword");

    //test expected values
    expect(emailInput.props().value).toBe("fyugma@gmail.com");
    expect(passwordInput.props().value).toBe("password123");
});



