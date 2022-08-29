import React, { useState } from "react";
import { flushSync } from "react-dom";
import { Button } from "antd";
const AutoBatch = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const handleClick = () => {
    setCount((c) => {
      console.log("批量处理：", c);
      return c + 1;
    }); // 不触发re-render
    setFlag((f) => {
      console.log("批量处理：", f);
      return !f;
    }); // 不触发re-render
    // 调用结束时，只触发一次re-render（批处理）
  };
  const handleClick2 = () => {
    flushSync(() => {
      setCount((c) => {
        console.log("不批量处理：", c);
        return c + 1;
      }); // 触发re-render
    });
    flushSync(() => {
      setFlag((f) => {
        console.log("不批量处理：", f);
        return !f;
      }); // 触发re-render
    });
  };
  return (
    <>
      <p>
        变化：{count} : {`${flag}`}
      </p>
      <Button onClick={handleClick}>点击（批处理）</Button>
      <Button onClick={handleClick2}>点击（跳过批处理）</Button>
    </>
  );
};

export default AutoBatch;
