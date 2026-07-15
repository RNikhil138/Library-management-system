import React, { useState } from 'react';

function Vote({ initialId = '', initialVoterName = '', initialCandidate = '' }) {
  const [id, setId] = useState(initialId);
  const [voterName, setVoterName] = useState(initialVoterName);
  const [candidate, setCandidate] = useState(initialCandidate);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Voter Name:</strong> {voterName}</p>
      <p><strong>Candidate:</strong> {candidate}</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Vote Information</h1>
      <Vote initialId="123" initialVoterName="Alice" initialCandidate="Candidate A" />
      <Vote initialId="456" initialVoterName="Bob" initialCandidate="Candidate B" />
      {/* Add more Vote components if needed */}
    </div>
  );
}

export default App;