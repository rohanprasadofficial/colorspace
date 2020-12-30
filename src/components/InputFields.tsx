import React from 'react';

import { HexSpace } from './spaces/HexSpace';
interface InputFieldsProps {
    code: string;
}

const InputFields: React.FC<InputFieldsProps> = (props: InputFieldsProps) => {
    switch (props.code) {
        case 'hex': {
            return <HexSpace />;
        }
        case 'rgb': {
            return <p>Hello i am rgb</p>;
        }
        case 'hsl': {
            return <p>Hello i am hsl</p>;
        }
        default: {
            return <p>please select a code</p>;
        }
    }
};

export default InputFields;
