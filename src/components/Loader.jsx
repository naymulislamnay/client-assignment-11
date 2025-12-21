import React from 'react';
import { BounceLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className={`flex flex-col justify-center items-center `}>
            <BounceLoader color="#f31616" size={50} />
        </div>
    );
};

export default Loader;