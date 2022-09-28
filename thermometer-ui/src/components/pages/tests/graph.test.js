import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Graph from '../Graph'
import renderer from 'react-test-renderer';
import {defaultOptions} from "canvasjs/src/constants/options";
import {CanvasJSChart} from "canvasjs-react-charts";

it('changes the class when hovered', () => {
    const component = renderer.create(
        <CanvasJSChart options = {options}></CanvasJSChart>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    renderer.act(() => {
        tree.props.onMouseEnter();
    });
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    renderer.act(() => {
        tree.props.onMouseLeave();
    });
    // re-rendering
    tree = component.toJSON();
})
