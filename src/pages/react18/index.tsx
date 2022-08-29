import { useId, useInsertionEffect } from 'react';
import AutoBatch from './children/AllHandle';
const NewReact = () => {
  const id = useId();
  // 主要将css
  useInsertionEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
          #dom{
            color: red;
            font-size: 20px;
          }
        `;
    document.head.appendChild(style);
  }, []);

  //
  return (
    <>
      <h3 id="dom">React18新特性</h3>
      <p>使用useId得到的id：{id}</p>
      <hr />
      <AutoBatch />
      <hr />
    </>
  );
};

export default NewReact;
