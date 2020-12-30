import React, { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

const ColorPicker: React.FC = () => {
    const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
    const [background, setBackground] = useState<string>('#ffffff');

    const handleChangeComplete = (color: ColorResult) => {
        setBackground(color.hex);
    };

    const handleChange = (color: ColorResult) => {
        console.log(color.hex);
    };

    const handleClose = (): void => {
        setDisplayColorPicker(false);
    };

    return (
        <div>
            {displayColorPicker ? (
                <div style={{ position: 'absolute', zIndex: 2 }}>
                    <div
                        style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }}
                        onClick={handleClose}
                    />
                    <ChromePicker color={background} onChange={handleChange} onChangeComplete={handleChangeComplete} />
                </div>
            ) : null}
        </div>
    );
};
export default ColorPicker;
