import React, { useState, useEffect, useRef, useCallback } from "react";
import NumberFormat from "react-number-format";
import { MdModeEdit } from "react-icons/md";

const PaymentResume = React.memo(({ dataSeason }) => {
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
          setEditPriceMode(initialPricesSeason);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [inputRef]);
  };

  const [priceResume, setPriceResume] = useState({});
  const [total, setTotal] = useState(initialStateTotal);
  const [priceNight, setPriceNight] = useState(initialPricesSeason);
  const [editPriceMode, setEditPriceMode] = useState(initialPricesSeason);
  const inputRef = useRef();
  useOutSideInput(inputRef);

  useEffect(() => {
    setPriceResume(dataSeason);
    handleTotals();
  }, [dataSeason]);

  const InputPrice = React.memo(({nameInput}) => {

    const [inputData, setInputData] = useState(initialPricesSeason)

    const handlePriceChange = ({ target }) => {
      const { name, value } = target;
      setInputData((old) => ({
        ...old,
        [name]: Number(value),
      }));
    };

    const handleEnterPress = (e) => {
      if (e.key === 'Enter') {
        setEditPriceMode(initialPricesSeason)
        handleChangePricesNights(nameInput, inputData[nameInput])
      }
    }

    return (
      <input
        className="form-control form-control-sm"
        placeholder="Precio noche"
        value={priceNight[nameInput]}
        name={nameInput}
        key={`season${nameInput}`}
        type="number"
        onChange={handlePriceChange}
        ref={inputRef}
        style={{ width: 80 }}
        onKeyDown={handleEnterPress}
      />
    );
  });

  const PricesSeason = () => {
    
    const seasonName = {
      lowSeason: "temporada baja",
      midSeason: "temporada media",
      highSeason: "temporada alta",
    };

    return <>
      {
        Object.keys(priceResume).map((key) => (
          (priceResume && priceResume[key].length) ?
          <tr id={key}>
            <td>
              {!editPriceMode[key] ? (
                <p style={{ fontSize: 12 }}>
                  <strong>{priceResume[key].length}</strong> noches en{" "}
                  {seasonName[key]}
                </p>
              ) : (
                <p>Nuevo valor por noche: </p>
              )}
            </td>
            <td>
              {!editPriceMode[key] ? (
                <p style={{ fontSize: 12 }}>
                  <NumberFormat
                    value={priceResume[key][0] * priceResume[key].length}
                    displayType="text"
                    thousandSeparator={true}
                    prefix="$"
                  />
                  <MdModeEdit onClick={() => handleVisibilityInput(key)} />
                </p>
              ) : (
                <InputPrice nameInput={key} key={key} editMode={editPriceMode[key]}/>
              )}
            </td>
          </tr>
          :
          null
        ))
      }
    </>
  };

  const handleChangePricesNights = (nameSeason, newPriceNight) => {
    setPriceResume((old) => ({
      ...old,
      [nameSeason]: priceResume[nameSeason].map(() => newPriceNight)
    }));
  }

  const handleVisibilityInput = (name) => {
    setEditPriceMode((old) => ({
      ...old,
      [name]: true,
    }));
  };

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
        <PricesSeason />
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
});

export default PaymentResume;
