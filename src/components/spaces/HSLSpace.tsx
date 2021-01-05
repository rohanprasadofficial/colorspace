/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { SRGBtoRGB, HSLToHEX, HSLToRGB } from '../../utils/converter';

export const HSLSpace: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [hex, setHex] = useState<string>('');
    const [rgb, setRGB] = useState<string>('');
    const colorRef = useRef<HTMLElement>(null);
    const [isValid, setIsValid] = useState<boolean>(false);
    const numberInputRef = useRef<HTMLElement>(null);
    const stringInputRef = useRef<HTMLElement>(null);
    const [H, setH] = useState(0);
    const [S, setS] = useState(0);
    const [L, setL] = useState(0);

    const injectValues = (pR = H, pG = S, pB = L) => {
        if (pR >= 360) pR %= 360;
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
                type="number"
                placeholder="H"
                onChange={(e) => {
                    if (parseFloat(e.target.value) >= 0 && parseFloat(e.target.value) <= 360) {
                        setIsValid(true);
                        setH(parseFloat(e.target.value));
                        injectValues(parseFloat(e.target.value), S, L);
                        numberInputRef.current!.style.display = 'none';
                    } else {
                        if (e.target.value.length) {
                            numberInputRef.current!.style.display = 'block';
                        } else {
                            numberInputRef.current!.style.display = 'none';
                        }
                        setIsValid(false);
                    }
                }}
            />
            <input
                className="input"
                type="number"
                placeholder="S"
                onChange={(e) => {
                    if (parseFloat(e.target.value) >= 0 && parseFloat(e.target.value) <= 100) {
                        setIsValid(true);
                        setS(parseFloat(e.target.value));
                        injectValues(H, parseFloat(e.target.value), L);
                        numberInputRef.current!.style.display = 'none';
                    } else {
                        if (e.target.value.length) {
                            numberInputRef.current!.style.display = 'block';
                        } else {
                            numberInputRef.current!.style.display = 'none';
                        }
                        setIsValid(false);
                    }
                }}
            />
            <input
                className="input"
                type="number"
                placeholder="L"
                onChange={(e) => {
                    if (parseFloat(e.target.value) >= 0 && parseFloat(e.target.value) <= 100) {
                        setIsValid(true);
                        setL(parseFloat(e.target.value));
                        injectValues(H, S, parseFloat(e.target.value));
                        numberInputRef.current!.style.display = 'none';
                    } else {
                        if (e.target.value.length) {
                            numberInputRef.current!.style.display = 'block';
                        } else {
                            numberInputRef.current!.style.display = 'none';
                        }
                        setIsValid(false);
                    }
                }}
            />
            <span ref={numberInputRef} className="warning">
                wrong hsl value
            </span>
            <h3 style={{ margin: '1.5rem 0', color: 'gray' }}>OR</h3>
            <p style={{ margin: '1rem 0' }}>paste string </p>
            <input
                style={{ width: '10rem', padding: '0.5rem' }}
                type="text"
                placeholder="hsl(0,0%,0%)"
                onChange={(e) => {
                    const ex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;

                    if (ex.test(e.target.value) && e.target.value.length) {
                        stringInputRef.current!.style.display = 'none';
                        setIsValid(true);
                    } else {
                        if (e.target.value.length) {
                            stringInputRef.current!.style.display = 'block';
                        } else {
                            stringInputRef.current!.style.display = 'none';
                        }
                        setIsValid(false);
                    }
                    setInput(e.target.value);
                    stringToValues(e.target.value);
                }}
            />
            <span style={{ paddingLeft: '1rem' }} ref={stringInputRef} className="warning">
                wrongly formatted hsl code
            </span>
            <br />
            <br />
            <hr />
            <section ref={colorRef} className="color-demo"></section>
            {isValid && (
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
            )}
        </StyledSpace>
    );
};

const StyledSpace = styled.section`
    .input {
        width: 5rem;
        padding: 0.5rem;
        margin-right: 0.5rem;
    }
    .warning {
        display: none;
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
