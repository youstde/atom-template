const str = (
`import React from 'react';
import styles from './$atom$.css';

const $atom$ = () => {
  return (
    <div>template</div>
  )
};

export default React.memo($atom$);`
);

export default str;