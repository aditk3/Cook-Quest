import React from 'react';
// import IngredientListContainer from '../components/IngredientListContainer';
// import AddIngredientModal from '../components/AddIngredientModal';
import { Outlet } from 'react-router-dom';

const MyFridgePage = () => {

    // const outlet = useOutlet();
    // console.log(outlet.props.children.props.match.pathname);

    return (
        <>
            <div className="container d-flex flex-column align-items-center" >
                {/* {outlet.props.children.props.match.pathname != "/my-fridge"
                    ?
                    <a href="/my-fridge"><h2 className='mb-4' title='my-fridge-title' id='my-fridge-title'>My Fridge</h2></a>
                    :
                    <h2 className='mb-4' data-testid='my-fridge-title' id='my-fridge-title'>My Fridge</h2>
                } */}
                <h2 className='mb-4' data-testid='my-fridge-title' id='my-fridge-title'>My Fridge</h2>
            </div>
            <Outlet />
        </>
    );
};

export default MyFridgePage;