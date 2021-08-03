import React, { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Swal from "sweetalert2";
import { seasonService } from "../../../services/seasonService";

const SeasonRegister = () => {
  const initialState = {
    name: "",
    default: false,
    seasonLowDate: {
      from: "",
      to: "",
    },
    seasonMidDate: {
      from: "",
      to: "",
    },
    seasonHighDate: {
      from: "",
      to: "",
    },
  };

  const dateFormatInitVal = {
    seasonLowDate: null,
    seasonMidDate: null,
    seasonHighDate: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [dateFormatOut, setDateFormatOut] = useState(dateFormatInitVal);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleInputChange = (props) => {
    const { target } = props;
    setFormData(oldData => ({
      ...oldData,
      [target.name]: target.name === 'default' ? !formData.default :  target.value ? target.value.toUpperCase() : '',
    }));
  };

  const handleDateChange = (data, name) => {
    const [from, to] = data;
    let startDate = from ? new DateObject(from) : "";
    let endDate = to ? new DateObject(to) : "";

    const dateObject = {
      from: startDate,
      to: endDate,
    };

    setDateFormatOut((rest) => ({
        ...rest,
      [name]: data,
    }));

    setFormData((rest) => ({
      ...rest,
      [name]: dateObject,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const res = await seasonService.save(formData)
    if (res?.ok) {
        Swal.fire({
            title: 'Registro exitoso!',
            text: res.message,
            icon: 'success'
        })
    }
  };

  return (
    <div>
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="row">
          <div className="col-sm">
            <div className="form-group">
              <label>Nombre de la Temporada</label>
              <input
                className="form-control"
                type="text"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                required="true"
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="form-group">
              <label></label>
              <div class="form-check form-switch mt20">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" name="default" onChange={handleInputChange}/>
                <label class="form-check-label" for="flexSwitchCheckDefault">Marcar como principal</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <div className="form-group">
              <label>Temporada Baja</label>
              <DatePicker
                value={dateFormatOut.seasonLowDate}
                onChange={(date) => handleDateChange(date, "seasonLowDate")}
                range
                plugins={[<DatePanel />]}
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="form-group">
              <label>Temporada Media</label>
              <DatePicker
                value={dateFormatOut.seasonMidDate}
                onChange={(date) => handleDateChange(date, "seasonMidDate")}
                range
                plugins={[<DatePanel />]}
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="form-group">
              <label>Temporada Alta</label>
              <DatePicker
                value={dateFormatOut.seasonHighDate}
                onChange={(date) => handleDateChange(date, "seasonHighDate")}
                range
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-2">
            <button className="btn btn-outline-danger btn-block">
              <i className="fas fa-eraser"></i>
              <span> Limpiar</span>
            </button>
          </div>
          <div className="col-2">
            <button type="submit" className="btn btn-primary btn-block">
              <i className="far fa-save"></i>
              <span> Guardar</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SeasonRegister;
