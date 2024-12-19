import styled from "@emotion/styled";
import { MouseEvent } from "react";
import { FaTrash } from "react-icons/fa";

type Props = {
  handleDeleteButton: () => void;
};

export default function CarouselDelete({ handleDeleteButton }: Props) {
  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    handleDeleteButton();
  };

  return (
    <DeleteStyled
      className="carousel_deleteButton"
      onMouseDown={handleDelete}
      onMouseUp={(e) => e.stopPropagation()}
    >
      <FaTrash />
    </DeleteStyled>
  );
}

const DeleteStyled = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;
