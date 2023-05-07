
import CardItem from "./CardItem";
import img9 from "../images/manish/img-9.jpg";
import img2 from "../images/manish/img-2.jpg";
import img7 from "../images/manish/img-7.jpg";
import img1 from "../images/manish/img-1.jpg";
import img5 from "../images/manish/img-5.jpg";
function Cards() {
  return (
    <div className="cards">
      <h1>Check out these Vision & Accomplishment</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src={img9}
              text="Kind People giving out love to the world "
              label="Kindness"
              path="/ourmission"
            />
            <CardItem
              src={img2}
              text="Smiling faces of the Volunteer after some act of kindness"
              label="Teams"
              path="/ourmission"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src={img7}
              text="HEAVEN do EXIST "
              label="Stores"
              path="/ourmission"
            />
            <CardItem
              src={img1}
              text="Sophistiated act of giving"
              label="WorldFoodDay"
              path="/ourmission"
            />
            <CardItem
              src={img5}
              text="World Food Day Theme"
              label="Accomplishment"
              path="/ourmission"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Cards;
