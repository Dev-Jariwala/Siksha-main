import React from "react";
import styled from "styled-components";

const UserLoader = () => {
  return (
    <UserLoaderContainer>
      <UserInfoLoader>
        <div className="avatar loader shine"></div>
        <div className="username loader shine"></div>
        <div className="email loader shine"></div>
        <div className="button loader shine"></div>
      </UserInfoLoader>
      <UserPlaylistsLoader>
        <div className="playlist-text loader shine"></div>
        <div className="playlist-item loader shine"></div>
        <div className="playlist-item loader shine"></div>
        <div className="playlist-item loader shine"></div>
      </UserPlaylistsLoader>
    </UserLoaderContainer>
  );
};

const UserLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const UserInfoLoader = styled.div`
  margin-right: 20px;
  text-align: center;

  .avatar.loader {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #e2e2e2;
    animation: pulse 1.5s infinite;
  }

  .username.loader {
    margin-top: 10px;
    width: 120px;
    height: 20px;
    background: #e2e2e2;
    animation: pulse 1.5s infinite;
  }

  .email.loader {
    margin-top: 10px;
    width: 200px;
    height: 20px;
    background: #e2e2e2;
    animation: pulse 1.5s infinite;
  }

  .button.loader {
    margin-top: 20px;
    width: 100px;
    height: 40px;
    background: #e2e2e2;
    animation: pulse 1.5s infinite;
  }
`;

const UserPlaylistsLoader = styled.div`
  text-align: center;

  .playlist-text.loader {
    margin-bottom: 10px;
    width: 150px;
    height: 20px;
    background: #e2e2e2;
    animation: pulse 1.5s infinite;
  }

  .playlist-item.loader {
    margin-bottom: 5px;
    width: 200px;
    height: 20px;
    background: #e2e2e2;
    animation: pulse 1.5s infinite;
  }
`;

export default UserLoader;
