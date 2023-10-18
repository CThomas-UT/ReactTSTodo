# React TS ToDo List

# What I’ve learned

[https://chat.openai.com/share/20ec7734-3b03-4f63-99e8-ba0e4bd63843](https://chat.openai.com/share/20ec7734-3b03-4f63-99e8-ba0e4bd63843)

### NPM

---

node package manager

tool installed alongside node.js, seems similar to docker, but for front end packages

using package.json allows you to setup and download the environment and correct packages

inside of here you can have scripts, where you can call “npm run *************script-name*************” which will run the called script

using package-lock.json sets it up in a way to have consistency from devs versioning

---

### React

---

*********************************************Importing Components*********************************************

```tsx
import React, { useEffect, useRef, useState } from 'react';
```

import React from ‘react’ is a default import

this means that React is the default export, which can only be used once, like in

```tsx
function myApp () {
// something
}
export default myApp
```

import { useEffect, etc.} is a named import

this means that ‘react’ has components like such, which can be done multiple times

```tsx
export const myFunc = () => {/*something*/}
```

**********Side Note:**********

the use of const and function differs because function is used when writing out a whole function

const is used when creating an arrow function

---

******************************************************************************************************Add AutoFocus on input element (useRef hook)******************************************************************************************************

*************useRef************* creates a reference for react components which allows them to be accessed and manipulated without refreshes

The below code creates a var inputRef with the useRef hook which initializes the ref to null, but its typing is specifically for HTML inputs

```tsx
const inputRef = useRef<HTMLInputElement>(null)
```

Calling the below in the input for the render allows the value to change from null to the specified input

```tsx
<input
          ref={inputRef} //the important part
          value={input}
/>
```

Once mounted (inserted into the dom), the below code will run true, and will run only once (given the empty array (dependency array)

```tsx
useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
```

---

******************************React Context******************************

*React Context API* is a feature in React that allows data to be shared and accessed by components without passing it explicitly through props

- it creates a global state that all can access

1. ****************************Create Context****************************
    
    make a call ******createContext()****** to initialize the context object
    
2. ************************Provide Context************************
    
    wrap a component with *<Context.Provider>*
    
    this accepts a prop where you input the value you want provided to context
    
3. ******************************Consume Context******************************
    
    The ***useContext()*** hook which uses the created context as an arg allows you to access in components
    
4. ******************Update Context******************
    
    Changes in the parent context provide updates that propagate through the components
    

---

************************************************************************************************************Custom Hook to consume React Context************************************************************************************************************

---

### Type Script

---

***************************************************************TypeScript Auto-Assign Types***************************************************************

TypeScript will auto-assign types if you use:

```tsx
const [input, setInput] = useState('')
```

In the above, the ‘’ allow typescript to infer string, so when the below is called, it knows it’s a string

```tsx
onChange={e => setInput(e.target.value)}
```

---

***************************************TypeScript Generic Typing***************************************

******************************use when uncertain about types******************************

you can initialize like above with a ‘’ inside of the use state, but you can also allow both string and num as inputs with the code below:

```tsx
const [input, setInput] = useState<string | number>('')
```

This now allows the input to be either a string or a num

******Note:******

if you only want strings to be allowed, you can take out the “| number” and just use “<string>”

---

******************************************************************************************TypeScript Submission Handling******************************************************************************************

The below code prevents the form submission from doing the default (usually navigation or reloading page)

```tsx
****React.FormEvent.preventDefault()****
```

******Notes:******

React.FormEvent is specifically used for form handling

Building a function for form handling would then go as follows, where e is the event:

```tsx
const handleSubmission = (e: React.FormEvent) => {
  e.preventDefault();
};
```

Then to call it within the form element would be done as follows:

```tsx
<form onSubmit={handleSubmission}>
	<button type="submit">Submit</button>
</form>
```

---

***************************************************************************************Make React Elements Type Safe***************************************************************************************

Must use f**********orwardRef**********  which will allow ref to be passed from parent to child component

Basically creating a parent class will ensure it’s type safe

```tsx
import { InputHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...rest }, ref) => {
  return (
    <input
      {...rest}
      ref={ref}
      className={cn(
        'w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-500 focus:border-white',
        className,
      )}
    />
  )
})
```

1. The component utilizes the `forwardRef` function from React to forward the ref to the underlying `<input>` element. This allows the parent components to access and manipulate the input element directly.
2. `HTMLInputElement` specifies the type of the ref that will be forwarded to the underlying `<input>` element. This ensures that the ref is compatible with the input element's expected type.
3. `InputHTMLAttributes<HTMLInputElement>` specifies the type of the props object that the component accepts. This includes all the standard HTML input element attributes, such as `value`, `placeholder`, `onChange`, and so on.
4. The component destructures the `className` prop from the `rest` object and also receives the `ref` as a parameter.
5. Inside the component, a JSX expression is used to render an `<input>` element. The spread operator (`{...rest}`) is used to pass all the props (except `className` and `ref`) received by the component to the `<input>` element. This ensures that any additional attributes passed to the `<Input>` component will be applied to the underlying `<input>` element.
6. The `ref` is assigned to the underlying `<input>` element using the `ref` attribute, enabling the parent component to reference the input element.
7. The `className` is constructed using the `cn` function from the `classnames` module. This function combines multiple CSS class names based on the provided conditions. In this case, it combines the default input element class names with the `className` prop passed to the `<Input>` component.

The final rendered `<input>` element will have the combined class names and inherit all other props passed to the `<Input>` component.

---

*********************************************************Typescript Interface*********************************************************

*A typescript interface is way to define the structure and shape of an object*

allows you to specify the types and properties an object should have

They look like the below code:

```tsx
interface TodoContextProps {
  todos: string[]
  addTodo: (text: string) => void
}
```

This interface is for the object TodoContextProps, and it sets up two properties, *todos* which is an array of strings, and addTodo which is a function that takes in a “text” which is string and then has a return type of void

---