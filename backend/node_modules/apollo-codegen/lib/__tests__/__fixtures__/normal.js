"use strict";
const query = gql `
  query UserProfileView {
    me {
      id
      uuid
      role
    }
  }
`;
//# sourceMappingURL=normal.js.map