const Footer = (props) => {
  return(
    <div className="col-xl mt-5">
      <div
        className="bg-light border m-auto rounded"
        style={{ maxWidth: "20rem" }}
      >
        {props.children}
      </div>
    </div>
  );
};
export default Footer;
