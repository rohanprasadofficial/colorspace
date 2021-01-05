import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { SRGBtoRGB, HSLToHEX, HSLToRGB } from '../../utils/converter';

export const HSLSpace: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [hex, setHex] = useState<string>('');
    const [rgb, setRGB] = useState<string>('');
    const colorRef = useRef<HTMLElement>(null);

    const [H, setH] = useState(0);
    const [S, setS] = useState(0);
    const [L, setL] = useState(0);

    const injectValues = (pR = H, pG = S, pB = L) => {
        const value = HSLToHEX(pR, pG, pB);
        setHex(value);
        setRGB(HSLToRGB(pR, pG, pB).toString());
        !value.startsWith('#') && value != ''
            ? // eslint-disable-next-line
              (colorRef.current!.style.backgroundColor = `#${value}`)
            : // eslint-disable-next-line
              (colorRef.current!.style.backgroundColor = `${value}`);
        setHex(value);
    };

    const stringToValues = (value: string) => {
        const res = SRGBtoRGB(value);
        setHex(HSLToHEX(parseFloat(res[0]), parseFloat(res[1]), parseFloat(res[2])));
        setRGB(HSLToRGB(parseFloat(res[0]), parseFloat(res[1]), parseFloat(res[2])).toString());
    };

    return (
        <StyledSpace>
            <p style={{ marginBottom: '1rem' }}>code </p>
            <input
                className="input"
                type="text"
                placeholder="H"
                onChange={(e) => {
                    setH(parseFloat(e.target.value));
                    injectValues(parseFloat(e.target.value), S, L);
                }}
            />
            <input
                className="input"
                type="text"
                placeholder="S"
                onChange={(e) => {
                    setS(parseFloat(e.target.value));
                    injectValues(H, parseFloat(e.target.value), L);
                }}
            />
            <input
                className="input"
                type="text"
                placeholder="L"
                onChange={(e) => {
                    setL(parseFloat(e.target.value));
                    injectValues(H, S, parseFloat(e.target.value));
                }}
            />

            <h3 style={{ margin: '1.5rem 0', color: 'gray' }}>OR</h3>

            <p style={{ margin: '1rem 0' }}>paste string </p>
            <input
                style={{ width: '10rem', padding: '0.5rem' }}
                type="text"
                placeholder="hsl(0,0%,0%)"
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

                {rgb ? (
                    <div>
                        <h3 className="title">RGB</h3> <p>{rgb}</p>
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
