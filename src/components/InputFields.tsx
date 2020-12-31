import React from 'react';

import { HexSpace } from './spaces/HexSpace';
import { HSLSpace } from './spaces/HSLSpace';
import { RGBSpace } from './spaces/RGBSpace';
interface InputFieldsProps {
    code: string;
}

const InputFields: React.FC<InputFieldsProps> = (props: InputFieldsProps) => {
    switch (props.code) {
        case 'hex': {
            return <HexSpace />;
        }
        case 'rgb': {
            return <RGBSpace />;
        }
        case 'hsl': {
            return <HSLSpace />;
        }
        default: {
            return <p>please select a code</p>;
        }
    }
};

export default InputFields;
