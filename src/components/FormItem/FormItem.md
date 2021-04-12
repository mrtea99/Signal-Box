```jsx
<FormItem
  ident="textarea"
  type="textarea"
  label="Textarea"
  updateHandler={(value) => console.log(value)}
  defaultValue="Text area content"
/>
```

```jsx
<FormItem
  ident="number"
  type="number"
  label="Number Field"
  value={1}
  updateHandler={(value) => console.log(value)}
/>
```

```jsx
<FormItem
  ident="select"
  type="select"
  label="Select Field"
  value={"default"}
  updateHandler={(value) => console.log(value)}
>
  <option value="default" disabled>
    Default Option
  </option>
  <option value="1">Option One</option>
  <option value="2">Option Two</option>
  <option value="3">Option Three</option>
</FormItem>
```

```jsx
<>
  <FormItem
    ident="toggle-button"
    type="toggleButton"
    label="Toggle Button"
    value={"1"}
    updateHandler={(value) => console.log(value)}
    itemLabels={["One", "Two"]}
    itemValues={["1", "2"]}
  />
  <FormItem
    ident="toggle-button-three"
    type="toggleButton"
    label="Toggle Button"
    value={"1"}
    updateHandler={(value) => console.log(value)}
    itemLabels={["One", "Two", "Three"]}
    itemValues={["1", "2", "3"]}
  />
</>
```

```jsx
<FormItem
  ident="checkbox"
  type="checkbox"
  label="Checkbox"
  value={1}
  updateHandler={(value) => console.log(value)}
  checked
/>
```

```jsx
<FormItem
  ident="date"
  type="date"
  label="Date Field Label"
  value={Date.now()}
  updateHandler={(value) => console.log(value)}
/>
```
