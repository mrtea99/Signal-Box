```jsx
<FormItem
  ident="textarea"
  type="textarea"
  label="Textarea Label"
  updateHandler={(value) => console.log(value)}
  defaultValue="Text area content"
/>
<br />
<FormItem ident="number" type="number" label="Number Field Label" value={1} updateHandler={(value) => console.log(value)} />
<br />
<FormItem ident="select" type="select" label="Select Field Label" value={"default"} updateHandler={(value) => console.log(value)}>
  <option value="default" disabled>
    Default Option
  </option>
  <option value="1">
    Option One
  </option>
  <option value="2">
    Option Two
  </option>
  <option value="3">
    Option Three
  </option>
</FormItem>
<br />
<FormItem ident="toggle-button" type="toggleButton" label="Toggle Button Label" value={"1"} updateHandler={(value) => console.log(value)} itemLabels={["One", "Two"]} itemValues={["1", "2"]}/>
<FormItem ident="toggle-button" type="toggleButton" label="Toggle Button Label" value={"1"} updateHandler={(value) => console.log(value)} itemLabels={["One", "Two", "Three"]} itemValues={["1", "2", "3"]} />
<br />
<br />
<FormItem ident="checkbox" type="checkbox" label="Checkbox Label" value={true} updateHandler={(value) => console.log(value)} />
<br />
<br />
<FormItem ident="date" type="date" label="Date Field Label" value={ Date.now() } updateHandler={(value) => console.log(value)} />
```
