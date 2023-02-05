import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";

const steps = [
  {
    id: "Greet",
    message: "Hello, Welcome to our website",
    trigger: "Ask Name",
  },
  {
    id: "Ask Name",
    message: "Please enter your name",
    trigger: "waiting1",
  },
  {
    id: "waiting1",
    user: true,
    trigger: "Name",
  },
  {
    id: "Name",
    message: "Hi {previousValue}, How can i help you?",
    trigger: "issues",
  },
  {
    id: "thanks",
    message: "Thank you for your details, Please select your issue",
    trigger: "issues",
  },
  {
    id: "issues",
    options: [
      { value: "React", label: "React", trigger: "React" },
      { value: "Python", label: "Python", trigger: "Python" },
      { value: "Java", label: "Java", trigger: "Java" },
      { value: "JavaScript", label: "JavaScript", trigger: "JavaScript" },
      { value: "C++", label: "C++", trigger: "C++" },
      { value: "MERN", label: "MERN", trigger: "MERN" },
    ],
  },
  {
    id: "React",
    message:
      "React is JavaScript library used for making single page web applications.",
    end: true,
  },
  {
    id: "Python",
    message:
      "Python is a computer programming language often used to build websites and software, automate tasks, and conduct data analysis.",
    end: true,
  },
  {
    id: "Java",
    message:
      "Java is a well-known server-side programming language that is often used for constructing web applications.",
    end: true,
  },
  {
    id: "JavaScript",
    message:
      "Javascript is used by programmers across the world to create dynamic and interactive web content like applications and browsers. ",
    end: true,
  },
  {
    id: "C++",
    message:
      "C++ is an object-oriented programming(OOP) language that is viewed by many as the best language for creating large-scale applications.",
    end: true,
  },
  {
    id: "MERN",
    message:
      "MERN stands for MongoDB, Express, React & Node and these four key technologies that make up the stack.",
    end: true,
  },
];

const theme = {
  background: "#cbdcc8",
  headerBgColor: "#058e0e",
  headerFontSize: "20px",
  botBubbleColor: "#8B008B",
  headerFontColor: "white",
  botFontColor: "white",
  userBubbleColor: "#0400ff",
  userFontColor: "white",
};

const config = {
  floating: true,
};

const Home = () => {
  return (
    <div>
      <div className="home-container-1">
        <LeftSidebar />
        <div className="home-container-2">
          <HomeMainbar />
          <RightSidebar />
        </div>
      </div>
      <div>
        <ThemeProvider theme={theme}>
          <ChatBot headerTitle="Chat Bot" steps={steps} {...config} />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Home;
