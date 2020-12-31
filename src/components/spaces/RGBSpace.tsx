import React, { useState } from 'react';
import styled from 'styled-components';
import { HEXToHSL, SRGBtoRGB, RGBtoHex } from '../../utils/converter';

export const RGBSpace: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [hex, setHex] = useState<string>('');
    const [hsl, setHSL] = useState<string>('');

    const [R, setR] = useState(0);
    const [G, setG] = useState(0);
    const [B, setB] = useState(0);

    const injectValues = (pR = R, pG = G, pB = B) => {
        setHex(RGBtoHex(pR, pG, pB));
        // setHSL(HEXToHSL(value));
    };

    const stringToValues = (value: string) => {
        const res = SRGBtoRGB(value);
        setHex(RGBtoHex(parseFloat(res[0]), parseFloat(res[1]), parseFloat(res[2])));
    };
    return (
        <StyledSpace>
            <p style={{ marginBottom: '1rem' }}>code </p>
            <input
                className="input"
                type="text"
                placeholder="R"
                onChange={(e) => {
                    setR(parseFloat(e.target.value));
                    injectValues(parseFloat(e.target.value), G, B);
                }}
            />
            <input
                className="input"
                type="text"
                placeholder="G"
                onChange={(e) => {
                    setG(parseFloat(e.target.value));
                    injectValues(R, parseFloat(e.target.value), B);
                }}
            />
            <input
                className="input"
                type="text"
                placeholder="B"
                onChange={(e) => {
                    setB(parseFloat(e.target.value));
                    injectValues(R, G, parseFloat(e.target.value));
                }}
            />

            <p style={{ margin: '1rem 0' }}>paste string </p>
            <input
                style={{ width: '10rem', padding: '0.5rem' }}
                type="text"
                placeholder="rgb(0,0,0)"
                onChange={(e) => {
                    setInput(e.target.value);
                    stringToValues(e.target.value);
                }}
            />
            <div>
                {hex ? (
                    <div>
                        <h2>HEX</h2> <p>{hex}</p>
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
        </StyledSpace>
    );
};

const StyledSpace = styled.section`
    .input {
        width: 5rem;
        padding: 0.5rem;
        margin-right: 0.5rem;
    }
`;
