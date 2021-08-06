import React, {useState, useEffect} from "react";

const PaymentResume = (props) => {
    const {dataSeason} = props
    const [priceResume, setPriceResume] = useState({})
    
    useEffect(() => {
        setPriceResume(dataSeason)
    }, [dataSeason])
    
    const PricesSeason = () => {
        const listEntries = []
        const seasonName = {
            lowSeason: 'temporada baja',
            midSeason: 'temporada media',
            highSeason: 'temporada alta',
        }
        for (let key in priceResume) {
            if (priceResume[key].length) {
                listEntries.push(
                    <>
                    <tr>
                        <td><p style={{fontSize: 12}}><strong>{priceResume[key].length}</strong> noches en {seasonName[key]}</p></td>
                        <td><p style={{fontSize: 12}}>$ {priceResume[key][0]}</p></td>
                    </tr>
                    </>
                )
            }
        }
        return listEntries.map(column => column)
    }

  return (
    <div>
      <table className="table table-striped table-sm table-responsive">
        <thead>
          <tr>
            <th scope="col"># Noches por temporada</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
            {
                priceResume && <PricesSeason/>
            }
        </tbody>
      </table>
    </div>
  );
};

export default PaymentResume;
