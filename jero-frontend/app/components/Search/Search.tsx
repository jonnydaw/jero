'use client';
// https://www.w3schools.com/react/react_forms.asp
import React, { useEffect, useState } from 'react';
import style from "./Search.module.css";
import { CiSearch } from "react-icons/ci";
import Dropdown from '../GuestDropdown/Dropdown';
import {GuestCounts} from "../../types/types"
type Props = {};
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';


type FormData =  {
  options :string,
  where :string,
  dates :string,
  count : GuestCounts
}



const Search : React.FC<Props> =  () => {

  const t = useTranslations('SearchBar');
  const [count, setCount] = useState<GuestCounts>({adultCount : 0, childCount : 0, petCount : 0});
  // const [childCount, setChildCount] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    options: "",
    where: "",
    dates: "",
    count: {adultCount : 0, childCount : 0, petCount : 0}
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name] : value });
  };

  const handleSubmit =  (e: any) => {
    e.preventDefault();
    console.log(formData);
  };


   useEffect(() => {
    setFormData(({ ...formData, count : count }));
  }, 
  [count]
);

//   useEffect(() => {
//     setFormData(({ ...formData, childCount: childCount }));
//   },
//   [childCount]
// );


  return (
    <div className={style.searchContainer}>
      <form className={style.form} onSubmit={handleSubmit}>
        <select
          className={style.inputs}
          name="options"
          onChange={handleChange}
          value={formData.options}
        >
          <option value="" disabled hidden>
              {t('select.default')}
          </option>
          <option value="accommodation">{t('select.accommodation')}</option>
          <option value="flights">{t('select.flights')}</option>
          <option value="both">{t('select.both')}</option>
        </select>

        <input
          className={style.inputs}
          type="text"
          name="where"
          id="where"
          value={formData.where}
          onChange={handleChange}
          placeholder={t('where')}
        />

        <input
          className={style.inputs}
          type="text"
          name="dates"
          id="dates"
          value={formData.dates}
          onChange={handleChange}
          placeholder={t('when')}
        />
        
      <Dropdown 
        count={count} 
        setCount={setCount}
      />

      <button type="submit" className={style.button}>
          <CiSearch />
      </button>
      </form>
    </div>
  );
};

export default Search;