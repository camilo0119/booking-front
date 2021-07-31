import React from "react";
import { useForm } from "../../../hooks/useForm";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

const SeasonRegister = () => {
  const [formData, handleInputChange, reset] = useForm();

  const handleDateChange = (value) => {
    console.log(value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
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
              <label>Marcar como principal</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <div className="form-group">
              <label>Temporada Baja</label>
              <DatePicker
                value={formData.seasonLowDate}
                onChange={handleDateChange}
                range
                plugins={[<DatePanel />]}
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="form-group">
              <label>Temporada Media</label>
              <DatePicker
                value={formData.seasonLowDate}
                onChange={handleDateChange}
                range
                plugins={[<DatePanel />]}
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="form-group">
              <label>Temporada Alta</label>
              <DatePicker
                value={formData.seasonLowDate}
                onChange={handleDateChange}
                range
                plugins={[<DatePanel />]}
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="form-group">
              <label>Temporada Baja</label>
              <DatePicker
                value={formData.seasonLowDate}
                onChange={handleDateChange}
                range
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-2">
            <button
              onClick={reset}
              className="btn btn-outline-danger btn-block"
            >
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
