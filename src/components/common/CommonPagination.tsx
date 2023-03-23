import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  totalRecords: number;
  pageLimit?: number;
  onPageChanged: (currentPage: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px;
  margin: 20px 0;
`;

const PageButton = styled.button<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? "#333" : "#fff")};
  border: 1px solid #ddd;
  color: ${({ active }) => (active ? "#fff" : "#333")};
  padding: 5px 10px;
  margin: 0 2px;
  cursor: pointer;
`;

const CommonPagination: React.FC<Props> = ({
  totalRecords,
  pageLimit = 10,
  onPageChanged,
}) => {
  const totalPages = Math.ceil(totalRecords / pageLimit);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    onPageChanged(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pages = getPageNumbers();

  return (
    <PaginationContainer>
      {pages.map((page) => (
        <PageButton
          key={page}
          onClick={() => handleClick(page)}
          active={currentPage === page}
        >
          {page}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default CommonPagination;
