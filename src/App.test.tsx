import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import App, { API_ENDPOINT } from './App';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
];

export const restHandlers = [
  rest.get(API_ENDPOINT, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(list));
  })
];

const server = setupServer(...restHandlers);

// Start server before all tests vitest.dev/guide/mocking.html
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
// Reset handlers after each test
// **Important for test isolation**
afterEach(() => server.resetHandlers());
// Close server after all tests
afterAll(() => server.close());

describe('App', () => {
  test('Fetches data with a list', async () => {
    render(<App />);

    expect(screen.getByText(/Hacker/i));
  });
  //     axios.get.mockImplementationOnce(() => promise);

  //     let component;

  //     await renderer.act(async () => {
  //       component = renderer.create(<App />);
  //     });

  //     expect(component.root.findByType(List).props.list).toEqual(list);
  //   });

  //   it('fails fetching data with a list', async () => {
  //     const promise = Promise.reject();

  //     axios.getMockImplementationsOnce(() => promise);

  //     let component;

  //     await renderer.act(async () => {
  //       component = renderer.create(<App />);
  //     });

  //     expect(
  //       component.root.findByType('p').props.children
  //     )
  //       .toEqual(
  //         'Something went wrong...'
  //       );
  //   });
});

// describe('Item', () => {
//   const item = {
//     title: 'React',
//     url: 'https://reactjs.org/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   };

//   const handleRemoveItem = jest.fn();

//   let component;

//   beforeEach(() => {
//     component = renderer.create(
//       <Item item={item} onRemoveItem={handleRemoveItem} />
//     );
//   });

//   test('renders snapshot', () => {
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   })

//   it('renders all properties', () => {
//     expect(
//       component.root.findAllByProps({ children: 'Jordan Walke' })
//         .length
//     ).toEqual(1);
//   });
//   it('calls onRemoveItem on button click', () => {
//     component.root.findByType('button').props.onClick();

//     expect(handleRemoveItem).toHaveBeenCalledTimes(1);
//     expect(handleRemoveItem).toHaveBeenCalledWith(item);
//     expect(component.root.findAllByType(Item).length).toEqual(1);
//   });
// });

// describe('List', () => {
//   const list = [
//     {
//       title: 'React',
//       url: 'https://reactjs.org/',
//       author: 'Jordan Walke',
//       num_comments: 3,
//       points: 4,
//       objectID: 0,
//     },
//     {
//       title: 'Redux',
//       url: 'https://redux.js.org/',
//       author: 'Dan Abramov, Andrew Clark',
//       num_comments: 2,
//       points: 5,
//       objectID: 1,
//     }
//   ];

//   it('renders two items', () => {
//     const component = renderer.create(<List list={list} />);
//     expect(component.root.findAllByType(Item).length).toEqual(2);
//   });
// });

// describe('SearchForm', () => {
//   const searchFormProps = {
//     searchTerm: 'React',
//     onSearchInput: jest.fn(),
//     onSearchSubmit: jest.fn(),
//   };

//   let component;

//   beforeEach(() => {
//     component = renderer.create(<SearchForm {...searchFormProps} />);
//   });

//   it('renders the input field with its value', () => {
//     const value = component.root.findAllByType(InputWithLabel).props.value;
//     expect(value).toEqual('React');
//   });

//   it('changes the input field', () => {
//     const pseudoEvent = { target: 'Redux' };

//     component.root.findByType('input').props.onChange(pseudoEvent);

//     expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
//     expect(searchFormProps.onSearchInput).toHaveBeenCalledWith(
//       pseudoEvent
//     );
//   });

//   it('submits the form', () => {
//     const pseudoEvent = {};

//     component.root.findByType('form').props.onSubmit(pseudoEvent);

//     expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
//     expect(searchFormProps.onSearchSubmit).toHaveBeenCalledWith(
//       pseudoEvent
//     );
//   });

//   it('disables the button and prevents submit', () => {
//     component.update(
//       <SearchForm {...searchFormProps} searchTerm="" />
//     );

//     expect(
//       component.root.findByType('button').props.disabled
//     ).toBeTruthy();
//   });
// });
