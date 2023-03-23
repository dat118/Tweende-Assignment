import React, { useState } from "react";
import styled from "styled-components";
import { SORT_BY_FULLNAME, SORT_BY_USERNAME } from "../../const";
import { User } from "../../model";

type Props = {
  users: User[];
};

type SortBy = 0 | 1 | null;

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
  th {
    cursor: pointer;
    &:hover {
      background-color: #f2f2f2;
    }
  }
`;

const ThumbnailImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const CommonTable: React.FC<Props> = ({ users }) => {
  const [sortBy, setSortBy] = useState<SortBy>(null);

  const handleSort = (sortKey: SortBy) => {
    setSortBy(sortKey);
  };

  const sortedUsers = Array.from(users).sort((a, b) => {
    if (sortBy === 0) {
      if (a.fullName < b.fullName) return -1;
      return 0;
    }
    if (sortBy === 1) {
      if (a.userName < b.userName) return -1;
      return 0;
    }
    return 0;
  });

  return (
    <TableContainer>
      <thead>
        <tr>
          <th onClick={() => handleSort(SORT_BY_FULLNAME)}>Full Name</th>
          <th onClick={() => handleSort(SORT_BY_USERNAME)}>User name</th>
          <th>Thumbnail Icon</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.fullName}</td>
            <td>{user.userName}</td>
            <td>
              <ThumbnailImage
                src={user.thumbnailIcon}
                alt={`${user.fullName} Thumbnail`}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
};

export default CommonTable;
