import Heading from '../../components/Heading';
import Navigationfeed from '../../components/Navigationfeed';
import { auth } from "../../firebase";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate, Link } from "react-router-dom";

const BeADonor = () => {

    const navigate = useNavigate();

    const handleApprove = async () => {
        try {
          const user = auth.currentUser;
          if (!user) return; // Don't run if the user is not logged in
      
          const userDocRef = doc(db, 'users', user.uid);
          await updateDoc(userDocRef, { isdonor: true });
          navigate("/donor");
        } catch (error) {
          console.error(error);
        }
      };


  return (
    <div className='app-content'>
        <Navigationfeed />
        <div className='right-view'>
            <Heading />
            <div className='body-wrapper'>
            <div>
                        
                <div className='request-order'>
                        
                        <div className='form-group'>
                            <p className='beadonortitle'>Becoming a donor will allow you to donate food to the public</p>:
                        </div>
                        <div className='btn-group'>
                            <button className='btn btn-accept' onClick={() => handleApprove()}>Be A Donor</button>
                        </div>
                </div>
                        
            </div>
                
                

            </div>

        </div>
    </div>
  )
}

export default BeADonor