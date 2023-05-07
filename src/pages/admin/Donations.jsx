import Heading from '../../components/Heading';
import Navigation from '../../components/Navigation';
import { useState, useEffect } from "react";
import { db } from '../../firebase'
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore';
import dayjs from 'dayjs';




function Request() {

    const [donorform, setForm] = useState([]);
    const donorformReference = collection(db, "donorform");


    useEffect(() => {
        const donorformReference = collection(db, "donorform");
        const getForm = async () => {
          const data = await getDocs(donorformReference);
          const filteredData = data.docs
            .map(doc => ({ ...doc.data(), id: doc.id }))
            .filter(item => item.isapproved === "C");
          setForm(filteredData);
        }
        getForm();
      }, []);


      const dateFormat = form => {
  
        const unixTime = form.bestbefore.seconds;
        
        if (unixTime && !isNaN(unixTime)) {

          return dayjs.unix(unixTime).format('DD-MM-YYYY');
        } else {
          return 'Invalid date';
        }
      };
  


    return (

        <div className='app-content'>
            <Navigation />
            <div className='right-view'>
                <Heading />
                <div className='body-wrapper'>
                    <div>
                        {donorform.map((form) => (
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
                                {/* <div className='btn-group'>
                                <button className='btn btn-accept' >Accept</button>
                                <button className='btn btn-reject' >Decline</button>
                                </div> */}
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>


        
    );
}
export default Request;