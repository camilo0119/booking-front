import React, { useState, useEffect, useRef } from "react";
import NumberFormat from "react-number-format";
import { MdModeEdit } from "react-icons/md";

const PaymentResume = (props) => {
  const { dataSeason } = props;
  const initialStateTotal = {
    totalNights: 0,
    totalPayment: 0,
  };
  const initialPricesSeason = {
    highSeason: null,
    lowSeason: null,
    midSeason: null,
  };

  const useOutSideInput = () => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
          setEditPriceMode(initialPricesSeason)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
        return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [inputRef])
  }

  const [priceResume, setPriceResume] = useState({});
  const [total, setTotal] = useState(initialStateTotal);
  const [priceNight, setPriceNight] = useState(initialPricesSeason);
  const [editPriceMode, setEditPriceMode] = useState(initialPricesSeason);
  const inputRef = useRef(null);
  useOutSideInput(inputRef);

  useEffect(() => {
    setPriceResume(dataSeason);
    handleTotals();
    console.log(dataSeason);
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
                  {!editPriceMode[key] ?
                    <p style={{ fontSize: 12 }}>
                      <strong>{priceResume[key].length}</strong> noches en {seasonName[key]}
                    </p>
                  :
                    <p>Nuevo valor por noche: </p>
                  }
              </td>
              <td>
                {
                  !editPriceMode[key] ?
                  <p style={{ fontSize: 12 }}>
                    <NumberFormat
                      value={priceResume[key][0] * priceResume[key].length}
                      displayType="text"
                      thousandSeparator={true}
                      prefix="$"
                    />
                    <MdModeEdit onClick={() => handleVisibilityInput(key)}/>
                  </p>
                  :
                  <input
                    className="form-control form-control-sm"
                    placeholder="Precio noche"
                    value={priceNight[key]}
                    name={key}
                    type="number"
                    onChange={handlePriceChange}
                    ref={inputRef}
                    style={{ width: 80 }}
                  />
                }
              </td>
            </tr>
          </>
        );
      }
    }
    return listEntries.map((column) => column);
  };

  const handlePriceChange = ({ target }) => {
    const { name, value } = target;
    console.log(value, priceNight, priceResume)
    setPriceResume((old) => ({
      ...old,
      [name]: priceResume[name].map(() => value)
    }));
    setPriceNight((old) => ({
      ...old,
      [name]: value
    }))
  };

  const handleVisibilityInput = (name) => {
    setEditPriceMode((old) => ({
      ...old,
      [name]: true
    }));
  }

  const handleTotals = () => {
    let totals = { ...initialStateTotal };
    for (let key in dataSeason) {
      if (dataSeason[key].length) {
        totals.totalNights += dataSeason[key].length;
        totals.totalPayment += Number(dataSeason[key][0]) * totals.totalNights;
      }
    }
    setTotal(totals);
  };

  return (
    <table className="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col" style={{ fontSize: 12 }}>
            Detalle noches
          </th>
          <th scope="col" style={{ fontSize: 12 }}>
            Total
          </th>
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
              </strong>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PaymentResume;
