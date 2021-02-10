import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";
import {ROUTES} from "../../config";

it("Header expected names should be matched", () => {
    //mocking the history push method
    const historyMock = { push: jest.fn() };
    //Mocking header location to landing page which equal to "/"
    historyMock.location = {
        hash: "",
        pathname: ROUTES.landing_page,
        search: "",
        state: undefined
    };

    const wrapper = shallow(<Header history={historyMock}/>);
    const list = wrapper.find('#signupLink');
    const result = list.text();

    expect(result).toBe("SIGNUP");
});

