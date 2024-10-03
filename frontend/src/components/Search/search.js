import React, { useEffect, useState } from 'react'
import classes from './search.module.css';
import { SearchIcon } from '../icon';
import { useNavigate, useParams } from 'react-router-dom';

export default function Search() {

    const [term, setTerm] = useState('');
    const navigate = useNavigate();
    const { searchStore } = useParams();

    useEffect(() => {
      setTerm(searchStore ?? '');
    }, [searchStore]);

    const search = async () => {
      if (term.trim()) {
          navigate('/search/' + term);
      } else {
          navigate('/');
      }
    }

    return (
        <div className={classes.searchBox}>
          <input className={classes.searchInput} placeholder='Bình bông'
            onChange={e => setTerm(e.target.value)}
            onKeyUp={e => e.key === 'Enter' && search()}
            value={term} />
          <div onClick={search}>
            <SearchIcon className={classes.searchIcon}/>
          </div>
        </div>
      )
}
