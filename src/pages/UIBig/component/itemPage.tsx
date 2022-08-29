const ItemPage = (props: any) => {
  const style = {
    height: "49%",
    border: "1px solid blue",
    margin: "0.25rem",
    backgroundColor: "rgba(12, 130, 255, 0.85)",
  };
  return <div style={style}>{props.children}</div>;
};
export default ItemPage;
