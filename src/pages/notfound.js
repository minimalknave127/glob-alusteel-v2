import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`¨
    section{
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const NotFound = () => {
    return(
        <React.Fragment>
            <Styles>
                <section>
                    <h1>Stránka nebyla nalezena</h1>
                </section>
            </Styles>
        </React.Fragment>
    )
}
export default NotFound;