import React from 'react';
import styled from 'styled-components';
import ColorPicker from './components/ColorPicker';
import { HexToRGB } from './utils/converter';
interface ColorSpaceInterface {
    title: string;
    code: string;
}

const App: React.FC = () => {
    const ColorSpaces: ColorSpaceInterface[] = [
        { title: 'HEX', code: 'hex' },
        { title: 'RGB', code: 'rgb' },
        { title: 'RGBA', code: 'rgba' },
        { title: 'HSL', code: 'hsl' },
        { title: 'HSLA', code: 'hsla' },
    ];

    console.log(HexToRGB('c59b9b'));

    return (
        <StyledApp>
            <nav className="navbar">
                <p>colors</p>
            </nav>
            <section className="main">
                <div className="main__desc">
                    <h1 className="main__desc--title">convert colors from one to another</h1>
                    <p className="main__desc--tag">super quick.</p>
                </div>

                <div className="main__options">
                    <label className="main__options--color-space" htmlFor="options">
                        you have
                    </label>

                    <select className="main__options--selector" name="options" id="options">
                        {ColorSpaces.map((colorSpace) => {
                            return (
                                <option key={colorSpace.code} value={colorSpace.code}>
                                    {colorSpace.title}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="main__inputs">
                    <input
                        type="text"
                        className="main__inputs--hex"
                        id="color-picker-page_input"
                        spellCheck="true"
                        placeholder="A5B28F"
                    />

                    <ColorPicker />
                    <span className="main__inputs--color"></span>
                </div>
            </section>
        </StyledApp>
    );
};

const StyledApp = styled.div`
    * {
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
    }

    .navbar {
        display: flex;
        padding: 1rem;
        margin-bottom: 2rem;
    }
    .main {
        max-width: 60%;
        margin: 0 auto;
        &__desc {
            display: flex;
            flex-direction: column;
            align-items: center;
            &--title {
                font-size: 3rem;
            }
            &--tag {
                color: #7d7c83;
                font-size: 1.2rem;
            }
        }

        &__options {
            &--color-space {
                margin-top: 4rem;
                margin-bottom: 1rem;
                display: block;
            }

            &--selector {
                padding: 0.5rem;
                width: 20%;
            }
        }
        &__inputs {
            display: flex;
            align-items: center;
            margin-top: 4rem;
            &--hex {
                width: 20%;
                padding: 0.5rem;
            }
            &--color {
                padding: 0.5rem;
                width: 2rem;
                height: 2rem;
                margin-left: 2rem;
                border-radius: 0.5rem;
                background-color: #fff;
                border: 0.5px solid black;
            }
        }
    }
`;

export default App;
