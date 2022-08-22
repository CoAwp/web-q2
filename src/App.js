import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [dataArray, setDataArray] = useState("");

  const searchTable = (e) => {
    e.preventDefault();
    let foundedList = [];
    dataArray.forEach((item) => {
      if (item.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
        return foundedList.push(item);
      }
      return false;
    });
    if (foundedList.length === 0) {
      document.getElementById("respondText").innerHTML = `Your search "${searchText}" did not match any items.`;
    } else if(searchText === ""){
      document.getElementById("respondText").innerHTML = "";
    } else {
      document.getElementById("respondText").innerHTML = `<h3>${foundedList.length} item(s) found</h3>`;
    }
    mapTableCell(foundedList);
  };

  const mapTableCell = (data) => {
    let tableData = "";
    data.forEach((item, index) => {
      if (index % 3 === 0) {
        tableData += `<tr>`;
      }
      tableData += `<td>${item}</td>`;
      if (index % 3 === 2) {
        tableData += `</tr>`;
      }
    });
    document.getElementById("tableBody").innerHTML = tableData;
  };

  useEffect(() => {
    try {
      fetch("https://api.publicapis.org/categories")
        .then((res) => res.json())
        .then((res) => {
          setDataArray(res.categories);
          mapTableCell(res.categories);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignContent: "middle",
      }}
    >
      <div className="container">
        <div className="inputSection">
          <input onChange={(e) => setSearchText(e.target.value)} placeholder="Try Animal, Books, Event ,..." />
          <button onClick={searchTable}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="searchIcon"
            >
              <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z" />
            </svg>
          </button>
        </div>
        <div id="respondText"></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tableElement">
            <tbody id="tableBody"></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
