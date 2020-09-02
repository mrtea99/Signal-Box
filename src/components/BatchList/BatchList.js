import React from 'react';

function BatchList(props) {

  function editBatch(uid) {
    props.setCurrentBatchUid(uid)
  }

  function deleteBatch(index) {
    let newData = [...props.batchData];
    newData.splice(index, 1)
    props.setBatchData(newData);
  }
  
  const batchItems = props.batchData.map((batch, index) =>
    <tr key={batch.uid}>
      <td>{batch.batchInfo.batchId}</td>
      <td>{batch.productInfo.productName}</td>
      <td><button onClick={(e) => editBatch(batch.uid)}>Edit</button></td>
      <td><button onClick={(e) => deleteBatch(index)}>Delete</button></td>
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