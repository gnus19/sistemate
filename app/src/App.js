import { useEffect, useState } from "react"
import './App.css';

function App() {
  const [issueList, setIssueList] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [id, setId] = useState(3);


  useEffect(() => {
    fetch("http://localhost:4000/api/issues")
    .then(response => response.json())
    .then(list => setIssueList(list.list));
  }, [])

  const deleteItem = (itemId, issueIndex) => {
    const newList = [...issueList];
    newList.splice(issueIndex, 1);
    setIssueList(newList);
  };

  const addNewIssue = () => {
    const newLsit = [...issueList];
    setIssueList(newLsit.push({
      id,
      title: newTitle,
      description: newDescription,
      status: "OPEN"
    }));
    setNewTitle("");
    setNewDescription("");
    setId(id+1)
  }

  return (
    <div className="App">

      <h2>Issues</h2>
      <div>
        title: <input type="text" value={newTitle} onChange={(event) => setNewTitle(event.target.value)}></input>
        description: <input type="text" value={newDescription} onChange={(event) => setNewDescription(event.target.value)}></input>
      </div>
      <button onClick={() => addNewIssue()}>Add new Issue</button>
      <div className="issueContainer">
      {issueList &&
        issueList.map((issue, issueIndex) => (
          <div className="issueContent">
            <div className="titleContainer">
              <p><span>{issue.title}</span> - {issue.status}</p>
              <button onClick={() => deleteItem(issue.id, issueIndex)}>Delete</button>
            </div>
            {issue.description}
          </div>
        ))
      }
      </div>
    </div>
  );
}

export default App;
