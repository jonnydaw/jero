'use client';
// https://www.w3schools.com/react/react_forms.asp
import React, { useEffect, useState } from 'react';
import style from "./SearchPC.module.css";
import styleMobile from "./SearchMobile.module.css";
import { CiSearch } from "react-icons/ci";
import Dropdown from '../GuestDropdown/Dropdown';
import {GuestCounts} from "../../types/types"
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { isMobile } from 'react-device-detect';


type FormData =  {
  options :string,
  where :string,
  dates :string,
  count : GuestCounts
}

interface Props {
  isMobileSearch : boolean
}



const Search : React.FC<Props> =  (props : Props) => {

  const t = useTranslations('SearchBar');
  const [count, setCount] = useState<GuestCounts>({adultCount : 1, childCount : 0, petCount : 0});
  // const [childCount, setChildCount] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    options: "",
    where: "",
    dates: "",
    count: {adultCount : 1, childCount : 0, petCount : 0}
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


  return (
    <div className={props.isMobileSearch ? styleMobile.searchContainer : style.searchContainer}>
      <form className={props.isMobileSearch ? styleMobile.form : style.form} onSubmit={handleSubmit}>
        <select
          className={props.isMobileSearch ? styleMobile.inputs : style.inputs}
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
          className={props.isMobileSearch ? styleMobile.inputs : style.inputs}
          type="text"
          name="where"
          id="where"
          value={formData.where}
          onChange={handleChange}
          placeholder={t('where')}
        />

        <input
          className={props.isMobileSearch ? styleMobile.inputs : style.inputs}
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

      <button type="submit" className={props.isMobileSearch ? styleMobile.button : style.button}>
          <CiSearch />
      </button>
      </form>
    </div>
  );
};

export default Search;