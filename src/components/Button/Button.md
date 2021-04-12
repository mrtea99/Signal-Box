```jsx
<Button onClick={() => alert("Clicked!")}>
  Default
</Button>
<>{ " " }</>
<Button color="cancel" onClick={() => alert("Clicked!")}>
  Cancel
</Button>
<>{ " " }</>
<Button color="delete" onClick={() => alert("Clicked!")}>
  Delete
</Button>
<br />
<br />
<Button color="complete" icon="tick" onClick={() => alert("Clicked!")}>
  Complete
</Button>
<>{ " " }</>
<Button color="Assign" icon="assign" onClick={() => alert("Clicked!")}>
  Assign
</Button>
<>{ " " }</>
<Button color="qa" icon="qa" onClick={() => alert("Clicked!")}>
  QA
</Button>
<br />
<br />
<Button color="note" icon="note" onClick={() => alert("Clicked!")}>
  Note
</Button>
<>{ " " }</>
<Button color="issue" icon="issue" onClick={() => alert("Clicked!")}>
  Issue
</Button>
<>{ " " }</>
<Button color="blocker" icon="blocker" onClick={() => alert("Clicked!")}>
  Blocker
</Button>


```

```jsx

<Button disabled icon="assign" onClick={() => alert("Clicked!")}>
  disabled
</Button>
<br />
<br />
<Button icon="assign" onClick={() => alert("Clicked!")} />
<br />
<br />
<Button featured icon="assign" onClick={() => alert("Clicked!")}>
  featured
</Button>
<br />
<br />
<Button iconFirst icon="assign" onClick={() => alert("Clicked!")}>
  iconFirst
</Button>
<br />
<br />
<Button fillWidth onClick={() => alert("Clicked!")}>
  fillWidth
</Button>

```
