import Heading from '../../components/Heading';
import Navigationdonor from '../../components/Navigationdonor';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from '../../firebase'
import { collection, setDoc, getDocs, doc, deleteDoc, addDoc, loadBundle } from 'firebase/firestore';
import { auth } from "../../firebase";
import { Group, NumberInput } from '@mantine/core';
import { DatePicker, DateInput } from '@mantine/dates';






function DonorRequest() {


    const [err, setErr] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [qty, setQty] = useState(null);
    const [location, setLocation] = useState('');
    const [bestbefore, setBestbefore] = useState(null);
    const [isapproved, setIsapproved] = useState("A");
    const [creationDate, setCreationDate] = useState(null);
    const [acceptedBy, setAcceptedBy] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        


        try {

            setCreationDate(new Date());

            const user = auth.currentUser;
            const docRef = await addDoc(collection(db, "donorform"), {
                fromdonor: user.uid,
                creationDate,
                donoremail: user.email,
                title,
                description,
                qty,
                location,
                bestbefore,
                isapproved,
                acceptedBy
              });
            setErr(true);
          
        } catch (err) {

        }
      };

    return (

        <div className='app-content'>
            <Navigationdonor />
            <div className='right-view'>
                <Heading />
                <div className='body-wrapper'>
                    <div className='request-order'>
                        <form>
                            <div className='form-group'>
                                <label className='request-title'>Title</label>:
                                <input type="text" className="form-control" placeholder="Enter Title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                            </div>
                            <div className='form-group'>
                                <label className='request-title'>Description</label>:
                                <input type="text" className="form-control" placeholder="Enter Description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>

                            </div>
                            <div className='form-group-input multi-group'>
                                <div>
                                    <label className='request-title'>Qty</label>:
                                    <NumberInput
                                        className="dateinput"
                                        placeholder="Qty"
                                        value={qty }
                                        onChange={setQty}
                                        size="sm"
                                        min={1}
                                        withAsterisk
                                        />
                                </div>
                                <div>
                                    <label className='request-title'>Location</label>:
                                    <input type="text" className="form-control" placeholder="Enter Location" value={location} onChange={(e)=>{setLocation(e.target.value)}}/>
                                </div>


                            </div>
                            <div className='form-group-input'>
                                <label className='request-title'>Best Before</label>:
                                <DateInput className="dateinput" value={bestbefore} onChange={setBestbefore}
                                    placeholder="Date input"
                                    
                                    />
                            </div>
                            <div className='btn-group'>
                                <button className='btn btn-accept' onClick={handleSubmit} >Submit</button>
                            </div>
                        </form>
                        <div className='form-group-msg'>
                                {err && <p className='request-msg'>Donation request Submitted</p>}
                        </div>
                        
                    </div>

                </div>

            </div>
        </div>


        
    );
}
export default DonorRequest;