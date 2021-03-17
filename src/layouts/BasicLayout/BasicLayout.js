import React from "react";
import { useSelector } from "react-redux";
import { Container, Grid } from "semantic-ui-react";
import NavBarSecondary from "../../components/NavBarSecondary";
import SpinnerComponent from '../../components/spinner';
//css
import "../../sass/index.scss";

// import profileImg from "../../images/profile.jpg";
// import { useDispatch, useSelector } from "react-redux";
// import { setImage, uploadImage } from "../../redux/actions/UserAction";
// import { CONECTION } from "../../conection";
// import { logout } from "../../redux/actions/LoginAction";

const BasicLayout = React.memo((props) => {
  const { children, view } = props;
  const { load } = useSelector( state => state.loading );
  // const dispatch = useDispatch();
  // const state = useSelector((state) => state);
  // useEffect(() => {
  //   if (state.login.user.img !== "" && state.user.imgProfile === null) {
  //     console.log(state.login.user.img);
  //     fetch(`${CONECTION}api/file/${state.login.user.img}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //       .then((response) => {
  //         return response.blob();
  //       })
  //       .then((images) => {
  //         let reader = new FileReader();
  //         reader.readAsDataURL(images);
  //         reader.onloadend = function () {
  //           var base64data = reader.result;
  //           console.log(base64data);
  //           dispatch(setImage(base64data));
  //         };
  //       });
  //   }
  // }, []);

  // const handleImage = (e) => {
  //   dispatch(uploadImage(e.target.files[0]));
  // };

  return (
    <div className="basic-layout">
      <Grid className='main-grid'>
        <Grid.Column mobile={16} tablet={2} computer={1}>
          {/* <label htmlFor="file_upload" className="btn-img">
            <img
              src={
                state.user.imgProfile !== null
                  ? state.user.imgProfile
                  : profileImg
              }
              alt="profile photo"
            />
          </label>
          <input
            type="file"
            id="file_upload"
            onChange={handleImage}
            accept="image/*"
          /> */}
          <NavBarSecondary view={view}></NavBarSecondary>
          { load && <SpinnerComponent /> }
          {/* <button
            className="btn-img"
            onClick={() => {
              dispatch(logout());
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
          </button> */}
        </Grid.Column>
        <Grid.Column mobile={16} tablet={14} computer={15}>
          {children}
        </Grid.Column>
      </Grid>
    </div>
  );
});
export default BasicLayout;
