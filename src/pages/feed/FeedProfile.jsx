import Heading from '../../components/Heading';
import Navigationfeed from '../../components/Navigationfeed';
import { useState, useEffect } from "react";
import { db } from '../../firebase'
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc, setDoc } from 'firebase/firestore';
import dayjs from 'dayjs';
import { auth } from "../../firebase";


const FeedProfile = () => {
  const [requests, setRequests] = useState([]);
  const user = auth.currentUser;
  useEffect(() => {
    const requestUsersRef = collection(db, 'users');
    const user = auth.currentUser;
    if (!user) return; // Don't run if the user is not logged in
    const fetchData = async () => {
      const usersdata = await getDocs(requestUsersRef);
      setRequests(
        usersdata.docs
          .filter(doc => doc.id === user.uid)
          .map(doc => ({ ...doc.data(), id: doc.id }))
      );
    };
    fetchData();
  }, [user]);

  return (
    <div className='app-content'>
      <Navigationfeed />
      <div className='right-view'>
        <Heading />
        <div className='body-wrapper'>
          <div>
            {requests.map(form => (
              <div className='request-order' key={form.id}>
                <div className='form-group'>
                  <label className='request-title'>Name</label>:
                  <label className='request-data'>{form.displayName}</label>
                </div>
                <div className='form-group'>
                  <label className='request-title'>Email</label>:
                  <label className='request-data'>{form.email}</label>
                </div>
                <div className='form-group'>
                  <label className='request-title'>Location</label>:
                  <label className='request-data'>{form.location}</label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedProfile;
