import React from 'react';
import styled from 'styled-components';

// interface InputFieldsProps {
//     code: string;
// }

const Footer: React.FC = () => (
    <StyledFooter>
        creative apps by{' '}
        <a href="https://www.rohanprasad.dev" target="blank">
            Ro.
        </a>
    </StyledFooter>
);

const StyledFooter = styled.footer`
    padding: 0.5rem 0;
    margin: 0 auto;
    bottom: 0;
    text-align: center;
    margin-top: 2rem;
    padding-top: 2rem;
`;

export default Footer;
