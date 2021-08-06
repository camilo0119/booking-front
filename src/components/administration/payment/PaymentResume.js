import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { MdModeEdit } from "react-icons/md";

const PaymentResume = (props) => {
  const { dataSeason } = props;
  const initialStateTotal = {
    totalNights: 0,
    totalPayment: 0,
  };
  const [priceResume, setPriceResume] = useState({});
  const [total, setTotal] = useState(initialStateTotal);

  useEffect(() => {
    setPriceResume(dataSeason);
    handleTotals();
  }, [dataSeason]);

  const PricesSeason = () => {
    const listEntries = [];
    const seasonName = {
      lowSeason: "temporada baja",
      midSeason: "temporada media",
      highSeason: "temporada alta",
    };
    for (let key in priceResume) {
      if (priceResume[key].length) {
        listEntries.push(
          <>
            <tr id={key}>
              <td>
                <p style={{ fontSize: 12 }}>
                  <strong>{priceResume[key].length}</strong> noches en{" "}
                  {seasonName[key]}
                </p>
              </td>
              <td>
                <p style={{ fontSize: 12 }}>
                    <NumberFormat
                      value={priceResume[key][0] * priceResume[key].length}
                      displayType="text"
                      thousandSeparator={true}
                      prefix="$"
                    />
                    <MdModeEdit/>
                </p>
              </td>
            </tr>
          </>
        );
      }
    }
    return listEntries.map((column) => column);
  };

  const handleTotals = () => {
    let totals = { ...initialStateTotal };
    for (let key in dataSeason) {
      if (dataSeason[key].length) {
        totals.totalNights = totals.totalNights + dataSeason[key].length;
        totals.totalPayment = totals.totalPayment + (Number(dataSeason[key][0]) * totals.totalNights);
      }
    }
    setTotal(totals);
  };

  return (
    // <div className="card">
    //   <div
    //     className="card-body"
    //     style={{ padding: 0, marginBottom: -15, paddingTop: -3 }}
    //   >
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Detalle noches</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {priceResume && <PricesSeason />}
            <tr className="table-active">
              <td>
                <p style={{ fontSize: 12 }}>
                  <strong>{total.totalNights} noches</strong>
                </p>
              </td>
              <td>
                <p style={{ fontSize: 12 }}>
                  <strong>
                    <NumberFormat
                      value={total.totalPayment}
                      displayType="text"
                      thousandSeparator={true}
                      prefix="$"
                    />
                    <MdModeEdit/>
                  </strong>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
    //   </div>
    // </div>
  );
};

export default PaymentResume;
