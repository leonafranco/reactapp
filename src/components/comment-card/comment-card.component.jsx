import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { PostContext } from "../../context/posts.context";
import { useLocation, useParams } from "react-router";
import { useState } from "react";
import { addCollectionAndDocuments } from "../../firebase/firebase";

const defaultFormFields = {
  comment: "",
  uuid: "",
  postid: "",
  currentTime: "",
  likes: 0,
  usersWhoLikedIt: [],
};
//ESTOU A TRABALHAR NOS COMMENT PAGES, ROUTER JA FUNCIONA, FICA A SOBRAR RENDERIZAR OS POSTS E COMENTARIOS
const CommentCard = () => {
  const { postsMap } = useContext(PostContext);
  const location = useLocation();
  const username = location.state;
  const { docId } = useParams();
  console.log(postsMap[docId]);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { comment } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      formFields.uuid = username.uuid;
      formFields.postid = docId;
      formFields.currentTime = Date.now();
      formFields.likes = 0;
      console.log(formFields);
      await addCollectionAndDocuments("comments", formFields);
      resetFormFields();
    } catch (error) {}
  };

  return postsMap[docId] ? (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>
            <img
              id="Style-img"
              src={username.profilePic}
              width="50"
              height="50"
              alt="avatar"
            />
            {username.displayName}
            <h6>
              {new Date(postsMap[docId].currentTime)
                .toString()
                .split(/\s+/)
                .slice(0, 4)
                .join(" ")}
            </h6>
          </Card.Title>
          <Card.Text>{postsMap[docId].text}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Text>{postsMap[docId].likes} Likes</Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <h3>Discussion</h3>
              <Form.Control
                required
                onChange={handleChange}
                value={comment}
                name="comment"
                as="textarea"
                rows={5}
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Card.Body>
        <Card.Body>
          <Card.Text>This should be comments</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  ) : (
    ""
  );
};

export default CommentCard;

//{
/* <Fragment>
{Object.keys(postsMap[docId]["comments"]).map((key) => (
  <Fragment key={key}>
    {postsMap[docId]["comments"][key][0]} <br></br>
  </Fragment>
))}
</Fragment> */
//}
