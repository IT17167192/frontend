import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";

it("Check footer text with year", () => {
    const wrapper = shallow(<Footer/>);
    const span = wrapper.find("span");
    const result = span.text();

    expect(result).toBe(`Application Framework Finals ${new Date().getFullYear()}`);
})
