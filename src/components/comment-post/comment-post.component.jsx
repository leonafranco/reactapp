import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export const CommentPostCard = (postID, uuid) => {
  return (
    <Fragment>
      {Object.keys(postsMap).map((key) => (
        <Fragment key={key}>
          <div className="directory-pub">
            <MenuItem
              currentTime={postsMap[key].currentTime}
              text={postsMap[key].text}
              docId={key}
              likes={postsMap[key].likes}
              uuid={postsMap[key].uuid}
            />
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};
