import React from "react";
import * as redux from "react-redux";
import { renderWithStore, fireEvent } from "test-utils";

import { useKeyPress } from "client/hooks/useKeyPress";

const Wrapper = ({ callback }: { callback: Function }): null => {
  useKeyPress({ callback });
  return null;
};

describe("useKeyPress hook", () => {
  let useDispatchSpy: any;
  let callbackSpy: Function;
  beforeEach(() => {
    useDispatchSpy = jest.spyOn(redux, "useDispatch");
    // callback is redux action thus needs a type in mock implementation
    callbackSpy = jest.fn().mockImplementation(() => ({ type: "test" }));

    renderWithStore(<Wrapper callback={callbackSpy} />, {});
  });

  afterEach(() => jest.resetAllMocks());

  it("calls action callback when alphabet key is pressed", async () => {
    fireEvent.keyPress(window, { key: "c" });

    expect(await useDispatchSpy).toHaveBeenCalled();
    expect(await callbackSpy).toHaveBeenCalledWith("c");
  });

  it("does not call action callback when other than alphabet key is pressed", async () => {
    fireEvent.keyPress(window, { key: "1" });

    expect(await useDispatchSpy).toHaveBeenCalled();
    expect(await callbackSpy).not.toHaveBeenCalled();
  })
});
