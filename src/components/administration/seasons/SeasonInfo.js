import moment from "moment";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSeason } from "../../../actions/season";
import { CONSTANS } from "../../../constants/contants";

export const SeasonInfo = (showList = false) => {
  const { seasonList } = useSelector((state) => state.season);
  const [seasonInfo, setSeasonInfo] = useState(null);
  const dispatch = useDispatch();
  const format = CONSTANS.dateFormat

  useEffect(() => {
    if (!seasonList) {
      dispatch(getSeason());
    }
  }, []);

  useEffect(() => {
    const seasonDefault = seasonList.filter((season) => season?.default)?.[0];
    setSeasonInfo(seasonDefault);
  }, [seasonList]);

  const handleLoadSeason = ({ target }) => {
    const seasonSelected = JSON.parse(target.value);
    setSeasonInfo(seasonSelected);
  };

  return (
      <>
      <select
          className="form-control form-control-sm"
          name="season"
          onChange={handleLoadSeason}
        >
          {seasonList &&
            seasonList.map((season) => (
                <option key={season._id} value={JSON.stringify(season)}>
                {season.name}
              </option>
            ))}
        </select>
        <div class="card mt20">
        <div class="card-body">
        <h6 class="card-title">DET. TEMPORADA</h6>
        <h7 class="card-subtitle mb-2 text-muted">{seasonInfo?.name}</h7>
        <p class="card-text" style={{fontSize: 12}}><strong>Temp. Baja</strong> {moment(seasonInfo?.seasonLowDate?.from).format(format)} hasta {moment(seasonInfo?.seasonLowDate?.to).format(format)}</p>
        <p class="card-text" style={{fontSize: 12}}><strong>Temp. Media</strong> {moment(seasonInfo?.seasonMidDate?.from).format(format)} hasta {moment(seasonInfo?.seasonMidDate?.to).format(format)}</p>
        <p class="card-text" style={{fontSize: 12}}><strong>Temp. Alta</strong> {moment(seasonInfo?.seasonHighDate?.from).format(format)} hasta {moment(seasonInfo?.seasonHighDate?.to).format(format)}</p>
        </div>
    </div>
    </>
  );
};
