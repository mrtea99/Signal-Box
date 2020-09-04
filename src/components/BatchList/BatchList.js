import React from 'react';

function BatchList(props) {

  const batchItems = props.batchData.map((batch, index) =>
    <tr key={batch.uid}>
      <td>{batch.batchInfo.batchId}</td>
      <td>{batch.productInfo.productName}</td>
      <td>{batch.activeStep}</td>
      <td><button onClick={(e) => props.setCurrentBatch(batch.uid, batch.activeStep)}>Edit</button></td>
      <td><button onClick={(e) => props.deleteBatch(batch.uid)}>Delete</button></td>
    </tr>
  )

  return (
    <>
      <h2>Batch List:</h2>
      <table>
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Product</th>
            <th>Step</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {batchItems}
        </tbody>
      </table>
    </>
  )
}

export default BatchList;