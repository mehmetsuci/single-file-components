import "raf/polyfill";
import "jsdom-global/register";
import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import ReactSerializer from "../../lib/serializer/react";
import { stringToReact } from "../utils/stringToReact";

Enzyme.configure({ adapter: new Adapter() });

async function mount(path) {
  const { fileDescriptor, ExpectedClass } = await import(path);
  const serializedClassString = new ReactSerializer().serialize(fileDescriptor);
  const SerializedClass = stringToReact(serializedClassString);
  const serialized = Enzyme.mount(<SerializedClass />);
  const expected = Enzyme.mount(<ExpectedClass />);
  return { serialized, expected };
}

describe("ReactSerializer", () => {
  test("an sigle div", async () => {
    const { serialized, expected } = await mount("./fixtures/singleDiv");
    expect(serialized.html()).toBe(expected.html());
  });

  test("a div with text", async () => {
    const { serialized, expected } = await mount("./fixtures/divWithText");
    expect(serialized.html()).toBe(expected.html());
  });

  test.skip("a div with attrs", async () => {
    const { serialized, expected } = await mount("./fixtures/divWithAttrs");
    expect(serialized.html()).toBe(expected.html());
  });

  test("a div with a child element", async () => {
    const { serialized, expected } = await mount("./fixtures/divWithChild");
    expect(serialized.html()).toBe(expected.html());
  });

  test.skip("functional code", async () => {});
});