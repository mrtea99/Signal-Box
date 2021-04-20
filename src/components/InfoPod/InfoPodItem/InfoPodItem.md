```jsx
import InfoPod from "../InfoPod.js";
import InfoPodSection from "../InfoPodSection/InfoPodSection.js";
<>
  <InfoPod fullWidth>
    <InfoPodSection
      layout="vert"
      viewMode="full"
      bubbles={[
        <InfoPodItem active key={"one"} name="Bubble 1" value={1} />,
        <InfoPodItem active key={"two"} name="Bubble 2" value={2} />,
      ]}
    >
      <InfoPodItem name="Core" value={100} />
    </InfoPodSection>
  </InfoPod>
  <br />
  <br />
  <InfoPod>
    <InfoPodSection
      layout="horiz"
      viewMode="full"
      bubbles={[
        <InfoPodItem active key={"one"} name="Bubble 1" value={1} />,
        <InfoPodItem active key={"two"} name="Bubble 2" value={2} />,
      ]}
    >
      <InfoPodItem name="Core" value={100} />
    </InfoPodSection>
  </InfoPod>
</>;
```
