import { Advocate } from "../types/advocate";

const AdvocateRow = (
    {firstName, lastName, city, degree, specialties, yearsOfExperience, phoneNumber}: Advocate) => {
    return (  
        <tr style={{border: '1px solid black'}}>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{city}</td>
        <td>{degree}</td>
        <td>
          {specialties.map((s, specialtyIndex: number) => (
            <div key={specialtyIndex}>{s}</div>
          ))}
        </td>
        <td>{yearsOfExperience}</td>
        <td>{phoneNumber}</td>
      </tr>
    );
}
 
export default AdvocateRow;