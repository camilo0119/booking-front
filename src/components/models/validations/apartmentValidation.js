import * as yup from 'yup';

export const apartmentSchema = yup.object().shape({
    name: yup.string().required().min(4).max(100),
    ediffice: yup.string().required(),
    owner: yup.string().required(),
    seasonId: yup.string().required(),
    seasonLowPrice: yup.number().positive(),
    seasonMidPrice: yup.number().positive(),
    seasonHighPrice: yup.number().positive(),
    holidayPrice: yup.number().positive()
  })