# DynamicForm

A TypeScript-based form management system designed to streamline form handling with validation, context management, and dynamic form array manipulation.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Components](#components)
  - [Custom Hooks](#custom-hooks)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Dynamic Form Arrays**: Easily add, insert, and remove items from form arrays.
- **Validation**: Customizable validation rules for fields.
- **Context Management**: Centralized form state and error handling through React Context.
- **TypeScript Support**: Strong typing ensures better development experience and fewer runtime errors.

## Installation

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/your-username/form-management-system.git
    cd form-management-system
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Start the Development Server**:
    ```sh
    npm start
    ```

## Usage

### Components

#### `Field`

A component for rendering form input fields with optional validation.

**Props:**
- `name` (string): The name of the field.
- `validation` (ValidationRules): Validation rules for the field.
- `blurHandler` (function): Function to handle field blur events.

**Example:**
```tsx
<Field
  name="email"
  type="email"
  validation={{
    required: true,
    minLength: 5,
    maxLength: 50,
    match: { format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
  }}
/>
```

#### `FieldErrors`

A component to display validation errors for a specific field.

**Props:**
- `fieldName` (string): The name of the field to display errors for.

**Example:**
```tsx
<FieldErrors fieldName="email" />
```

#### `Form`

The main component to manage form state and handle form submission.

**Props:**
- `form` (object): Contains form state, dispatch function, submit handler, and error handling functions.
- `children` (ReactNode): Form fields and components.

**Example:**
```tsx
<Form
  form={{
    state,
    dispatch,
    submitHandler,
    errors,
    setErrors
  }}
>
  <Field name="email" type="email" />
  <FieldErrors fieldName="email" />
  <button type="submit">Submit</button>
</Form>
```

#### `FormArray`

A component for handling arrays of form items, allowing dynamic addition, insertion, and removal of items.

**Props:**
- `name` (string): The name of the form array.
- `children` (ReactNode): The form fields to be rendered within each array item.
- `config` (object): Configuration for the array, including empty object template and optional legend.

**Example:**
```tsx
<FormArray name="contacts" config={{ emptyObj: { phone: "" }, withInsert: true }}>
  <Field name="phone" type="text" />
</FormArray>
```

### Custom Hooks

#### `useForm`

A custom hook to manage form state and handle form submissions.

**Usage:**
```tsx
import useForm from "@/hooks/useForm";

const MyForm = () => {
  const { state, dispatch, errors, setErrors, submitHandler } = useForm(initialData, handleSubmit);

  return (
    <Form form={{ state, dispatch, errors, setErrors, submitHandler }}>
      <Field name="email" type="email" />
      <FieldErrors fieldName="email" />
      <button type="submit">Submit</button>
    </Form>
  );
};
```

## Folder Structure

- `components/`: Contains reusable React components like `Field`, `FieldErrors`, `Form`, and `FormArray`.
- `contexts/`: React context providers and custom hooks.
- `lib/`: Utility functions and types.
- `reducer/`: Form reducer and related actions.
- `hooks/`: Custom React hooks for form management.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Create a new Pull Request.

Please ensure your code adheres to the existing style and is well-tested.