import Heading from '../../components/Heading';
import Navigation from '../../components/Navigation';

function Donor() {
    return (
        <div className='app-content'>
            <Navigation />
            <div className='right-view'>
                <Heading />
                <div className='body-wrapper'>
                <div className='request-order'>
                            <form>
                                <div className='form-group'>
                                    <label className='request-title'>User</label>:
                                    <label className='request-data'>Jenith, @user022</label>
                                </div>
                                <div className='form-group'>
                                    <label className='request-title'>Phone</label>:
                                    <label className='request-data'>9816066893</label>
                                </div>
                                <div className='form-group'>
                                    <label className='request-title'>Location</label>:
                                    <label className='request-data'>Hattiban,Lalitpur</label>

                                </div>
                                <div className='form-group'>
                                    <label className='request-title'>Donations</label>:
                                    <label className='request-data'>15</label>

                                </div>
                                
                            </form>
                        </div>
                </div>

            </div>
        </div>

        
    );
}
export default Donor;