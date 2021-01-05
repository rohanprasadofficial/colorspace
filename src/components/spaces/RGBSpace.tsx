import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { SRGBtoRGB, RGBtoHex, RGBToHSL } from '../../utils/converter';

export const RGBSpace: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [hex, setHex] = useState<string>('');
    const [hsl, setHSL] = useState<string>('');

    const [R, setR] = useState(0);
    const [G, setG] = useState(0);
    const [B, setB] = useState(0);

    const colorRef = useRef<HTMLElement>(null);

    const injectValues = (pR = R, pG = G, pB = B) => {
        const value = RGBtoHex(pR, pG, pB);
        !value.startsWith('#') && value != ''
            ? // eslint-disable-next-line
              (colorRef.current!.style.backgroundColor = `#${value}`)
            : // eslint-disable-next-line
              (colorRef.current!.style.backgroundColor = `${value}`);
        setHex(value);
        setHSL(RGBToHSL(pR, pG, pB).toString());
    };

    const stringToValues = (value: string) => {
        const res = SRGBtoRGB(value);
        setHex(RGBtoHex(parseFloat(res[0]), parseFloat(res[1]), parseFloat(res[2])));
        setHSL(RGBToHSL(parseFloat(res[0]), parseFloat(res[1]), parseFloat(res[2])).toString());
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
            <h3 style={{ margin: '1.5rem 0', color: 'gray' }}>OR</h3>

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
            <br />
            <br />
            <hr />
            <section ref={colorRef} className="color-demo"></section>
            <StyledResDiv>
                {hex ? (
                    <div>
                        <h3 className="title">HEX</h3> <p>{hex}</p>
                    </div>
                ) : (
                    ''
                )}

                {hsl ? (
                    <div>
                        <h3 className="title">HSL</h3> <p>{hsl}</p>
                    </div>
                ) : (
                    ''
                )}
            </StyledResDiv>
        </StyledSpace>
    );
};

const StyledSpace = styled.section`
    .input {
        width: 5rem;
        padding: 0.5rem;
        margin-right: 0.5rem;
    }
    .color-demo {
        background-color: 'white';
        width: 100%;
        height: 2rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
        border: 1px solid black;
    }
`;

const StyledResDiv = styled.div`
    padding: 1rem 0;
    color: gray;
    .title {
        margin: 0.5rem 0;
        color: black;
        margin-top: 2rem;
    }
`;
