"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types/advocate";
import AdvocateRow from "./components/AdvocateRow";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    console.log("fetching advocates...");

    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      }).catch(err => {
        console.log("Error fetching advocates");
      });
    });

    return () => abortController.abort();
  }, []);

  const onChange = (e) => {
    const searchTermInput = e.target.value;
    setSearchTerm(searchTermInput.toLowerCase());
    
    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        (advocate.specialties.filter(specialty => specialty.toLowerCase().includes(searchTerm)).length > 0) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: {searchTerm}
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table style={{width:"90vw", justifyContent:"center"}}>
        <thead>
          <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate: Advocate, advocateIndex: number) => {
            return (
              <AdvocateRow key={advocateIndex} {...advocate} />
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
