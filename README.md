# Go-Logs GUI

Go-Logs frontend application built using [React](https://reactjs.org).

## Coding Rules 📖

### General

- No [callback hell](http://callbackhell.com), please.

#### Localization

- All texts that are to be displayed to the user must be localized.

### React

- Never put logic in JSX return statement. Not even ternary operator (`condition ? true : false`). Always define a variable to hold the result of the operation and use the variable in the return statement.
- Prefer composition to inheritance. Refer to [this](https://reactjs.org/docs/composition-vs-inheritance.html).
- Need to use state inside function components? [Use hooks](https://reactjs.org/docs/hooks-state.html).

### GraphQL

- Put all queries in `./src/graphql/queries` so they can be reused. Do not define queries anywhere else.
- Only query the required fields. Put the fields in `fragments` and reuse the fragments for other queries.
- Always define queries emitted from `graphql.macro.loader` outside the `render` function to prevent the query from being executed endless times.
