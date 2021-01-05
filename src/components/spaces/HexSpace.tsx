/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { HEXToHSL, HexToRGB } from '../../utils/converter';

export const HexSpace: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [rbg, setRgb] = useState<string>('');
    const [hsl, setHSL] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const colorRef = useRef<HTMLElement>(null);
    const warningRef = useRef<HTMLElement>(null);

    const injectValues = (value: string) => {
        !value.startsWith('#') && value != ''
            ? (colorRef.current!.style.backgroundColor = `#${value}`)
            : (colorRef.current!.style.backgroundColor = `${value}`);
        setRgb(HexToRGB(value) as string);
        setHSL(HEXToHSL(value));
    };

    return (
        <MainDiv>
            <p style={{ marginBottom: '1rem' }}>enter hex code </p>
            <StyledInputDiv>
                <input
                    type="text"
                    placeholder="#FFFFFF"
                    onChange={(e) => {
                        const ex = /^#([\da-f]{3}){1,2}$/i;
                        if (!ex.test(e.target.value) && e.target.value.length) {
                            setIsValid(false);
                            warningRef.current!.style.display = 'block';
                        } else {
                            warningRef.current!.style.display = 'none';
                            setInput(e.target.value);
                            injectValues(e.target.value);
                            setIsValid(true);
                        }
                    }}
                />
                <span ref={warningRef} className="warning">
                    wrongly formatted hex code
                </span>
            </StyledInputDiv>
            <section ref={colorRef} className="color-demo"></section>

            {isValid && (
                <StyledResDiv>
                    {rbg ? (
                        <div>
                            <h3 className="title">RGB</h3> <p className="res">{rbg}</p>
                        </div>
                    ) : (
                        ''
                    )}

                    {hsl ? (
                        <div>
                            <h3 className="title">HSL</h3> <p className="res">{hsl}</p>
                        </div>
                    ) : (
                        ''
                    )}
                </StyledResDiv>
            )}
        </MainDiv>
    );
};

const MainDiv = styled.div`
    .color-demo {
        padding: 1rem;
        width: 100%;
        margin-top: 1rem;
        background-color: white;
        border-radius: 0.5rem;
        border: 1px solid black;
    }
`;

const StyledInputDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    input {
        width: 10rem;
        padding: 0.5rem;
        margin-right: 0.5rem;
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
