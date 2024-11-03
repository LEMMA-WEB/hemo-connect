import React from 'react';

interface pageProps extends React.HTMLAttributes<HTMLOrSVGElement> {
className?: string;
}

const page: React.FC<pageProps> = ({ ...props }) => {
    return <div {...props}></div>;
};

export default page;