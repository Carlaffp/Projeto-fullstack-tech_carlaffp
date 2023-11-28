import styled from "styled-components";
export const StyledUserSection = styled.section`
  width: 100%;
  height: 8.1875rem;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--color-black);
  border-bottom: 1px solid var(--color-black);

  .container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.625rem;
  }

  @media (min-width: 768px) {
    .container {
      width: 100%;
      padding: 0 1rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
`;