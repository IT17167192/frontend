import React from "react";
import { shallow } from "enzyme";
import SideBar from "./SideBar";
import {ROUTES} from "../../config";

it("After click on login in the sidebar, it class name should change", () => {
    //mocking the history push method of header
    const historyMockHeader = { push: jest.fn() };
    //Mocking header location to landing page which equal to "/"
    historyMockHeader.location = {
        hash: "",
        pathname: ROUTES.login_page,
        search: "",
        state: undefined
    };

    const wrapper = shallow(<SideBar history={historyMockHeader}/>);
    let loginLink = wrapper.find('#testLogin');

    //simulate click
    loginLink.simulate("click");

    let loginClass = wrapper.find('#testClass');

    //check whether active class is there
    expect(loginClass.hasClass('active')).toBe(true);

})




