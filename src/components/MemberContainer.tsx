import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 20px 30px;
  border-radius: 8px;
  background-color: rgb(42, 42, 42);
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

interface MemberContainerProps {
  children?: React.ReactNode;
  title?: string;
}

export const MemberContainer: React.FC<MemberContainerProps> = ({
  children,
  title,
}) => {
  return (
    <>
      <Container>
        <Title>{title}</Title>
        <hr />
        {children}
      </Container>
    </>
  );
};
