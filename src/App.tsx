import React from 'react';

const App: React.FC = (props) => {
    return (
        <div>
            <nav>
                <p>Colors</p>
            </nav>
            <section>
                <h3>convert colors from one to another.</h3>
                <p> super quick.</p>

                <div>
                    <label>you have</label>
                    <select>
                        <option title="RGB">RGB</option>
                    </select>
                </div>
            </section>
        </div>
    );
};

export default App;
