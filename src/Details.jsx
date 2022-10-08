import { formatDistance } from 'date-fns';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

export default function Details() {
  const params = useParams();
  const {
    isLoading,
    isSuccess,
    data: issue,
  } = useQuery(['issue', params.id], fetchIssue);

  function fetchIssue() {
    return fetch(`
        https://api.github.com/repos/facebook/create-react-app/issues/${params.id}`).then(
      response => response.json()
    );
  }

  return (
    <div className="comments-container">
      {isLoading && <div>Loading ... </div>}
      {isSuccess && (
        <>
          <h2>
            Lorem ipsum dolor sit amet. <span>#{issue.number}</span>
          </h2>
          <div className="issue-details">
            <a href={issue.user.html_url}>{issue.user.login}</a> open the issue{' '}
            28 June
            {formatDistance(new Date(issue.created_at), new Date(), {
              addSuffix: true,
            })}
          </div>
        </>
      )}

      {isSuccess && (
        <div className="comment-container">
          <a href={issue.user.html_url}>
            <img src={issue.user.avatar_url} alt="avatar" className="avatar" />
          </a>
          <div className="comment">
            <div className="comment-heading">
              <a href={issue.user.html_url}>lorem</a> commented{' '}
              {formatDistance(new Date(issue.created_at), new Date(), {
                addSuffix: true,
              })}{' '}
            </div>
            <div className="comment-body markdown-body">
              <ReactMarkdown children={issue.body} />
            </div>
          </div>
        </div>
      )}

      <div className="border"></div>
      {isSuccess && <Comments issueNumber={issue.number} />}
    </div>
  );
}
