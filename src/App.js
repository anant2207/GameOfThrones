import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import CharacterGrid from './components/characters/CharacterGrid';
import Search from './components/ui/Search';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          `https://thronesapi.com/api/v2/Characters?fullName=${query}`
        );
        console.log(result.data);
        setItems(result.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [query]);

  useEffect(() => {
    // Filter items based on the query
    const filtered = items.filter((item) =>
      item.fullName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [query, items]);

  return (
    <div className='container'>
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={filteredItems} />
      <Footer />
    </div>
  );
};

export default App;
