import Heading from '../../components/Heading';
import Navigation from '../../components/Navigation';
import Distance from '../../pages/Distance';
function Agent() {
    return (

        <div className='app-content'>
            <Navigation />
            <div className='right-view'>
                <Heading />
                <Distance />

            </div>
        </div>
        
    );
}
export default Agent;