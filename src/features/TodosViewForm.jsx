import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

function TodosViewForm({
  queryString,
  setQueryString,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);

  function preventRefresh(e) {
    e.preventDefault();
  }

  return (
    <StyledForm onSubmit={preventRefresh}>
      <div className="controlGroup">
        <label>
          Search todos:
          <input
            type="text"
            id="search"
            value={localQueryString}
            onChange={(e) => setLocalQueryString(e.target.value)}
          />
        </label>
        <button type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </button>
      </div>
      <div className="controlGroup">
        <label>
          Sort by
          <select
            name="sortBy"
            id="sortBy"
            onChange={(e) => setSortField(e.target.value)}
            value={sortField}
          >
            <option value="title">Title</option>
            <option value="createdTime">Time Added</option>
          </select>
        </label>
        <label>
          Direction
          <select
            name="direction"
            id="direction"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  & > * {
    margin: 0.5rem 0;
  }
  .controlGroup {
    display: flex;
    gap: 0.5rem;
  }
`;

export default TodosViewForm;
