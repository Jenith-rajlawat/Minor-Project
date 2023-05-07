import Heading from '../../components/Heading';
import Navigation from '../../components/Navigation';
import { useState, useEffect } from "react";
import { db } from '../../firebase'
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc, setDoc } from 'firebase/firestore';
import dayjs from 'dayjs';

function Request() {
    const [requests, setRequests] = useState([]);

    // Load requests data from Firebase on component mount
    useEffect(() => {

        const requestCollectionRef = collection(db, 'donorform');
        const fetchData = async () => {
            const data = await getDocs(requestCollectionRef);
            setRequests(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);

    
    const handleApprove = async requestId => {
        try {
            const requestDocRef = doc(db, 'donorform', requestId);
            await updateDoc(requestDocRef, { isapproved: "B" });
            const updatedRequests = requests.map(request => {
                if (request.id === requestId) {
                    return { ...request, isapproved: "B" };
                } else {
                    return request;
                }
            });
            setRequests(updatedRequests);

        } catch (error) {
            console.error(error);
        }
    };

    
    const handleDecline = async requestId => {
        try {
            const requestDocRef = doc(db, 'donorform', requestId);
            await updateDoc(requestDocRef, { isapproved: "D" });
            const updatedRequests = requests.map(request => {
                if (request.id === requestId) {
                    return { ...request, isapproved: "D" };
                } else {
                    return request;
                }
            });
            setRequests(updatedRequests);
        } catch (error) {
            console.error(error);
        }
    };


    const dateFormat = form => {
  
        const unixTime = form.bestbefore.seconds;
        
        if (unixTime && !isNaN(unixTime)) {

          return dayjs.unix(unixTime).format('DD-MM-YYYY');
        } else {
          return 'Invalid date';
        }
      };
    //dayjs.unix(form?.bestbefore?.seconds).format('DD-MM-YYYY hh:mm A')



    const filteredRequests = requests
        .filter(request => request.isapproved == "A")
        .sort((a, b) => {
            if (a.creationDate?.seconds < b.creationDate?.seconds) return 1;
            if (a.creationDate?.seconds > b.creationDate?.seconds) return -1;
            return 0;
        });

    return (

        <div className='app-content'>
            <Navigation />
            <div className='right-view'>
                <Heading />
                <div className='body-wrapper'>
                    <div>
                        {filteredRequests.map(form => (
                            <div className='request-order' key={form.id}>
                                    <div className='form-group'>
                                        <label className='request-title'>From</label>:
                                        <label className='request-data'>Donar, {form.donoremail}</label>
                                    </div>
                                    <div className='form-group'>
                                        <label className='request-title'>Title</label>:
                                        <label className='request-data'>{form.title}</label>
                                    </div>
                                    <div className='form-group'>
                                        <label className='request-title'>Description</label>:
                                        <label className='request-data description'>{form.description}</label>
                                    </div>
                                    <div className='form-group multi-group'>
                                        <div>
                                            <label className='request-title'>Qty</label>:
                                            <label className='request-data'>{form.qty}</label>
                                        </div>
                                        <div>
                                            <label className='request-title'>Location</label>:
                                            <label className='request-data'>{form.location}</label>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='request-title'>Best Before</label>:
                                        <label className='request-data'>{dateFormat(form)}</label>
                                    </div>
                                    <div className='btn-group'>
                                        <button className='btn btn-accept' onClick={() => handleApprove(form.id)}>Accept</button>
                                        <button className='btn btn-reject' onClick={() => handleDecline(form.id)}>Decline</button>
                                    </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>



    );
}
export default Request;