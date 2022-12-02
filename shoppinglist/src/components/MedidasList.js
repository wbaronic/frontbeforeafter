import React, { useEffect,useState } from 'react';
function MedidasList() {
  const [medidas, setMedidas] = useState([]);

const columns = [
    {field: 'kg', headerName: 'kg', width: 200},
    {field: 'fat', headerName: 'Fat', width: 200},
    {field: 'water', headerName: 'Water', width: 150},
    {field: 'muscle', headerName: 'Muscle', width: 150},
    {field: 'kcal', headerName: 'Kcal', width: 150},
    {field: 'bone', headerName: 'Bone', width: 150}

  
  ];


useEffect(() => {
    fetch('http://localhost:8080/api/medidasInternases')
    .then(response => response.json())
    .then(data => setMedidas(data._embedded.medidasInternases))
    .catch(err => console.table(err));    
  }, []);
  
  return(
        <div>
    <table>
      <tbody>
      {
        medidas.map((medidas, index) =>
          <tr key={index}>
            <td>{medidas.kg}</td>
            <td>{medidas.fat}</td>
            
          </tr>)
      }
      </tbody>
    </table>
  </div>
  );
}
export default MedidasList;