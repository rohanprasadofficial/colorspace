/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { SRGBtoRGB, RGBtoHex, RGBToHSL } from '../../utils/converter';

export const RGBSpace: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [hex, setHex] = useState<string>('');
    const [hsl, setHSL] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);

    const [R, setR] = useState(0);
    const [G, setG] = useState(0);
    const [B, setB] = useState(0);

    const colorRef = useRef<HTMLElement>(null);
    const numberInputRef = useRef<HTMLElement>(null);
    const stringInputRef = useRef<HTMLElement>(null);

    const checkRGB = (value: string): boolean => {
        return parseFloat(value) >= 0 && parseFloat(value) <= 255;
    };

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
        const valueres = RGBtoHex(parseFloat(res[0]), parseFloat(res[1]), parseFloat(res[2]));
        !valueres.startsWith('#') && value != ''
            ? // eslint-disable-next-line
              (colorRef.current!.style.backgroundColor = `#${valueres}`)
            : // eslint-disable-next-line
              (colorRef.current!.style.backgroundColor = `${valueres}`);
        setHex(valueres);
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

                    if (checkRGB(e.target.value) && e.target.value.length) {
                        numberInputRef.current!.style.display = 'none';
                        setIsValid(true);
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
                type="text"
                placeholder="G"
                onChange={(e) => {
                    setG(parseFloat(e.target.value));
                    injectValues(R, parseFloat(e.target.value), B);

                    if (checkRGB(e.target.value) && e.target.value.length) {
                        numberInputRef.current!.style.display = 'none';
                        setIsValid(true);
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
                type="text"
                placeholder="B"
                onChange={(e) => {
                    setB(parseFloat(e.target.value));
                    injectValues(R, G, parseFloat(e.target.value));

                    if (checkRGB(e.target.value) && e.target.value.length) {
                        numberInputRef.current!.style.display = 'none';
                        setIsValid(true);
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
                wrong rgb value
            </span>
            <h3 style={{ margin: '1.5rem 0', color: 'gray' }}>OR</h3>

            <p style={{ margin: '1rem 0' }}>paste string </p>
            <input
                style={{ width: '10rem', padding: '0.5rem' }}
                type="text"
                placeholder="rgb(0,0,0)"
                onChange={(e) => {
                    setInput(e.target.value);
                    stringToValues(e.target.value);
                    const ex = /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;

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
                }}
            />
            <span style={{ paddingLeft: '1rem' }} ref={stringInputRef} className="warning">
                wrongly formatted hex code
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

                    {hsl ? (
                        <div>
                            <h3 className="title">HSL</h3> <p>{hsl}</p>
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
    .color-demo {
        background-color: 'white';
        width: 100%;
        height: 2rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
        border: 1px solid black;
    }
    .warning {
        display: none;
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
