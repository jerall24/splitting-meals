import React, { useState, useEffect } from 'react';

const Shared = ( { shared, setShared }) => {
  const [rawShared, setRawShared] = useState(shared.raw);
  const [debouncedShared, setDebouncedShared] = useState(rawShared);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedShared(Number(rawShared));
    }, 500);

    return () => {
      clearTimeout(timerId)
    };
  }, [rawShared]);

  useEffect(() => {
    setShared({name: "Shared", raw: debouncedShared})
  }, [debouncedShared]);

  return (
    <tbody>
      <tr>
        <td>
          Shared
        </td>
        <td className="">
          <div className="ui fluid action input">
            <input
              type="text"
              pattern="[0-9]*"
              value={rawShared}
              className="ui fluid"
              onChange={e => setRawShared(e.target.value)}
            />
              <div className="ui label button">
                <i className="calculator icon"></i>
              </div>
          </div>
        </td>
        <td>

        </td>

      </tr>
    </tbody>
  );
}

export default Shared
