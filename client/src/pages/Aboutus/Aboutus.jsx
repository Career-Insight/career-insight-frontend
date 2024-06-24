import React from "react";
import "./aboutus.css";
import teamMember1 from "../../images/team-member-1.jpg";
import teamMember2 from "../../images/team-member-2.jpg";
import teamMember3 from "../../images/team-member-3.jpg";
import teamMember4 from "../../images/team-member-4.jpeg";
import teamMember5 from "../../images/team-member-5.jpg";
import teamMember6 from "../../images/team-member-6.jpg";

export default function Aboutus() {
  const team = [
    {
      name: "Abdelrahman Arafa",
      title: "DevOps Engineer",
      education: "Information Systems",
      description:
        "Managed DevOps and integrated machine learning for efficient development and deployment.",
      image: teamMember1,
    },
    {
      name: "Mostafa Saber",
      title: "Data Scientist",
      education: "Information Systems",
      description:
        "Applied data science and machine learning techniques to analyze labor market data.",
      image: teamMember3,
    },
    {
      name: "Omar Walid",
      title: "Front-End Developer",
      education: "Information Systems",
      description:
        "Designed and developed a user-friendly front-end interface using React technology.",
      image: teamMember4,
    },
    {
      name: "Mazen Muhammad",
      title: "Back-End Developer",
      education: "Information Technology",
      description:
        "Handled back-end development, including server-side components, data storage, and APIs.",
      image: teamMember2,
    },
    {
      name: "Muhammad Akram",
      title: "Network Engineer",
      education: "Information Technology",
      description: "Managed network configuration and cybersecurity.",
      image: teamMember5,
    },
    {
      name: "Hassan Mohammed",
      title: "UX/UI Designer",
      education: "Information Technology",
      description:
        "Focused on optimizing the project's visual design and user experience.",
      image: teamMember6,
    },
  ];

  return (
    <div className="about-us mt-5">
      <h1 className="text-pc text-3xl font-medium mb-5">Our Team</h1>
      <div className="team raw">
        {team.map((member, index) => (
          <div key={index} className="team-member col-md-4">
            <img src={member.image} alt={member.name} />
            <h2>{member.name}</h2>
            <h3>{member.title}</h3>
            <p>
              <strong>{member.education}</strong>
            </p>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
