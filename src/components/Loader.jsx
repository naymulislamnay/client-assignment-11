import React from 'react';
import { BounceLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <BounceLoader color="#f31616" size={50} />
        </div>
    );
};

export default Loader;