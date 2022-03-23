import Directory from "../../components/directory/directory.component";

 const Home = () => {
  const publication = [
    {
      title: "post 1",
      text: "dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru",
      id: "1",
    },
    {
      title: "post 2",
      text: "um dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ",
      id: "2",
    },
    {
      title: "post3",
      text: "ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia de",
      id: "3",
    },
    {
      title: "post4",
      text: "didunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
      id: "4",
    },
  ];

  return <Directory publication={publication} />;
 }

export default Home