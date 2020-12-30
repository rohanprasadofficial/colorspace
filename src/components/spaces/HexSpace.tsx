import React, { useState } from 'react';
import { HEXToHSL, HexToRGB } from '../../utils/converter';

export const HexSpace: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [rbg, setRgb] = useState<string>('');
    const [hsl, setHSL] = useState<string>('');
    const onConvert = () => {
        console.log('Onchange');
    };

    const injectValues = (value: string) => {
        setRgb(HexToRGB(value) as string);
        setHSL(HEXToHSL(value));
    };

    return (
        <div>
            <p style={{ marginBottom: '1rem' }}>code </p>
            <input
                type="text"
                placeholder="#FFFFFF"
                onChange={(e) => {
                    setInput(e.target.value);
                    injectValues(e.target.value);
                }}
            />
            <button onClick={onConvert}>Convert</button>
            {input}

            <div>
                {rbg ? (
                    <div>
                        <h2>RGB</h2> <p>{rbg}</p>
                    </div>
                ) : (
                    ''
                )}

                {hsl ? (
                    <div>
                        <h2>HSL</h2> <p>{hsl}</p>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};
