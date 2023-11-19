import React from "react";
import "./SingleRepo.css";
import { formatDistanceToNow } from "date-fns";
import { CiStar } from "react-icons/ci";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
const TimeAgo = ({ date }) => {
  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
  return <span>{timeAgo}</span>;
};

const SingleRepo = ({ repo }) => {
  return (
    <div className="top-container">
      <div className="container">
        <div className="right">
          <a
            href={`https://github.com/${repo.full_name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link_container"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="topbar">
              <RiGitRepositoryCommitsLine />
              <p>{repo.full_name}</p>
            </div>
          </a>

          <p className="name">{repo.description}</p>
          <div className="oth">
            <div className="obox">
              <span className="box"></span>
              <p>{repo.language}</p>
            </div>
            <div className="star-cont">
              <CiStar />
              <p>{repo.stargazers_count}</p>
            </div>
            <p>
              <span>Updated at :</span> <TimeAgo date={repo.updated_at} />
            </p>
          </div>
        </div>
        <div className="left">
          <div className="star">
            <CiStar />
            <p>Star</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRepo;
