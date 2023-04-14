import React, {useEffect, useRef} from 'react';
import '../styles/searchInput.css';

const SearchInput = ({ searchInput, handleSearchChange, searchResults, handleSelectUser, handleAddContact, setSearchResults }) => {
    const searchRef = useRef(null);

    const handleClick = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchResults([]);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick, true);
        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    });

    return (
        <div className="search-container" ref={searchRef}>
            <input
                type="text"
                className="search-input"
                placeholder="Search users..."
                value={searchInput} // Use value instead of defaultValue
                onChange={handleSearchChange}
            />
            {searchResults.map((user) => (
                <div
                    key={user.username}
                    className="search-result"
                    onClick={() => {
                        handleSelectUser(user);
                        handleAddContact(user.username);
                    }}
                >
                    <div className="search-result-thumbnail"></div>
                    <span>{user.username}</span>
                </div>
            ))}
        </div>
    );
};
export default SearchInput;
