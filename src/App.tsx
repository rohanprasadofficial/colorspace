import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from './components/InputFields';
interface ColorSpaceInterface {
    title: string;
    code: string;
}

const App: React.FC = () => {
    const ColorSpaces: ColorSpaceInterface[] = [
        { title: 'HEX', code: 'hex' },
        { title: 'RGB', code: 'rgb' },
        { title: 'HSL', code: 'hsl' },
    ];

    const [spaceActive, setSpaceActive] = useState<ColorSpaceInterface | null>(null);

    const spaceSelected = (e: React.FormEvent<HTMLSelectElement>) => {
        setSpaceActive({ title: '', code: e.currentTarget.value });
    };
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

                    <select
                        onChange={spaceSelected}
                        className="main__options--selector"
                        defaultValue="na"
                        name="options"
                        id="options"
                    >
                        {!spaceActive && (
                            <option value="na" disabled>
                                Select Space
                            </option>
                        )}

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
                    {spaceActive && <InputField key={spaceActive.code} code={spaceActive.code} />}

                    <section style={{ backgroundColor: 'red' }}>sdcs</section>
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
