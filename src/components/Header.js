const Header = (props) => {
  return(
    <div className="col-12 mt-5">
      <div className="align-items-center bg-primary border d-flex flex-column justify-content-center p-2 rounded">
        {props.children}
      </div>
    </div>
  );
};
export default Header;
