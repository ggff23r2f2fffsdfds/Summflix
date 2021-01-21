import React from "react";
import styled from "styled-components";

const Contailner = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 20px;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Contailner>
    <span role="img" aria-label="Loading">
      ⏰
    </span>
  </Contailner>
);
